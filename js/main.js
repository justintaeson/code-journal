/* global data */
/* exported data */

var $img = document.querySelector('img');
var $photoURL = document.querySelector('#photo-url');
var $form = document.querySelector('.form');
var $title = document.querySelector('#title');
var $textArea = document.querySelector('#text-area');

function photoUpdate(event) {
  var photoLink = event.target.value;
  $img.setAttribute('src', photoLink);
}

function submitForm(event) {
  event.preventDefault();
  var formInput = {};
  formInput.title = $title.value;
  formInput.photoURL = $photoURL.value;
  formInput.notes = $textArea.value;
  formInput.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formInput);
  $img.setAttribute('src', 'images/images/placeholder-image-square.jpg');
  $form.reset();
}

function handleUnload(event) {
  var newEntry = JSON.stringify(data.entries[0]);
  localStorage.setItem('javascript-local-storage', newEntry);
}

$photoURL.addEventListener('input', photoUpdate);
$form.addEventListener('submit', submitForm);
window.addEventListener('beforeunload', handleUnload);
