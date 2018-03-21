/* global Vue, VueRouter, axios, $ */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      characters: [],
      map: {},
      focused: {x: null, y: null}
    };
  },
  created: function() {
    axios.get("/v1/map").then(function(response) {
      this.map = response.data;
      axios.get("/v1/characters").then(function(response) {
        this.characters = response.data;
        this.characters.forEach(function(char) {
          $("#" + char.x_position + "-" + char.y_position).addClass("occupied")
        });
      }.bind(this));
    }.bind(this));
  },
  methods: {
    attack: function(attackingId, attackedId) {
      var attackedIndex = this.characters.findIndex(function(char) {
        return char.id === attackedId;
      });
      this.characters[attackedIndex].hp = Math.max(0, this.characters[attackedIndex].hp - Math.floor((Math.random() * 10) + 1));
      if (this.characters[attackedIndex].hp === 0) {
        this.characters[attackedIndex].status = "dead";
      }
      this.deactivate(attackingId);

    },
    attackable: function(character) {
      return this.characters.filter(function(char) {
        return char !== character &&
          char.loyalty !== character.loyalty && 
          char.status !== 'dead';
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
      this.characters.forEach(function(char) {
        this.revive(char.id);
      }.bind(this));
      this.endTurn();
    },
    save: function() {
      axios.patch("/v1/characters", {characters: this.characters});
    },
    endTurn: function() {
      this.characters.forEach(function(char) {
        char.active = true;
      });
    },
    focus: function(row, column) {
      $("#" + this.focused.x + "-" + this.focused.y).removeClass("focused");
      this.focused.x = row;
      this.focused.y = column;
      $("#" + row + "-" + column).addClass("focused");
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

