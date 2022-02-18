/* global data */
/* exported data */

var $img = document.querySelector('img');
var $photoURL = document.querySelector('#photo-url');
var $form = document.querySelector('.form');
var $title = document.querySelector('#title');
var $textArea = document.querySelector('#text-area');
var $entriesList = document.querySelector('ul');
var $newButton = document.querySelector('.new-button');
var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');
var $saveButton = document.querySelector('.save-button');
var $entriesButton = document.querySelector('a');

function photoUpdate(event) {
  var photoLink = event.target.value;
  $img.setAttribute('src', photoLink);
}

function submitForm(event) {
  event.preventDefault();

  if (data.editing === null) {
    var formInput = {};
    formInput.nextEntryId = data.nextEntryId;
  } else {
    var entryListElement = data.editing;
    formInput = getObject(entryListElement);
  }
  formInput.title = $title.value;
  formInput.photoURL = $photoURL.value;
  formInput.notes = $textArea.value;
  var currentEntry = renderEntry(formInput);

  if (data.editing === null) {
    $entriesList.prepend(renderEntry(formInput));
    data.nextEntryId++;
    data.entries.unshift(formInput);
  } else {
    entryListElement.replaceWith(currentEntry);
  }
}

function renderEntry(entry) {
  var $entriesList = document.createElement('li');

  var $outerDiv = document.createElement('div');
  $outerDiv.className = 'row margin-top';
  $entriesList.appendChild($outerDiv);

  var $innerDiv = document.createElement('div');
  $innerDiv.className = 'column-half';
  $outerDiv.appendChild($innerDiv);

  var $secondInnerDiv = document.createElement('div');
  $secondInnerDiv.className = 'column-half';
  $outerDiv.appendChild($secondInnerDiv);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $innerDiv.appendChild($img);

  var $rowHalf = document.createElement('div');
  $rowHalf.className = 'row align-items';
  $secondInnerDiv.appendChild($rowHalf);

  var $h2 = document.createElement('h2');
  $h2.className = 'three-quarter-width';
  var $h2Text = document.createTextNode(entry.title);
  var $editIcon = document.createElement('i');
  $editIcon.className = 'fa-solid fa-pen-to-square margin-left cursor-pointer';

  var $p = document.createElement('p');
  $p.className = 'font-sans';
  var $pText = document.createTextNode(entry.notes);
  $h2.appendChild($h2Text);
  $p.appendChild($pText);
  $rowHalf.appendChild($h2);
  $rowHalf.appendChild($editIcon);
  $secondInnerDiv.appendChild($p);

  $entriesList.setAttribute('data-entry-id', entry.nextEntryId);
  return $entriesList;
}

function getObject(entryList) {
  var entryId = entryList.getAttribute('data-entry-id');
  for (let i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].nextEntryId.toString()) {
      var entryObject = data.entries[i];
      return entryObject;
    }
  }
}

function editEntry(event) {
  showEntryForm();
  var entryListElement = event.target.closest('li');
  var entryObject = getObject(entryListElement);
  $title.value = entryObject.title;
  $photoURL.value = entryObject.photoURL;
  $img.setAttribute('src', entryObject.photoURL);
  $textArea.value = entryObject.notes;
  data.editing = entryListElement;
}

function loadedDOMContent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entriesList.append(renderEntry(data.entries[i]));
  }
}

function showEntryForm(event) {
  $entryForm.className = 'entry-form';
  $entries.className = 'hidden';
  data.view = 'entry-form';
  data.editing = null;
}

function showEntries(event) {
  $entryForm.className = 'hidden';
  $entries.className = 'entries';
  data.view = 'entries';
  data.editing = 'null';
}

if (data.view === 'entry-form') {
  showEntryForm();
} else {
  showEntries();
}
$photoURL.addEventListener('input', photoUpdate);
$form.addEventListener('submit', submitForm);
document.addEventListener('DOMContentLoaded', loadedDOMContent);
$newButton.addEventListener('click', showEntryForm);
$saveButton.addEventListener('click', showEntries);
$entriesButton.addEventListener('click', showEntries);
$entriesList.addEventListener('click', editEntry);
