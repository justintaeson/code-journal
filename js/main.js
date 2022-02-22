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
var $deleteButton = document.querySelector('.delete-button');
var $cancelButton = document.querySelector('.cancel-button');
var $submitButton = document.querySelector('.submit-button');
var $modalBackground = document.querySelector('.modal-background');

function photoUpdate(event) {
  var photoLink = event.target.value;
  $img.setAttribute('src', photoLink);
}

function submitForm(event) {
  event.preventDefault();
  var formInput = {};
  formInput.entryId = data.nextEntryId;
  formInput.title = $title.value;
  formInput.photoURL = $photoURL.value;
  formInput.notes = $textArea.value;
  data.nextEntryId++;
  $entriesList.prepend(renderEntry(formInput));
  data.entries.unshift(formInput);
  renderEntry(formInput);

  if (data.editing !== null) {
    var entryListElement = event.target.closest('li');
    entryListElement.replaceWith(formInput);
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

  $entriesList.setAttribute('data-entry-id', entry.entryId);
  return $entriesList;
}

function getEntry(entryList) {
  var entryId = entryList.getAttribute('data-entry-id');
  for (let i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].entryId.toString()) {
      var entryObject = data.entries[i];
      return entryObject;
    }
  }
}

function editEntry(event) { /* when you click on the edit button */
  showEntryForm(); /* show the entry form */
  var entryListElement = event.target.closest('li'); /* entryListElement = grabs the closeest li element which should be the one you selected since it's in the front of the entries */
  var entryObject = getEntry(entryListElement); /* entryObject = the inputs as an object for the current input */
  $title.value = entryObject.title; /* populate the title input with the title that's in the current li element */
  $photoURL.value = entryObject.photoURL; /* populate the photoURL input with the photoURL that's in the current li element */
  $img.setAttribute('src', entryObject.photoURL); /* set the image src to the photoURL in the li element; should show the picture */
  $textArea.value = entryObject.notes; /* populate the textArea input with the textArea content that's in the current li element */
  data.editing = entryListElement; /* set the editing property in our data model to the element */
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
  data.editing = null;
}

function cancelModal(event) {
  $modalBackground.className = 'modal-background hidden';
}

function deleteEntry(event) {
  data.entries.shift();

  showEntries();
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
$deleteButton.addEventListener('click', deleteEntry);
$cancelButton.addEventListener('click', cancelModal);
$submitButton.addEventListener('click', deleteEntry);
