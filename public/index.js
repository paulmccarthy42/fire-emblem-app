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
    attack: function(loyalty) {
      this.characters.forEach(function(character) {
        if (character.loyalty !== loyalty) {
          character.hp = Math.max(character.hp - 1,0);
          if (character.hp === 0) {
            character.status = 'dead';
          }
        }
      });
    },
    test: function() {
      console.log(this.characters);
    },
    revive: function(id) {
      var index = this.characters.findIndex(function(char) {
        return char.id === id;
      });
      this.characters[index].status = "normal";
      this.characters[index].hp = 18;
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