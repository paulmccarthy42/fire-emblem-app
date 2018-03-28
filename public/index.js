/* global Vue, VueRouter, axios, $ */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      map: {},
      focused: { x: null, y: null },
      character: {}
    };
  },
  created: function() {
    axios.get("/v1/map/1").then(
      function(response) {
        this.map = response.data.map;
      }.bind(this)
    );
  },
  methods: {
    // toolbox
    charactersMapped: function() {
      var char = [];
      this.map.forEach(function(row) {
        row.forEach(function(tile) {
          if (tile.character) {
            char.push(tile.character);
          }
        });
      });
      return char;
    },
    deactivate: function() {
      this.character.active = false;
    },
    frontendTile: function(row, column) {
      return $("#" + row + "-" + column);
    },
    backendTile: function(rowCoor, columnCoor) {
      var tile = {};
      this.map.forEach(function(row) {
        row.forEach(function(thing) {
          if (
            thing.x_coordinate === rowCoor &&
            thing.y_coordinate === columnCoor
          ) {
            tile = thing;
          }
        });
      });
      return tile;
    },
    // menu items
    revive: function(id) {
      var index = this.characters.findIndex(function(char) {
        return char.id === id;
      });
      var character = this.characters[index];
      character.status = "normal";
      character.hp = character.max_hp;
    },
    refresh: function() {
      this.characters.forEach(
        function(char) {
          this.revive(char.id);
        }.bind(this)
      );
      this.endTurn();
    },
    save: function() {
      axios.patch("/v1/characters", { characters: this.characters });
    },
    endTurn: function() {
      this.characters.forEach(function(char) {
        char.active = true;
      });
    },
    // Attack methods
    attack: function(attackingId, attackedId) {
      // update hp for this.map character
      this.map.forEach(function(row) {
        row.forEach(function(tile) {
          if (tile.character && tile.character.id === attackedId) {
            tile.character.hp = Math.max(
              0,
              tile.character.hp - Math.floor(Math.random() * 10 + 1)
            );
            if (tile.character.hp === 0) {
              tile.character.status = "dead";
            }
          }
        });
      });
      // cleanup for attacker
      this.deactivate();
    },
    attackable: function(character) {
      return this.charactersMapped().filter(function(char) {
        return (
          char !== character &&
          char.loyalty !== character.loyalty &&
          char.status !== "dead"
        );
      });
    },
    clearFocus: function() {
      $(".map-square").each(function() {
        $(this).removeClass("in-range");
        $(this).removeClass("focused");
        $(this).removeClass("attackable");
      });
      this.focused = { x: null, y: null };
      this.character = {};
    },
    clickOnTile: function(row, column) {
      if (this.frontendTile(row, column).hasClass("in-range")) {
        this.move(row, column);
      } else {
        this.clearFocus();
        this.frontendTile(row, column).addClass("focused");
        var character = this.backendTile(row, column).character;
        if (character && character.active) {
          this.character = character;
          this.focused.x = row;
          this.focused.y = column;
          this.focus(row, column, character.movement + 1);
        }
      }
    },
    move: function(row, column) {
      this.deactivate();
      this.backendTile(row, column).character = this.character;
      this.backendTile(this.focused.x, this.focused.y).character = {};
      this.clearFocus();
    },
    focus: function(row, column, range) {
      for (var x = -range; x <= range; x++) {
        for (var y = -range + Math.abs(x); y <= range - Math.abs(x); y++) {
          if (Math.abs(x) + Math.abs(y) === range) {
            this.frontendTile(parseInt(row) + x, parseInt(column) + y).addClass(
              "attackable"
            );
          } else if (x !== 0 || y !== 0) {
            this.frontendTile(parseInt(row) + x, parseInt(column) + y).addClass(
              "in-range"
            );
          }
        }
      }
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});
