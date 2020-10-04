<template>
  <div>
    <h2>Catfact</h2>
    <h3>Liked CatFacts</h3>
    <div v-for="catFact in catFacts" :key="catFact.id">
      <p>{{ catFact.text }}</p>
      <p>Made by: {{ catFact.user.name.first }} {{ catFact.user.name.last }}</p>
      <button @click="likeCatFact(catFact)">Like</button>
      <button @click="dislikeCatFact(catFact)">Dislike</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InitialList",
  computed: {
    catFacts() {
      return this.$store.getters.likedCatFacts;
    },
  },
  // data() {},
  methods: {
    likeCatFact(catFact) {
      this.$store.dispatch("voteCat", [catFact, 1]);
    },
    dislikeCatFact(catFact) {
      this.$store.dispatch("voteCat", [catFact, 0]);
    },
  },
};
</script>
