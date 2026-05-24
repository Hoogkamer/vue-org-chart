<template lang='pug'>
.header(:style='{ backgroundColor: isDark ? "var(--bg-secondary)" : config.title.color, color: isDark ? "var(--text-primary)" : "white", borderBottom: isDark ? "1px solid var(--border-color)" : "none" }') {{ config.title.text }}
  .edit_indicator(
    v-if='editMode',
    v-on:click='$store.commit("setEditMode", false)'
  ) Click to leave editmode
  search-box
  .menu
    .home1
      a(:href='isDark ? "#" : "/"' :style='{ color: isDark ? "var(--text-primary)" : "white" }')
        i.material-icons.home(title='Home') home
    .screenshot1(v-if='config.enableScreenCapture')
      i.material-icons.screenshot(
        v-on:click='capture',
        title='Save as image'
      ) photo_camera
    .theme-toggle1
      i.material-icons.theme-toggle(
        v-on:click='toggleTheme',
        :title='isDark ? "Switch to light mode" : "Switch to dark mode"'
      ) {{ isDark ? 'light_mode' : 'dark_mode' }}
    file-menu(v-if='editMode', @editconfig='editConfig = true')
    options-menu(v-if='config.enableUserSettings')
  .info(v-if='config.information')
    i.material-icons.info_icon(
      v-on:click='infoOpen = !infoOpen',
      title='Contact and help'
    ) info
    .info-text(v-if='infoOpen')
      i.material-icons.info-close(v-on:click='infoOpen = false') close
      .i-text(v-html='config.information')
      .updated_info Updated on: {{ updatedOn }}
      div(v-if='config.showUserManual')
        hr
        a(
          href='https://freeorgchart.netlify.app/#faq',
          target='_blank'
        )
          .i-github 
            .i-github-text User manual
            a(
              href='https://github.com/Hoogkamer/vue-org-chart',
              target='_blank'
            )
              img.gh(
                src='../assets/img/gh.svg',
                title='Go to Github project page'
              )
  edit-config(v-if='editConfig', @close='editConfig = false')
</template>

<script>
import html2canvas from 'html2canvas'
import SearchBox from '~/components/SearchBox.vue'
import FileMenu from '~/components/FileMenu.vue'
import EditConfig from '~/components/EditConfig.vue'
import OptionsMenu from '~/components/OptionsMenu.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: { SearchBox, FileMenu, OptionsMenu, EditConfig },
  data: function() {
    return {
      infoOpen: false,
      editConfig: false,
      isDark: false
    }
  },
  computed: {
    ...mapState(['chart', 'editMode', 'config', 'updatedOn'])
  },
  mounted() {
    let savedTheme = localStorage.getItem('theme')
    if (!savedTheme && this.config && this.config.startView && typeof this.config.startView.darkMode !== 'undefined') {
      savedTheme = this.config.startView.darkMode ? 'dark' : 'light'
    }
    if (savedTheme === 'dark') {
      this.isDark = true
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      this.isDark = false
      document.documentElement.setAttribute('data-theme', 'light')
    }
  },
  methods: {
    ...mapActions(['initZoom']),
    toggleTheme() {
      this.isDark = !this.isDark
      const newTheme = this.isDark ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
      this.$store.dispatch('refreshLines')
    },
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
            const svgElements = element.body.getElementsByTagName(
              'svg'
            )
            Array.from(svgElements).forEach(svgElement => {
              const bBox = svgElement.getBBox()
              svgElement.setAttribute(
                'width',
                svgContainer.offsetWidth
              )
              svgElement.setAttribute(
                'height',
                svgContainer.offsetHeight
              )
            })
          }
        }).then(canvas => {
          try {
            saveAs(canvas.toDataURL(), 'orgchart.png')
          } catch (e) {
            alert("Security restriction: Double-clicking local index.html (file://) blocks canvas export when profile photos are loaded.\n\nPlease host this page on an HTTP fileserver (http:// or https://) or use 'npm run preview' to save organization chart as an image.")
          }
        }).catch(err => {
          console.error("Canvas export failed:", err)
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
  z-index: 20;
  transition: background-color var(--transition-speed), color var(--transition-speed);
}
.screenshot1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  transition: background-color var(--transition-speed);
}
.theme-toggle1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  transition: background-color var(--transition-speed);
}
.screenshot,
.home,
.theme-toggle {
  font-size: 24px;
  cursor: pointer;
  color: inherit;
  transition: color var(--transition-speed);
}
.home1 a {
  display: flex;
  align-items: center;
  justify-content: center;
}
.home1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  transition: background-color var(--transition-speed);
}
.screenshot1:hover,
.theme-toggle1:hover,
.home1:hover {
  background-color: var(--bg-secondary);
}
.screenshot:hover,
.home:hover,
.theme-toggle:hover {
  color: var(--accent-color);
}
.menu {
  position: absolute;
  top: 0px;
  left: 60px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  padding: 0 10px;
}
.gh {
  position: absolute;
  right: 10px;
  top: 5px;
  width: 30px;
}
.info_icon {
  cursor: pointer;
}
.info {
  position: absolute;
  top: 0px;
  right: 20px;
}
.i-github {
  position: relative;
}
.i-github:hover {
  background-color: lightgrey;
}
.i-github-text {
  padding: 10px;
  display: inline-block;
  font-size: 20px;
  color: grey;
}

.info-text {
  width: 300px;
  font-size: 14px;
  color: var(--text-secondary);
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  position: absolute;
  top: 40px;
  right: 20px;
  box-shadow: var(--card-shadow);
  border-radius: var(--card-radius);
  transition: background-color var(--transition-speed), border var(--transition-speed);
}
.info-close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  font-size: 14px;
}
.i-text {
  padding: 10px;
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

.updated_info {
  font-size: 12px;
  color: grey;
  padding: 5px;
}
</style>
