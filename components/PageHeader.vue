<template lang='pug'>
.header {{pageTitle}}
   search-box
</template>

<script>
import SearchBox from '~/components/SearchBox.vue'

export default {
  components: { SearchBox },

  props: {
    pageTitle: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: #006696;
  color: white;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 2;
}
</style>
