var CONFIG = {
  // You can set the header color and title,
  title: {
    color: '#05668d',
    text: 'Interactive organization chart'
  },

  // provide text to display when clicked on the (i) button (you can use HTML). Leave empty if not needed
  information:
    'Do you see something wrong? Please drop a <em>mail</em> to <a href="mailto:someone@example.com?Subject=Hello%20again" target="_top">someone@example.com</a>',

  // The position where to get the photo's
  // For these locations it is fetched from "prefix" + photo + "suffix".
  // So if you have photo P0001, it will be fetched from "photos/P0001.png".
  // If you have an api or other locations which delivers photo's based on the photo field you can change that here.
  photoUrl: {
    prefix: 'photos/',
    suffix: '.png'
  },

  // It will open a new tab to navigate to that page when clicked in the sidescreen on a person.
  // If you have an api which shows a user profile page you can enter the location here.
  // Don't specify this object if you want to see the profile information from this application (default)
  //linkUrl: {
  //  prefix: 'photos/',
  //  suffix: '.png'
  //},

  // Sets the inital options (the user can change them in the menu bar)
  startView: {
    photos: true,
    names: true,
    columnview: true,
    staffColumnview: false,
    showNrDepartments: true,
    showNrPeople: true
  },

  //This shows the icon to make an image of the graph to save.
  //This does not work when you are on a local folder, so disable this option then
  enableScreenCapture: true,

  //The colors of each level in the orgchart
  levelColors: [
    '#0c058d',
    '#05668d',
    '#8d6e05',
    '#8d2305',
    '#cfb303'
  ],

  // the command to type in the searchbar to switch to edit mode
  editCommand: '_edit',
  dataFields: [{ name: 'Location', type: 'text' }]
}
