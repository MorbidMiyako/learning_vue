<template>
  <div>
    <h3>{{ version }}</h3>
    <p>{{ amountClicked }}</p>
    <p>
      {{ givenFunction }}
    </p>
    <button @click="givenFunction()">Click me</button>
  </div>
</template>

<script>
export default {
  name: "ShowcaseFunctionStorage",
  props: {
    version: String,
    givenFunction: Function,
  },
  data() {
    return {
      amountClicked: 0,
    };
  },
};
</script>
