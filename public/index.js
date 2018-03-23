/* global Vue, VueRouter, axios, $ */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      characters: [],
      map: {},
      focused: { x: null, y: null },
      character: {}
    };
  },
  created: function() {
    axios.get("/v1/map/1").then(
      function(response) {
        this.map = response.data.map;
        axios.get("/v1/characters").then(
          function(response) {
            this.characters = response.data;
          }.bind(this)
        );
      }.bind(this)
    );
  },
  methods: {
    attack: function(attackingId, attackedId) {
      var attackedIndex = this.characters.findIndex(function(char) {
        return char.id === attackedId;
      });
      this.characters[attackedIndex].hp = Math.max(
        0,
        this.characters[attackedIndex].hp - Math.floor(Math.random() * 10 + 1)
      );
      if (this.characters[attackedIndex].hp === 0) {
        this.characters[attackedIndex].status = "dead";
      }
      this.deactivate(attackingId);
    },
    attackable: function(character) {
      return this.characters.filter(function(char) {
        return (
          char !== character &&
          char.loyalty !== character.loyalty &&
          char.status !== "dead"
        );
      });
    },
    revive: function(id) {
      var index = this.characters.findIndex(function(char) {
        return char.id === id;
      });
      var character = this.characters[index];
      character.status = "normal";
      character.hp = character.max_hp;
    },
    deactivate: function(id) {
      var index = this.characters.findIndex(function(char) {
        return char.id === id;
      });
      this.characters[index].active = false;
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
    clickOnTile: function(row, column) {
      if (this.frontendTile(row, column).hasClass("in-range")) {
        console.log(this.backendTile(row, column));
      } else {
        $(".map-square").each(function() {
          $(this).removeClass("in-range");
          $(this).removeClass("focused");
          $(this).removeClass("attackable");
        });
        this.frontendTile(row, column).addClass("focused");
        this.character = this.backendTile(row, column).character;
        if (this.character !== null) {
          this.focus(row, column, this.character.movement + 1);
        }
      }
    },
    focus: function(row, column, range) {
      for (var x = -range; x <= range; x++) {
        for (var y = -range + Math.abs(x); y <= range - Math.abs(x); y++) {
          if (Math.abs(x) + Math.abs(y) === range) {
            $(
              "#" + (parseInt(row) + x) + "-" + (parseInt(column) + y)
            ).addClass("attackable");
          } else if (x !== 0 || y !== 0) {
            $(
              "#" + (parseInt(row) + x) + "-" + (parseInt(column) + y)
            ).addClass("in-range");
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
