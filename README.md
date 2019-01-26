# vueOrgChart

> Organization chart
Static website (no webserver required) to generate an interactive organisation chart
(c) Michael Hoogkamer

*WORK IN PROGRESS*


[Demo](https://hoogkamer.github.io/vue-org-chart/)

![Screenshot](/assets/img/Screenshot1.PNG?raw=true "Screenshot")

## Use as static website
You can use it as-is as a static website: no install, no webserver needed!

1. Copy content of \docs folder to any location, like a folder on your computer, AWS S3 bucket or webserver
2. Open index.html in the browser. When you use Internet Explorer it will not work if you placed the files on a folder (Chrome does work). S3 or webserverer will work for both browsers

## Configure
``` bash
var CONFIG = {
  title: {
    color: '#05668d',
    text: 'Organisation chart example'
  },
  photoUrl: {
    prefix: 'photos/',
    suffix: '.png'
  },
  levelColors: ['#0c058d', '#05668d', '#8d6e05', '#8d2305', '#cfb303']
}
```
The config file is in /config.js or if you want to build yourself in /static/config.js
You can set the header color and title, the colors of each level in the orgchart and the position where to get the photo's
For these locations it is fetched from "prefix" + photoURL + "suffix". So if you have photoURL P0001, it will be fetched from "photos/P0001.png". If you have an api or other locations which delivers photo's based on the userid you can change that here.

## User manual for website
- Options > Column view: shows underlying departments in a column, giving a compact overview
- Switch to edit mode: type "_edit" in the search box. This will bring up the File menu, and makes the chart editable
- File > Export excel: export the data to excel, so you can edit it in excel. It contains:
    - chart: id, name, description, parent, indicator for staff department, and id of the manager (from the people tab)
    - people: id, name, link to photo (see also config.js above), and main role/function of the person
    - assignment: department id (from chart tab), person id (from people tabl) and role. These are the people working for the department. (manager is assigned in the chart tab)
        People can be assigned to multiple departments, or even more times to 1 department (with different role for example)
- File > Import excel: replaces the chart with data from the excel (export to excel first to get proper layout of the sheets)
- File > Generate inputfile: Creates the inputfile to make changes you made persistent. Overwrite this file in the root \data.js
        To enable profile photo's, put them in the \photos folder (see also config.js above), and name them with the photoURL used in the people tab with type png. So if the photoURL of someone is P0001, then name the photo P0001.png

In stead of xls you can also edit in the page when in edit mode.:

- Left-click on a department and edit the name, description of type staff in the left screen. To change the manager, press the pencil and search for the right person. You can also add a new person, by filling in a name and id. First unselect the current manager then, if the department already has a manager
- Add people the same way (use the people tab in the left screen). You can also provide the role the person has in the department
- Right-click on a department in the chart to add a department below
- With right-click you can also move a department: select Cut, then click on another department and right-click and select paste. Do not paste a parent under one of its children (this check has to be build)

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
static output will be place in \dist folder, copy this to any location
```
