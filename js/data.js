/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function beforeLoad(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', entriesJSON);
}

var storedData = localStorage.getItem('javascript-local-storage');
if (storedData !== null) {
  data = JSON.parse(storedData);
}

window.addEventListener('beforeunload', beforeLoad);
