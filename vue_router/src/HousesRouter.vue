// you can add a router to a project using vue add router
// or install the dependencies using npm install router
// norm seems to be to store pages in views instead of components
<template>
  <div>
    <!-- this div can be commented out, and will remove the default nav links -->
    <div>
      <!-- the current link automatically gets the class "route-link-active" attached to it -->
      <router-link to="/">Home</router-link> |
      <!-- directly refer to the name in router/index.js -->
      <router-link :to="{ name: 'RoutedTo' }">Routed To</router-link> |
      <!-- you can freely throw params in, they become attached to the route variable end send along when you move from home to the route-->
      <!-- you cant add props and treat it like any other component, this seems to ge lost by the function handling the routing  -->

      <!-- you can "kinda" enable props by adding the props:true like commented out on line 25 of index.js -->
      <!-- this will just give the params as props too, see the RoutedToNext how type is now also a prop, and how someProp is still not received -->
      <router-link
        :to="{
          name: 'RoutesToNext',
          params: { text: 'i passed this text on' },
        }"
        someProp="THIS PROP GETS LOST"
        >Routed To Next</router-link
      >
      <!-- typing in the route by hand wont show the params, without a dynamic route like on /id in the router/index.js the link wont change so the number wont change -->
      <div v-for="id in storeIdArray" :key="id + 5">
        <router-link
          :to="{
            name: 'badId',
            params: { id: id },
          }"
          >bad id{{ id }}</router-link
        >
      </div>

      <!-- inside the router/index.js adding /:id to the route shares the params, allowing it to update them from the link -->
      <!-- to request information, use a method that retrieves information from the store using the params -->
      <!-- !!!!!!!!!!!!!!!!! switching between routes with same components means component DOES NOT REFRESH, see line 44 -->
      <div v-for="id in storeIdArray" :key="id">
        <router-link
          :to="{
            name: 'id',
            params: { id: id },
          }"
          :key="$route.path"
        >
          <!-- route-link need a key that changes to reload a component if the current and next route use the same component -->
          {{ id }}</router-link
        >
      </div>
    </div>

    <!-- this takes care of showing the right components -->
    <!-- if upper code commented out, you can still navigate by changing the link -->
    <!-- this.$route gives full access to the params such as path, name and query, also inside components routed to -->
    <p>{{ this.$route.fullPath }}</p>

    <!-- routing is done inside the router folder, under index.js -->
    <router-view />
    <go-back />
  </div>
</template>

<script>
import store from "./store";
import GoBack from "./components/GoBack";
export default {
  name: "HousesRouter",
  components: {
    GoBack,
  },
  data() {
    return {
      storeIdArray: store.genericStoreArray,
    };
  },
};
</script>
