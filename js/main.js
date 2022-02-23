/* global data */
/* exported data */

/* creating a new entry */

var $newButton = document.querySelector('.new-button'); // create a variable
$newButton.addEventListener('click', createEntry);

function createEntry(event) {
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  showEntryForm();
  $deleteButton.className = 'hidden';
}

/* functionality for entry form */
var $title = document.querySelector('#title'); // allows us to access the input element with the class 'title.
var $photoURL = document.querySelector('#photo-url'); // allows us to access the input element with the class 'photo-url'.
var $img = document.querySelector('img'); // allows us to access the image element
var $textArea = document.querySelector('#text-area'); // allows us to access the textarea element with the class 'text-area'.
$photoURL.addEventListener('input', photoUpdate); // for the input element with an ID of photoURL, whenever someone puts an input in, run the photoUpdate function

function photoUpdate(event) {
  var photoURL = event.target.value; // gets the value of the closest element; grabs the value of the input in the photo URL box and assign it to the variable photoLink
  $img.setAttribute('src', photoURL); // set the src attribute of the image element to photoLink (should be a URL of a photo; this will update the image)
}

/* what happens you submit the form */
function submitForm(event) {
  event.preventDefault(); // prevents the default from happening which is to refresh the page for 'submit' event handler

  if (data.editing === null) { // if this is a new entry...
    var formInput = {}; // a variable is created with a value of an empty object to store the user's inputs
    formInput.entryId = data.nextEntryId; // create a property of 'entryId' in the formInput object with the value of the data model's nextEntryId property.
  } else { // if this is not a new entry
    var entryElement = data.editing; // a variable is created with a value of the data model's editing property (should be an element);
    formInput = getEntry(entryElement); // the value of the
  }
  formInput.title = $title.value; // create a title property in the formInput object and give it the value of the user's input for title
  formInput.photoURL = $photoURL.value; // create a photoURL property in the formInput object and give it the value of the user's input for photoURL
  formInput.notes = $textArea.value; // create a notes property in the formInput object and give it the value of the user's input for the textArea
  var domTree = renderEntry(formInput); // variable that creates a DOM tree

  if (data.editing === null) {
    $ul.prepend(domTree); // get the entriesList element which is 'ul' and attach the created DOM tree of the user's inputs which was created from the renderEntry function
    data.entries.unshift(formInput); // throw the user's inputs which is in an object to the front of the entries array in our data model
    data.nextEntryId++; // increment the entryID in our data model so that everytime someone presses submit it automatically updates the entryID
  } else {
    entryElement.replaceWith(domTree);
  }

  showEntries();
}

var $ul = document.querySelector('ul');

var $entries = document.querySelector('.entries');
var $entriesButton = document.querySelector('a');
var $deleteButton = document.querySelector('.delete-button');
var $cancelButton = document.querySelector('.cancel-button');
var $confirmButton = document.querySelector('.confirm-button');
var $modalBackground = document.querySelector('.modal-background');
var $form = document.querySelector('.form');
var $entryForm = document.querySelector('.entry-form');

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
  if (event.target.tagName !== 'I') {
    return;
  }
  showEntryForm(); /* show the entry form */
  $confirmButton.className = 'confirm-button cursor-pointer';
  $deleteButton.className = 'delete-button cursor-pointer';

  var entryElement = event.target.closest('li'); // entryListElement = grabs the closeest li element which should be the one you selected since it's in the front of the entries */
  data.editing = entryElement;
  var entryObject = getEntry(entryElement); // entryObject = the inputs as an object for the current input

  $title.value = entryObject.title; /* populate the title input with the title that's in the current li element */
  $photoURL.value = entryObject.photoURL; /* populate the photoURL input with the photoURL that's in the current li element */
  $img.setAttribute('src', entryObject.photoURL); /* set the image src to the photoURL in the li element; should show the picture */
  $textArea.value = entryObject.notes; /* populate the textArea input with the textArea content that's in the current li element */
}

function loadedDOMContent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = renderEntry(data.entries[i]);
    $ul.append(renderedEntry);
  }
}

function showEntryForm(event) {
  $entryForm.className = 'entry-form';
  $entries.className = 'hidden';
  data.view = 'entry-form';
}

function showEntries(event) {
  $entryForm.className = 'entry-form hidden';
  $entries.className = 'entries';
  data.view = 'entries';
  data.editing = null;
  $modalBackground.className = 'hidden';
}

function cancelModal(event) {
  $modalBackground.className = 'modal-background hidden';
}

function deleteEntry(event) {
  $modalBackground.className = 'modal-background';
}

function confirmDelete(event) {
  var entryElement = data.editing;
  entryElement.remove();
  showEntries();
}

document.addEventListener('DOMContentLoaded', loadedDOMContent);
$entriesButton.addEventListener('click', showEntries);

$ul.addEventListener('click', editEntry);
$form.addEventListener('submit', submitForm);

$deleteButton.addEventListener('click', deleteEntry);

$cancelButton.addEventListener('click', cancelModal);
$confirmButton.addEventListener('click', confirmDelete);

if (data.view === 'entry-form') {
  showEntryForm();
} else {
  showEntries();
}
