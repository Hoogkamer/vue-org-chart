# vueOrgChart

> Organization chart:
A complete solution to generate and publish an orgchart without the need of a webserver and database
(c) Michael Hoogkamer

[Demo](https://hoogkamer.github.io/vue-org-chart/)

![Screenshot](/assets/img/Screenshot1.PNG?raw=true "Screenshot")

## Features

- Just runs everywhere, no install, no webserver, no database needed!
- Edit in excel (bulk updates, external source)
- Edit in the webpage
- Supports multiple 1000's departments
- Panzoom and interactive expansion of subdepartments
- Deeplinks to departments
- Save as image
- Search for departments and managers
- Add employees to departments
- Use photo's from api (not included), or local folder
- Click on employee to link to api (not included) or local folder

## Use as static website

To use this website as-is:
1. Copy content of \docs folder to any location, like a folder on your computer, AWS S3 bucket or webserver
2. Open index.html in the browser. When you use Internet Explorer it will not work if you placed the files on a folder (Chrome does work). S3 or webserverer will work for both browsers

## Configure

``` bash
var CONFIG = {
  title: {
    color: '#05668d',
    text: 'Interactive organization chart'
  },
  photoUrl: {
    prefix: 'photos/',
    suffix: '.png'
  },
  linkUrl: {
    prefix: 'photos/',
    suffix: '.png'
  },
  startView: {
    photos: true,
    names: true,
    columnview: true,
    staffColumnview: false
  },
  enableScreenCapture: true,
  levelColors: ['#0c058d', '#05668d', '#8d6e05', '#8d2305', '#cfb303']
}


```

The config file is in /config.js

- You can set the header color and title, and the colors of each level in the orgchart
- The position where to get the photo's  
For these locations it is fetched from "prefix" + photo + "suffix". So if you have photo P0001, it will be fetched from "photos/P0001.png". If you have an api or other locations which delivers photo's based on the photo field you can change that here.

- The linkUrl  
It will open a new tab to navigate to that page when clicked in the sidescreen on a person. In this example it will just fetch the photo in a new tab, but if you have an api which shows a user profile page you can enter the location here.
startView sets the inital options (the user can change them in the menu bar)

- Enable screen capture  
This shows the icon to make an image of the graph to save. This does not work when you are on a local folder, so disable this option then

## User manual for website

- Options > Column view:  
Shows underlying departments in a column, giving a compact overview. You can also prevent this for staff departments
- Options > Show manager photo/Show manager name  
Show/hide the photos and/or names in the graph

### FAQ

- __How can I change/edit the graph?__  
Type *_edit* in the searchbar to swith to editmode. Now you can edit the graph in the application or update via excel

- __How does editing work in the application?__
  - Left-click on a department and edit the name, description of type staff in the left screen. To change the manager, press the pencil and search for the right person. You can also add a new person, by filling in a name and id. First unselect the current manager then, if the department already has a manager
  - Add people the same way (use the people tab in the left screen). You can also provide the role the person has in the department
  - Right-click on a department in the chart to add a department below
  - With right-click you can also move a department: select Cut, then click on another department and right-click and select paste. Do not paste a parent under one of its children (this check has to be build)

- __How does editing work in excel?__  
Select _File > Export excel_. It contains:
  - chart: id, name, description, parent, indicator for staff department, and id of the manager (from the people tab)
  - people: id, name, link to photo (see also config.js above), and main role/function of the person
  - assignment: department id (from chart tab), person id (from people tabl) and role. These are the people working for the department. (manager is assigned in the chart tab) People can be assigned to multiple departments, or even more times to 1 department (with different role for example)
  
  When done, select _File > Import excel_

- __How do I save the changes for others to see?__  
Everything happens at client side, so changes are only available for you. And if you refresh the page the changes will be gone. To make the changes persistent you must select _File > Generate inputfile_ to create a javascript file which contains the data. This file (data.js) you then must place in the root folder this application is at, replacing the already existing file _data.js_

- __Who can edit the graph?__  
Anyone can edit, but as stated above, it will be only available for that person. To make the data available for others, you need write access to the folder this application is at, so you can overwrite the _data.js_  file

- __How do I change the order of the departments under a parent?__  
This is not directly supported. There are 2 possibilities however. First switch to editmode. 1) export to excel, then change the order in the sheet, and then read the excel in again 2) cut the department, and paste it under the same parent again. It will be placed last.

- __Why does running from a local folder not work in Internet Exporer (IE11)?__  
I do not know, but who uses it anyways :) It does work in Chrome however, and running from a webserver or S3 bucket works for both browsers

- __How can I use this in my own code__  
This is not meant to be a plugin/library, but it is a complete solution. If you want to use this as a part of your own application I recommend to search for a real orgchart plugin.

## Build Setup
This is only needed if you want to build/change your own version. If you want to use it without modification, see: _use as static website_

_The config.js, data.js and photos folder used for development are in the \static folder_

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
