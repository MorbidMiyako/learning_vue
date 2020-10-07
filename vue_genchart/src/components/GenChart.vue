<template>
  <div>
    <g-gantt-chart
      :chart-start="myChartStart"
      :chart-end="myChartEnd"
      :grid="grid"
      :hide-timeaxis="hideTimeaxis"
      :row-label-width="`${rowLabelWidth}%`"
      :row-height="rowHeight"
      :theme="selectedTheme"
      @contextmenu-bar="onContextmenuBar($event)"
      @dragend-bar="stoppedDraggingBar($event)"
    >
      <g-gantt-row
        v-for="row in rows"
        :key="row.label"
        :label="row.label"
        :bars="row.bars"
        bar-start="myStart"
        bar-end="myEnd"
      >
        <template #bar-label="{ bar }">
          <p :style="{ fontSize: '8px' }">
            {{ bar.label }}
          </p>
        </template>
      </g-gantt-row>
    </g-gantt-chart>
    <!-- 
    <v-menu
      v-model="showContextmenu"
      :position-x="contextmenuX"
      :position-y="contextmenuY"
    >
      <v-list>
        <v-list-item> It's a context menu! </v-list-item>
      </v-list>
    </v-menu> -->
  </div>
</template>

<script>
// import store from "@/store/index.js";
import GGanttChart from "../../ganttastic/src/GGanttChart";
import GGanttRow from "../../ganttastic/src/GGanttRow";
import { mapState, mapGetters } from "vuex";
import dummyDataShifts from "../dummy data/shifts";

export default {
  components: {
    GGanttChart,
    GGanttRow,
  },

  computed: {
    ...mapGetters({
      // myChartEnd: "chartStartTime",
    }),

    ...mapState([
      "myChartStart",
      "myChartEnd",
      "grid",
      "rowHeight",
      "rowLabelWidth",
      "hideTimeaxis",
      "hours",
      "showContextmenu",
      "contextmenuTimeout",
      "contextmenuX",
      "contextmenuY",
      "selectedTheme",
      "themes",
      "rows",
    ]),
  },

  methods: {
    stoppedDraggingBar() {},

    // onContextmenuBar(e) {
    //   console.log("hey");
    //   e.event.preventDefault();
    //   this.contextmenuY = e.event.clientY;
    //   this.contextmenuX = e.event.clientX;
    //   this.showContextmenu = true;
    //   if (this.contextmenuTimeout) {
    //     clearTimeout(this.contextmenuTimeout);
    //   }
    //   this.contextmenuTimeout = setTimeout(
    //     () => (this.showContextmenu = false),
    //     3000
    //   );
    // },
  },
  created() {
    this.$store.commit("resetRows");
    for (let row of dummyDataShifts) {
      this.$store.dispatch("populateRows", [row, "quick"]);
    }
    this.$store.dispatch("createStartEndCurrentWeek");
  },
  // data() {
  //   return {
  //     grid: this.$store.state.grid,
  //     rowHeight: this.$store.state.rowHeight,
  //     rowLabelWidth: this.$store.state.rowLabelWidth,
  //     hideTimeaxis: this.$store.state.hideTimeaxis,
  //     hours: this.$store.state.hours,
  //     showContextmenu: this.$store.state.showContextmenu,
  //     contextmenuTimeout: this.$store.state.contextmenuTimeout,
  //     contextmenuX: this.$store.state.contextmenuX,
  //     contextmenuY: this.$store.state.contextmenuY,
  //     selectedTheme: this.$store.state.selectedTheme,
  //     themes: this.$store.state.themes,
  //   };
  // },
};
</script>
