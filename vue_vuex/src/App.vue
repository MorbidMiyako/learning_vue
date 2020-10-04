<template>
  <div>
    <initial-list />
    <liked-list />
    <disliked-list />
  </div>
</template>

<script>
import InitialList from "./components/InitialList.vue";
import DislikedList from "./components/DislikedList";
import LikedList from "./components/LikedList";

export default {
  name: "App",
  components: {
    InitialList,
    DislikedList,
    LikedList,
  },
};
</script>
