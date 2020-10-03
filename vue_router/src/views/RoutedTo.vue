<template>
  <div>
    <p>Routed to meeee</p>
    <router-link :to="{ name: 'NestedRoute' }">
      Lets go into a nested route
    </router-link>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
  name: "RoutedTo",
};
</script>
