<template>
  <CurrentComponent receivedProp="Hello World" :unchangedProp="7" />
</template>
<script>
import CurrentComponent from "./CurrentComponent";
export default {
  components: {
    CurrentComponent,
  },
};
</script>
