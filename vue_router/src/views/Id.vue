<template>
  <div>
    <p>I'm div numbeeeer:</p>
    <p>{{ this.$route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: "RoutedTo",
  props: {
    someProp: String,
  },
};
</script>
