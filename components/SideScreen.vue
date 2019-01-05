<template lang='pug'>
    .side-screen(v-if="showSideScreen")
      button.right(v-on:click="$store.commit('closeSideScreen')")
        i.material-icons keyboard_arrow_left
      h4 department details
      span .....
    .noside-screen(v-else)
      button.right(v-on:click="$store.commit('openSideScreen')")
        i.material-icons keyboard_arrow_right
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {},

  computed: {
    ...mapState(['showSideScreen'])
  },
  methods: {}
}
</script>

<style scoped>
h4 {
  text-align: center;
}
.side-screen {
  position: fixed;
  left: 0px;
  top: 50px;
  width: 300px;
  height: 100vh;
  border: 1px solid grey;
  background-color: rgb(245, 250, 255);
}
.noside-screen {
  position: fixed;
  left: 0px;
  top: 50px;
  width: 20px;
  height: 100vh;
  border: 1px solid grey;
  background-color: rgb(245, 250, 255);
}

.right {
  position: absolute;
  right: 0px;
  top: 10px;
  background-color: transparent;
  border: 0px solid grey;
  padding: 1px;
  cursor: pointer;
}
.right:focus {
  outline: none;
}
.right i {
}
</style>
