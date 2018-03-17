/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      characters: []
    };
  },
  created: function() {
    axios.get("/v1/characters").then(function(response) {
      this.characters = response.data;
    }.bind(this));
  },
  methods: {
    attack: function(id) {
      var index = this.characters.findIndex(function(char) {
        return char.id === id;
      });
      this.characters[index].hp = Math.max(0, this.characters[index].hp - 1);
      if (this.characters[index].hp === 0) {
        this.characters[index].status = "dead"
      }
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
    refresh: function() {
      this.characters.forEach(function(char) {
        this.revive(char.id);
      }.bind(this));
    },
    save: function() {
      axios.patch("/v1/characters", {characters: this.characters});
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

