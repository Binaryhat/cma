var events = [
  {'Date': new Date("10-10-2019"), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com','eventType': 'meeting'},
  {'Date': new Date("10-3-2019"), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
];

var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);

