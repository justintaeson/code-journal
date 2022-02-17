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
var $unorderedList = document.querySelector('ul');

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
  $entriesList.prepend(renderEntry(formInput));
}

function renderEntry(entry) {
  var $unorderedList = document.createElement('ul');

  var $outerDiv = document.createElement('div');
  $outerDiv.className = 'row margin-top';
  $unorderedList.appendChild($outerDiv);

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

  $unorderedList.setAttribute('data-entry-id', entry.nextEntryId);
  return $unorderedList;
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
}

function showEntries(event) {
  $entryForm.className = 'hidden';
  $entries.className = 'entries';
  data.view = 'entries';
}
function getObject($unorderedList) {
  var entryID = $unorderedList.getAttribute('data-entry-ID');
  for (let i = 0; i < data.entries.length; i++) {
    if (entryID === data.entries[i].entryID) {
      var entryObject = data.entries[i];
      data.editing = $unorderedList;
      return entryObject;
    }
  }
}

function editEntry(event) {
  showEntryForm();

  var entryObject = getObject($unorderedList);
  $title.value = entryObject.title;
  $photoURL.value = entryObject.photoURL;
  $img.setAttribute('src', entryObject.photoURL);
  $textArea.value = entryObject.notes;
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
$unorderedList.addEventListener('click', editEntry);
