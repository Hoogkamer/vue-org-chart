<template lang='pug'>
.header(:style='{backgroundColor:config.title.color}') {{config.title.text}}
  
  .edit_indicator(v-if="editMode" v-on:click="$store.commit('setEditMode', false)") Click to leave editmode
  a(href='https://github.com/Hoogkamer/vue-org-chart' target='_blank')
    img.gh(src="~/assets/img/gh.svg" title='Go to Github project page')
  search-box
  .menu
    file-menu(v-if='editMode')
    options-menu
    .home1
      a(href="/")
        i.material-icons.home(v-on:click="capture" title='Home') home
    .screenshot1(v-if='config.enableScreenCapture')
      i.material-icons.screenshot(v-on:click="capture" title='Save as image') photo_camera
</template>

<script>
import html2canvas from 'html2canvas'
import SearchBox from '~/components/SearchBox.vue'
import FileMenu from '~/components/FileMenu.vue'
import OptionsMenu from '~/components/OptionsMenu.vue'
import { mapState, mapActions } from 'vuex'
var panzoom = require('panzoom')
export default {
  components: { SearchBox, FileMenu, OptionsMenu },
  computed: {
    ...mapState(['chart', 'editMode', 'config'])
  },
  methods: {
    ...mapActions(['initZoom']),
    capture: function() {
      var area = document.querySelector('#chart')
      console.log(area)
      this.initZoom()
      setTimeout(x => {
        var x = document.querySelector('#chart')
        var svgContainer = document.querySelector('#chart')
        console.log(svgContainer)
        html2canvas(x, {
          onclone: element => {
            const svgElements = element.body.getElementsByTagName('svg')
            Array.from(svgElements).forEach(svgElement => {
              const bBox = svgElement.getBBox()
              svgElement.setAttribute('width', svgContainer.offsetWidth)
              svgElement.setAttribute('height', svgContainer.offsetHeight)
            })
          }
        }).then(canvas => {
          saveAs(canvas.toDataURL(), 'orgchart.png')
        })
      }, 500)
    }
  }
}
function saveAs(uri, filename) {
  var link = document.createElement('a')

  if (typeof link.download === 'string') {
    link.href = uri
    link.download = filename

    //Firefox requires the link to be in the body
    document.body.appendChild(link)

    //simulate click
    link.click()

    //remove the link when done
    document.body.removeChild(link)
  } else {
    window.open(uri)
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  color: white;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 2;
  box-shadow: 5px 2px 5px grey;
}
.screenshot1 {
  display: inline-block;
  box-sizing: content-box;
  position: absolute;
  top: 10px;
  left: 70px;
}
.screenshot,
.home {
  cursor: pointer;
}
.home1 a {
  color: white;
}
.home1 {
  display: inline-block;
  box-sizing: content-box;
  position: absolute;
  top: 10px;
  left: -50px;
}
.screenshot:hover,
.home:hover {
  border: 1px solid white;
}
.menu {
  position: absolute;
  top: 5px;
  left: 60px;
  font-size: 16px;
  width: 200px;
  text-align: left;
  padding: 10px;
}
.gh {
  position: absolute;
  top: 5px;
  right: 10px;
  width: 40px;
}
.edit_indicator {
  position: absolute;
  top: 50px;
  right: 0px;
  font-size: 16px;
  background-color: red;
  padding: 5px;
  cursor: pointer;
}
</style>
