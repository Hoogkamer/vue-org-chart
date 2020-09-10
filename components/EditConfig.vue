<template lang='pug'>
   #config_container
    #config
     
      h3 Configure
      button(v-if='!showHelp' @click='showHelp=true') show help
      button(v-else @click='showHelp=false') hide help
      table.tab
        tr
          td.n Title
          td.i
            input(v-model='pageTitle')
        tr(v-if='showHelp')
          td.help(colspan=2) Sets the header title
        tr
          td.n Title bar color
          td.i
            input(v-model='pageTitleColor')
        tr(v-if='showHelp')
          td.help(colspan=2) Sets the header color (#FF0000 is red for example)
        tr
          td.n Information text
          td.i
            textarea(v-model='informationText')
        tr(v-if='showHelp')
          td.help(colspan=2) Sets text to display when clicked on the (i) button (you can use HTML). Leave empty if not needed

        tr
          td.n Photo URL prefix
          td.i 
            input(v-model='photoUrlP')
        tr
          td.n Photo URL suffix
          td.i 
            input(v-model='photoUrlS')
        tr(v-if='showHelp')
          td.help(colspan=2) The position where to get the photo's. For these locations it is fetched from "prefix" + photo + "suffix". So if you have photo P0001, it will be fetched from "photos/P0001.png". If you have an api or other locations which delivers photo's based on the photo field you can change that here.

        tr
          td.n Link URL prefix
          td.i 
            input(v-model='linkUrlP')
        tr
          td.n Link URL suffix
          td.i 
            input(v-model='linkUrlS')
        tr(v-if='showHelp')
          td.help(colspan=2) It will open a new tab to navigate to that page when clicked in the sidescreen on a person. If you have an api which shows a user profile page you can enter the location here. Keep both empty if you want to see the profile information from this application (default)

        tr
          td.n Enable screencapture
          td.c
            input(type='checkbox' v-model='enableScreenCapture')
        tr(v-if='showHelp')
          td.help(colspan=2) This shows the icon to make an image of the graph to save. This does not work when you are on a local folder, so disable this option then


             
        tr
          td.n Edit command
          td.i
            input(v-model='editCommand')
        tr(v-if='showHelp')
          td.help(colspan=2) The command to type in the search box to switch to edit mode
        tr
          td.n Level colors
          td.i
            input(v-model='levelColors')   
        tr(v-if='showHelp')
          td.help(colspan=2) The colors of each level in the orgchart (specify comma separated)
                  

      div Person fields  
      table.tab
        tr(v-for = 'prop in newProperties')
          td
            input(type="text" v-model="prop.name")
          td(v-if="prop.deleted" @click='prop.deleted=false') Undelete
          td(v-else @click='prop.deleted=true') Delete
      button(@click='addProperty()') Add property
      div Startup settings

      table.tab
        tr
          td.n  Show manager photo
          td.c
            input(type='checkbox' v-model='viewPhoto')
        tr
          td.n  Show manager name
          td.c
            input(type='checkbox' v-model='viewName')
        tr
          td.n  Columnview
          td.c
            input(type='checkbox' v-model='viewColumn')
        tr
          td.n  Staff columnview
          td.c
            input(type='checkbox' v-model='viewStaffColumn')
        tr
          td.n  Show Nr of departments
          td.c
            input(type='checkbox' v-model='viewNrDepartments')
        tr
          td.n  Show Nr of people
          td.c
            input(type='checkbox' v-model='viewNrPeople')

        tr(v-if='showHelp')
          td.help(colspan=2) Sets the inital options (the user can change them in the menu bar)
            
      div
        button.bt(@click='generate()') Generate config
        button.bt(@click='close();$emit("close", true)') close
        
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import FileSaver from 'file-saver'
export default {
  data: function() {
    return {
      showHelp: true,
      newProperties: null
    }
  },
  computed: {
    ...mapState(['config', 'personProperties']),
    pageTitle: {
      get() {
        return this.config.title.text
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'title',
          subProp: 'text',
          val: value
        })
      }
    },
    pageTitleColor: {
      get() {
        return this.config.title.color
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'title',
          subProp: 'color',
          val: value
        })
      }
    },
    informationText: {
      get() {
        return this.config.information
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'information',
          val: value
        })
      }
    },
    editCommand: {
      get() {
        return this.config.editCommand
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'editCommand',
          val: value
        })
      }
    },
    levelColors: {
      get() {
        return this.config.levelColors.toString()
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'levelColors',
          val: value.split(',')
        })
      }
    },

    enableScreenCapture: {
      get() {
        return this.config.enableScreenCapture
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'enableScreenCapture',
          val: value
        })
      }
    },

    photoUrlP: {
      get() {
        return this.config.photoUrl.prefix
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'photoUrl',
          subProp: 'prefix',
          val: value
        })
      }
    },
    photoUrlS: {
      get() {
        return this.config.photoUrl.suffix
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'photoUrl',
          subProp: 'suffix',
          val: value
        })
      }
    },
    linkUrlP: {
      get() {
        return this.config.linkUrl ? this.config.linkUrl.prefix : ''
      },
      set(value) {
        if (
          !value &&
          !(this.config.linkUrl || this.config.linkUrl.suffix)
        ) {
          this.setConfigUpdate({
            prop: 'linkUrl',
            val: false
          })
          return ''
        }

        this.setConfigUpdate({
          prop: 'linkUrl',
          subProp: 'prefix',
          val: tvalue
        })
      }
    },
    linkUrlS: {
      get() {
        return this.config.linkUrl ? this.config.linkUrl.suffix : ''
      },
      set(value) {
        if (
          !value &&
          !(this.config.linkUrl || this.config.linkUrl.prefix)
        ) {
          this.setConfigUpdate({
            prop: 'linkUrl',
            val: false
          })
          return ''
        }
        this.setConfigUpdate({
          prop: 'linkUrl',
          subProp: 'suffix',
          val: value
        })
      }
    },
    viewPhoto: {
      get() {
        return this.config.startView.photos
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'startView',
          subProp: 'photos',
          val: value
        })
      }
    },
    viewName: {
      get() {
        return this.config.startView.names
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'startView',
          subProp: 'names',
          val: value
        })
      }
    },
    viewColumn: {
      get() {
        return this.config.startView.columnview
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'startView',
          subProp: 'columnview',
          val: value
        })
      }
    },
    viewStaffColumn: {
      get() {
        return this.config.startView.staffColumnview
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'startView',
          subProp: 'staffColumnview',
          val: value
        })
      }
    },
    viewNrDepartments: {
      get() {
        return this.config.startView.showNrDepartments
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'startView',
          subProp: 'showNrDepartments',
          val: value
        })
      }
    },
    viewNrPeople: {
      get() {
        return this.config.startView.showNrPeople
      },
      set(value) {
        this.setConfigUpdate({
          prop: 'startView',
          subProp: 'showNrPeople',
          val: value
        })
      }
    }
  },
  mounted: function() {
    var newProperties = JSON.parse(
      JSON.stringify(this.personProperties)
    )
    newProperties.forEach(p => {
      p.oldName = p.name
      p.deleted = true
    })
    this.newProperties = newProperties
  },
  methods: {
    ...mapMutations(['setConfigUpdate']),
    close: function() {
      console.log(this.newProperties)
    },

    generate: function() {
      this.setConfigUpdate({
        prop: 'dataFields',
        val: [{ name: 'Location', type: 'text' }]
      })
      console.log(this.config)

      var json = 'var CONFIG = ' + JSON.stringify(this.config)

      var blob = new Blob([json], {
        type: 'text/plain;charset=utf-8'
      })
      FileSaver.saveAs(blob, 'config.js')
      alert(
        'File generated. \n Overwrite the config.js file (in the root folder) with this file.'
      )
    },
    addProperty() {
      this.newProperties.push({
        name: '',
        oldName: '',
        deleted: false,
        order: this.newProperties.length,
        type: ''
      })
    }
  }
}
</script>
<style scoped>
#config_container {
  top: 50px;

  width: 100%;
  position: absolute;
  height: 0px;
  background: rgba(200, 200, 200, 0.8);
  z-index: 2;
  text-align: center;
}
#config {
  position: relative;
  font-size: 18px;
  color: black;
  width: 700px;
  max-height: calc(100vh - 130px);
  overflow: hidden;
  overflow-y: auto;
  text-align: left;
  vertical-align: top;
  margin: auto;
  margin-top: 30px;
  display: inline-block;
  display: relative;
  background-color: white;
  padding: 5px;
  z-index: 2;
  border: 0px solid grey;
  padding: 3px 10px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
}
.close {
  font-size: 16px;
  background-color: grey;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  position: fixed;
  right: 10px;
  top: 10px;
}
.close:hover {
  background-color: lightgray;
  color: black;
}
.photo {
  width: 200px;
  height: 200px;
  display: inline-block;
  margin: 0px 10px;
}
.details {
  width: 350px;
  display: inline-block;
  text-align: left;
  vertical-align: top;
}
.tab {
  margin-bottom: 10px;
  width: 600px;
  font-size: 14px;
}
.tab .n {
  color: black;
  width: 150px;
}
.tab .i {
  color: black;
  width: 450px;
}
.tab .i input {
  width: 100%;
}
.tab .i textarea {
  width: 100%;
  height: 50px;
}
.tab .c {
  text-align: left;
}
.prop {
  width: 120px;
  color: grey;
  text-align: left;
}
.tab .val {
  color: black;
  text-align: left;
  width: 400px;
}
.tab .val1 {
  width: 250px;
}
.section {
  color: grey;
  font-weight: 600;
}
.im {
  width: 100%;
}
.personname {
  width: 100%;
  text-align: left;
  padding: 10px;
  color: black;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}
table td,
table td * {
  vertical-align: top;
}
.role {
  color: grey;
}
.dep {
  cursor: pointer;
}
.dep:hover {
  background-color: lightblue;
}
.btn {
  text-align: center;
  column-span: 2;
}
.btn button {
  padding: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}
.btn1 {
  padding: 10px 20px;
  border: 2px solid green;
  border-radius: 5px;
  color: white;
  background-color: green;
  cursor: pointer;
}
.btn1:disabled {
  color: grey;
  border: 2px solid lightgrey;
  background-color: lightgrey;
  cursor: not-allowed;
}
.nophoto {
  font-size: 200px;
  color: lightgrey;
}
td.help {
  color: rgb(61, 60, 60);
  padding-bottom: 10px;
  font-size: 12px;
}
button.bt {
  padding: 10px;
  margin: 10px;
}
button {
  cursor: pointer;
}
</style>
