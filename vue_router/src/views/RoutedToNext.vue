<template>
  <div>
    <p>I'm next</p>
    <p>{{ this.$route.params.text }}</p>
    <p>{{ text }}</p>
    <p>{{ someProp }}</p>
  </div>
</template>

<script>
export default {
  name: "RoutedTo",
  props: {
    text: {
      type: String,
      required: true,
    },
    someProp: {
      type: String,
    },
  },
};
</script>
