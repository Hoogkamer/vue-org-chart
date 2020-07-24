<template lang='pug'>
   #person_details_container
    #person_details
      .close
      v-icon(@click='showPerson=null') mdi-close
    div.bold {{showPerson.name}}
   
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['showPerson'])
  },
  mounted: function() {},
  methods: {
    ...mapActions(['setShowPerson'])
  }
}
</script>
<style scoped>
#person_details_container {
  width: 100%;
  position: absolute;
  height: 0px;
  top: 150px;
  z-index: 2;
  text-align: center;
}
#person_details {
  width: 600px;
  margin: auto;
  display: inline-block;

  padding: 5px;
  z-index: 2;
  border: 0px solid grey;
  padding: 3px 10px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
}
.close,
.close button {
  font-size: 16px;
  background-color: grey;
  color: white;
  border-radius: 3px;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
.close button:hover {
  background-color: lightgray;
  color: black;
}
</style>
