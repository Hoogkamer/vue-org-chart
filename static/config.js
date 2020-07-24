var CONFIG = {
  // color and text of the title bar
  title: {
    color: '#05668d',
    text: 'Interactive organization chart'
  },
  //provide text to display when clicked on the (i) button (you can use HTML). Leave empty if not needed
  information:
    'Do you see something wrong? Please drop a <em>mail</em> to <a href="mailto:someone@example.com?Subject=Hello%20again" target="_top">someone@example.com</a>',
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
    staffColumnview: false,
    showNrDepartments: true,
    showNrPeople: true
  },
  enableScreenCapture: true,
  levelColors: [
    '#0c058d',
    '#05668d',
    '#8d6e05',
    '#8d2305',
    '#cfb303'
  ],
  editCommand: '_edit', //the command to type in the searchbar to switch to edit mode
  dataFields: [{ name: 'Location', type: 'text' }]
}
