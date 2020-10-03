default format of a vue file:

simply run vue create my-app to create basic project

<template>
  <Component id="css" />
</template>

<script>
import Component from "location";

export default {
  name: "CurrentComponent",
  components: {
    Component,
  },
  props: {},
};
</script>

<style>
#css {
  color: red;
}
</style>
