<template>
  <p>
    {{ givenProp }}
  </p>
</template>

<script>
export default {
  name: "ImportedComponent",
  props: {
    givenProp: String,
  },
};
</script>
