<template>
  <div>
    <h2>Catfact</h2>
    <h3>Unsorted CatFacts</h3>
    <div v-for="catFact in catFacts" :key="catFact.id">
      <p>{{ catFact.text }}</p>
      <p>Made by: {{ catFact.user.name.first }} {{ catFact.user.name.last }}</p>
      <button @click="likeCatFact(catFact)">Like</button>
      <button @click="dislikeCatFact(catFact)">Dislike</button>
    </div>
  </div>
</template>

<script>
// this is just inserted main.js instead
// import store from "@/store/index.js";

// add this import if you want to more easily import states, actions and getters
// import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: "InitialList",
  computed: {
    // this is sets catFacts everytime the depenency is changed
    catFacts() {
      // due to insertion at main.js, this syntax also changes
      // return store.getters.availableCatFacts;
      return this.$store.getters.availableCatFacts;
    },

    // equivalent using mapGetters
    // ...mapGetters({
    //   catFacts: availableCatFacts,
    // })

    // use the following if you want to cater to one namespace:
    // ...mapGetters('subStoreA' {

    // If you want to get a dynamice state variable, you can do this
    // allCatFacts() {
    //   return this.$store.state.catFacts
    // }

    // equivalent using mapState
    // ...mapState({
    //   allCatFacts: catFacts,
    // })
  },
  // data() {},
  methods: {
    likeCatFact(catFact) {
      // wanted to make it one function to vote, and handle everything from there
      this.$store.dispatch("voteCat", [catFact, 1]);
    },
    dislikeCatFact(catFact) {
      this.$store.dispatch("voteCat", [catFact, 0]);
    },

    // equivalent using mapActions
    // ...mapActions({
    // !!!!!!! you need to manually pass in the array instead of just catFact on the button now
    // likeCatFact: "voteCat",
    // dislikeCatFact: "voteCat",
    // })
  },
  created() {
    // this leaves the possibility to call different acctions with the fetch request
    this.$store.dispatch("fetchCatFacts", "insertCats");
  },
};
</script>
