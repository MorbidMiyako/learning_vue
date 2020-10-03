<template>
  <button @click="goBack">Go Back</button>
</template>

<script>
export default {
  methods: {
    goBack() {
      // the go function on the router allows to go back or forward in the indicated amount of steps:w
      return this.$router.go(-1);
    },
  },
};
</script>
