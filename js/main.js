/* global data */
/* exported data */

/* creating a new entry */
var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', createEntry);

function createEntry(event) {
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  showEntryForm();
  $deleteButton.className = 'hidden';
}

var $title = document.querySelector('#title');
var $photoURL = document.querySelector('#photo-url');
var $img = document.querySelector('img');
var $textArea = document.querySelector('#text-area');
$photoURL.addEventListener('input', photoUpdate);

function photoUpdate(event) {
  var photoURL = event.target.value;
  $img.setAttribute('src', photoURL);
}

/* submitting/viewing an entry */
var $form = document.querySelector('.form');
$form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();

  if (data.editing === null) {
    var formInput = {};
    formInput.entryId = data.nextEntryId;
  } else {
    var entryElement = data.editing;
    formInput = getEntry(entryElement);
  }
  formInput.title = $title.value;
  formInput.photoURL = $photoURL.value;
  formInput.notes = $textArea.value;
  var domTree = renderEntry(formInput);

  if (data.editing === null) {
    $ul.prepend(domTree);
    data.entries.unshift(formInput);
    data.nextEntryId++;
  } else {
    entryElement.replaceWith(domTree);
  }

  showEntries();
}

function renderEntry(entry) {
  var $entriesList = document.createElement('li');

  var $outerDiv = document.createElement('div');
  $outerDiv.className = 'row margin-top';
  $entriesList.append($outerDiv);

  var $innerDiv = document.createElement('div');
  $innerDiv.className = 'column-half';
  $outerDiv.append($innerDiv);

  var $secondInnerDiv = document.createElement('div');
  $secondInnerDiv.className = 'column-half';
  $outerDiv.append($secondInnerDiv);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $innerDiv.append($img);

  var $rowHalf = document.createElement('div');
  $rowHalf.className = 'row align-items';
  $secondInnerDiv.append($rowHalf);

  var $h2 = document.createElement('h2');
  $h2.className = 'three-quarter-width';
  var $h2Text = document.createTextNode(entry.title);
  var $editIcon = document.createElement('i');
  $editIcon.className = 'fa-solid fa-pen-to-square margin-left cursor-pointer';

  var $p = document.createElement('p');
  $p.className = 'font-sans';
  var $pText = document.createTextNode(entry.notes);
  $h2.append($h2Text);
  $p.append($pText);
  $rowHalf.append($h2);
  $rowHalf.append($editIcon);
  $secondInnerDiv.append($p);

  $entriesList.setAttribute('data-entry-id', entry.entryId);
  return $entriesList;
}

document.addEventListener('DOMContentLoaded', loadedDOMContent);

function loadedDOMContent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = renderEntry(data.entries[i]);
    $ul.append(renderedEntry);
  }
}

var $entries = document.querySelector('.entries');
var $entryForm = document.querySelector('.entry-form');

function showEntryForm(event) {
  $entryForm.className = 'entry-form';
  $entries.className = 'hidden';
  data.view = 'entry-form';
}
var $modalBackground = document.querySelector('.modal-background');
var $entriesButton = document.querySelector('a');
$entriesButton.addEventListener('click', showEntries);

function showEntries(event) {
  $entryForm.className = 'entry-form hidden';
  $entries.className = 'entries';
  data.view = 'entries';
  data.editing = null;
  $modalBackground.className = 'hidden';
}

/* editing an entry */
var $ul = document.querySelector('ul');
$ul.addEventListener('click', editEntry);

function editEntry(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  showEntryForm();
  $confirmButton.className = 'confirm-button cursor-pointer';
  $deleteButton.className = 'delete-button cursor-pointer';

  var entryElement = event.target.closest('li');
  data.editing = entryElement;
  var entryObject = getEntry(entryElement);

  $title.value = entryObject.title;
  $photoURL.value = entryObject.photoURL;
  $img.setAttribute('src', entryObject.photoURL);
  $textArea.value = entryObject.notes;
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

/* deleting an entry */

var $deleteButton = document.querySelector('.delete-button');
$deleteButton.addEventListener('click', deleteEntry);

function deleteEntry(event) {
  $modalBackground.className = 'modal-background';
}

var $cancelButton = document.querySelector('.cancel-button');
$cancelButton.addEventListener('click', cancelModal);

function cancelModal(event) {
  $modalBackground.className = 'modal-background hidden';
}

var $confirmButton = document.querySelector('.confirm-button');
$confirmButton.addEventListener('click', confirmDelete);

function confirmDelete(event) {
  var entryElement = data.editing;
  var entryID = entryElement.getAttribute('data-entry-id');
  entryElement.remove();
  showEntries();

  for (let i = 0; i < data.entries.length; i++) {
    if (entryID === data.entries[0].entryId.toString()) {
      data.entries.splice(i, 1);
    }
  }
}
if (data.view === 'entry-form') {
  showEntryForm();
} else {
  showEntries();
}
