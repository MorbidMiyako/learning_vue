// simply run vue create my-app to create a basic vue basic project

<template>
  <!-- same as react regarding one enclosing root div, you just call it div normally-->
  <enclosingDiv>
    <!-- !!!!!!!!!!!!!!!!!!!!!! -->
    <!-- the : in front of given-prop is ESSENTIAL if you want to be able to send a variable, without it will send as a string, see App.vue -->
    <div>
      <h1>Calling components, sharing props and how to use data</h1>
      <!-- an imported components should be written in kebabstyle due to html elements not noticing Uppercase, so ImportedComponent becomes imported-components -->
      <!-- however, camelcase does work fine -->
      <!-- the text between " " for a v-bind is interpreted as javascript -->
      <imported-component :givenProp="insertProp" />
    </div>

    <div>
      <h1>How to use received props and styling</h1>
      <p id="id">
        this is the prop CurrentComponent received: <br />{{ receivedProp }}
      </p>
      <p>
        this is the result after manipulating a prop in data:<br />
        {{ manipulatedProp }}
      </p>
      <p>
        this is the result after manipulating a prop in locally:<br />
        {{ 191 * receivedProp }}
      </p>
      <p>
        these are two values pulled from the store: <br />
        {{ genericStoreValue }} <br />
        <!-- you cant import directly from the store, this will error and show a white screen-->
        <!-- {{ store.someOtherVariable }} -->
      </p>
    </div>

    <div>
      <h1>
        How to hook up values and use conditionals to render elements and
        display text
      </h1>
      <p>
        this depends on the value set by textInput, combined with turnary
        statement: <br />
        {{
          textInput ? textInput.toLocaleUpperCase() : "type below to change me"
        }}
      </p>
      <!-- v-model binds two ways, stored in data -->
      <!-- use v-on:keyup(.enter) to register key presses -->
      <!-- @ is shorthand for v-on:, like : is shorthand for v-bind: -->
      <input
        v-model="textInput"
        v-on:keyup.enter="addInputToItems(textInput)"
      />
      <button v-on:click="items.push(textInput)">Add to items</button>
      <p v-show="!heyAdded">
        this button will disappear after clicking, from the dom too, i will just
        be display:none
      </p>
      <button v-if="!heyAdded" @click="addHeyToItems()">
        Add hey to items
      </button>
      <p v-else-if="items.length == 5">kiekaboo</p>
      <p v-else>
        i appear trough an else, items.length === 5 reveals an else if dependent
        element and hides me
      </p>
    </div>

    <div>
      <h1>Some for in rendering</h1>
      <p>this ul is created using a for in list</p>
      <ul>
        <li v-for="n in items" :key="n">{{ n }}</li>
      </ul>
      <p>these components are created using a for in list</p>
      <imported-component
        v-for="prop in componentList"
        :key="prop"
        :givenProp="prop"
      />
    </div>

    <div>
      <h1>How to have dynamic attributes in vue and use computed</h1>
      <!-- this also works when wanting to set attributes like classes etc, between " " is interpreted as javascript if you put : before the attribute -->
      <!-- computed has its own object, requires a return and are not allowed to overwrite data, if you want to change data locally resort to methods -->
      <p :style="setStyling">
        use the textbox to set the style attribute of this tag <br />
        :style="{{ setStyling }}"
      </p>
      <input v-model="setStyling" />
      <!-- there are other ways of doing this, as shown before (doing this when setting/updating data, or between the {{ }} ) -->
      <p>text.length: {{ setStylingLength }}</p>
    </div>

    <div>
      <h1>Sharing and storage of function</h1>
      <p>This showcases difference between location function is stored</p>
      <p>
        amountClicked value in CurrentComponent: <br />
        {{ amountClicked }}
      </p>
      <h2>Three different ways of passing on Functions:</h2>
      <showcase-function-storage
        version="data"
        :givenFunction="dataIncrementCount"
      />
      <showcase-function-storage
        version="method"
        :givenFunction="methodIncrementCount"
      />
      <shared-function-used-locally
        version="local"
        :givenFunction="localIncrementCount"
      />
    </div>
  </enclosingDiv>
</template>

<script>
// @ is an alias to /src, prevents having to use ../ to get up to the src/ directory
import store from "@/store.js";
import ImportedComponent from "./components/ImportedComponent.vue";
import ShowcaseFunctionStorage from "./components/ShowcaseFunctionStorage";
import SharedFunctionUsedLocally from "./components/SharedFunctionUsedLocally";

export default {
  name: "CurrentComponent",
  props: {
    receivedProp: String, // Hello World
    unchangedProp: Number, // 7
  },
  components: {
    ImportedComponent,
    ShowcaseFunctionStorage,
    SharedFunctionUsedLocally,
  },
  template: {},
  data() {
    return {
      insertProp: "genericText",
      manipulatedProp: 191 * this.unchangedProp,
      textInput: null,
      items: [1, 2, 3],
      componentList: ["i", "said", "hi"],
      genericStoreValue: store.genericStoreArray[0].name,
      otherStoreValue: store.someOtherVariable,
      setStyling: "color:red;",
      heyAdded: false,
      amountClicked: 0,
      // this will use the amountClicked above
      dataIncrementCount: () => {
        this.amountClicked += 1;
      },

      // this will use the amount clicked of the components its in
      localIncrementCount: (amountClicked) => {
        return (amountClicked += 1);
      },
    };
  },
  computed: {
    setStylingLength() {
      return this.setStyling.length;
    },
  },
  methods: {
    // methods can be stored both underneath methods and data
    // under methods for local use, under data for local and shared use
    addInputToItems: function (item) {
      this.items.push(item);
      this.textInput = null;
    },

    addHeyToItems: function () {
      this.items.push("hey");
      this.heyAdded = true;
    },

    // this will just fail when shared
    methodsIncrementCount: function () {
      this.amountClicked += 1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#id {
  color: red;
}
</style>
