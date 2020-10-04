import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import subStoreA from '@/store/subStoreA.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // this is just initial state
  state: { // data
    catFacts: [
      {
        _id: "58e00b4d0aac31001185ed22",
        text: "Original kitty litter was made out of sand but it was replaced by more absorbent clay in 1948.",
        type: "cat",
        user: {
          _id: "58e007480aac31001185ecef",
          name: {
            first: "Kasimir",
            last: "Schulz"
          }
        },
        upvotes: 5,
        userUpvoted: null
      },
    ],
  },
  getters: { // = computed properties
    availableCatFacts(state /*, getters */) {
      return state.catFacts.filter(catFact => catFact.userUpvoted == null)
    },

    likedCatFacts(state) {
      return state.catFacts.filter(catFact => catFact.userUpvoted == 1)
    },

    dislikedCatFacts(state) {
      return state.catFacts.filter(catFact => catFact.userUpvoted == 0)
    },
  },
  actions: { // basically methods, but in the store
    // if you want to add another variable, add context first
    // context basically gives access to the store
    // this can be replace with {state, actions, etc}

    // to access the rootStore (when using modules), use rootState, rootGetters etc
    // this has a lot of possibilities, make sure to read online regarding vuex nameSpaces
    fetchCatFacts(context, nextAction) {
      // pretty generic axios call
      axios.get("https://cat-fact.herokuapp.com/facts")

        .then((response) => {
          console.log(response)
          // wrote it this way to allow the catFacts to also be used for sth else after the axios call
          context.dispatch(nextAction, response)
        })

        .catch((err) => {
          console.log(err);
        });
    },
    insertCats(context, catFacts) {
      let firstTenFacts = catFacts.data.all.slice(0, 10)
      context.commit("setCats", firstTenFacts);
    },
    voteCat(context, array) {
      let catFact = array[0]
      let vote = array[1]
      if (vote === 1) {
        context.commit("voteCat", [catFact, vote])
      }
      else if (vote == 0) {
        context.commit("voteCat", [catFact, vote])
      }
      else {
        console.log("vote has to be either 1 (like) or 0 (dislike)")
      }
    }
  },
  // if you want to split up the different aspects, move for instance mutations to its own file, 
  // create file, export default mutations: { etc
  // import file as mutation into the store
  // replace below with:
  // mutations: mutations
  // or shorthand:
  // mutations,
  mutations: { // change single data
    setCats(state, catFacts) {
      state.catFacts = catFacts
    },
    voteCat(state, array) {
      let catFact = array[0]
      let vote = array[1]
      catFact.userUpvoted = vote
    }

  },
  modules: { // to allow importing other stores, the following would be accessed as: 
    // accessing state will differ:
    // this.$store.state.subStoreA(.catFacts)
    // accessing actions, getters and mutations wont:
    // this.getters.availableFacts
    // if you want to give actions, getters and mutations their own namespace too, add the following to export default: {
    // namespaced: true,
    // state: etc

    // subStore: subStoreA,
  }
})
