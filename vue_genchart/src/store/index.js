import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment"

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    myChartStart: "",
    myChartEnd: "",
    grid: true,
    rowHeight: 40,
    rowLabelWidth: 10,
    hideTimeaxis: false,
    hours: [...Array(24).keys()],
    showContextmenu: true,
    contextmenuTimeout: null,
    contextmenuX: 0,
    contextmenuY: 0,
    selectedTheme: "vue",
    themes: [
      "default",
      "vue",
      "dark",
      "material-blue",
      "creamy",
      "slumber",
      "sky",
      "crimson",
      "grove",
      "fuchsia",
      "flare",
    ],
    rows: [{
      label: "MorningShift",
      bars: [
        {
          myStart: "2020-03-03 07:30",
          myEnd: "2020-03-03 17:30",
          label: "Chef Bubbles",
          ganttBarConfig: {
            immobile: true,
            background: "blue",
            borderRadius: "3px",
          },
        },
      ],
    },],
    lastRowId: 0
  },
  getters: {
  },
  actions: {
    populateRows(context, array /* [[bars], "name"||"space"||"quick"] */) {
      context.dispatch(`${array[1]}FillRows`, array[0]);
      // switch (array[1]) {
      //   case "name":
      //     context.dispatch('nameFillRows', array[0]);
      //     break;

      //   case "space":
      //     context.dispatch('spaceFillRows', array[0]);
      //     break;

      //   case "quick":
      //     context.dispatch('quickFillRows', array[0]);
      //     break;

      // }
    },

    createStartEndCurrentWeek(context) {
      let dateMondayCurrentWeek = moment().startOf("week").add(1, "day")
      context.commit("setChartStart", dateMondayCurrentWeek.format("YYYY-MM-DD HH:MM"))
      context.commit("setChartEnd", dateMondayCurrentWeek.add(1, "week").format("YYYY-MM-DD HH:MM"))
    },

    quickFillRows(context, row /* [bars] */) {
      for (let bar of row.bars) {
        context.commit("addRow", context.state.lastRowId.toString())
        let rowId = context.state.lastRowId
        let row = context.state.rows.filter(row => row.label == rowId)
        context.commit("addBar", [bar, row[0]])

        // increment id, later different solution
        context.commit("incrementLastRowId")
      }
    },
  },
  mutations: {

    setChartStart(state, startTime) {
      state.myChartStart = startTime
    },

    setChartEnd(state, endTime) {
      state.myChartEnd = endTime
    },

    resetRows(state) {
      state.rows = []
      state.rowId = 0
    },

    addRow(state, label) {
      state.rows.push({
        label: label,
        bars: [],
        rowId: state.lastRowId,
      })
    },

    addBar(state, array /*[bar, row]*/) {
      let bar = array[0]
      let row = array[1]
      row.bars.push(bar)
    },

    incrementLastRowId(state) {
      state.lastRowId++
    },

  }, modules: {

  },
})

export default store
