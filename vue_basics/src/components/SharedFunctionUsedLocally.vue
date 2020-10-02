<template>
  <div>
    <h2>This is a different component</h2>
    <h3>{{ version }}</h3>
    <p>{{ amountClicked }}</p>
    <p>
      {{ givenFunction }}
    </p>
    <button @click="amountClicked = givenFunction(amountClicked)">
      Click me
    </button>
  </div>
</template>

<script>
export default {
  name: "SharedFunctionUsedLocally",
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
