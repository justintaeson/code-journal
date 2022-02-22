/* global data */
/* exported data */

var $img = document.querySelector('img'); // allows us to access the image element
var $photoURL = document.querySelector('#photo-url'); // allows us to access the input element through its ID 'photo-url'
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
var $submitButton = document.querySelector('.confirm-button');
var $modalBackground = document.querySelector('.modal-background');

function photoUpdate(event) {
  var photoLink = event.target.value; // gets the value of the closest element; grabs the value of the input in the photo URL box and assign it to the variable photoLink
  $img.setAttribute('src', photoLink); // set the src attribute of the image element to photoLink (should be a URL of a photo; this will update the image)
}

function submitForm(event) {
  event.preventDefault(); // prevents the default from happening which is to refresh the page for 'submit' event handler
  var formInput = {}; // variable that creates an empty object to store the user's inputs
  var domTree = renderEntry(formInput); // variable that creates a DOM tree

  if (data.editing !== null) { // if this is not a new entry...
    var entryListElement = event.target.closest('li'); // grab the closest li element of the form element which should be the DOM tree since that's the only li element
    entryListElement.replaceWith(domTree); //
  } else {
    formInput.title = $title.value; // create a title property in the formInput object and give it the value of the user's input for title
    formInput.photoURL = $photoURL.value; // create a photoURL property in the formInput object and give it the value of the user's input for photoURL
    formInput.notes = $textArea.value; // create a notes property in the formInput object and give it the value of the user's input for the textArea
    formInput.entryId = data.nextEntryId; // create a entryID property in the formInput object so we can track what number entry it is
    data.nextEntryId++; // increment the entryID in our data model so that everytime someone presses submit it automatically updates the entryID
    $entriesList.prepend(renderEntry(formInput)); // get the entriesList element which is 'ul' and attach the created DOM tree of the user's inputs which was created from the renderEntry function
    data.entries.unshift(formInput); // throw the user's inputs which is in an object to the front of the entries array in our data model
  }

  showEntries();
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
  $modalBackground.className = 'modal-background';
}

function confirmDelete(event) {
  showEntries();

  var entryListElement = event.target.closest('li');

  document.removeChild(entryListElement);

}

if (data.view === 'entry-form') {
  showEntryForm();
} else {
  showEntries();
}
$photoURL.addEventListener('input', photoUpdate); // for the input element with an ID of photoURL, whenever someone puts an input in, run the photoUpdate function
$saveButton.addEventListener('submit', submitForm); // listen for when someone clicks on the submit entry button on the button element, when someone submits - run the submitForm function
document.addEventListener('DOMContentLoaded', loadedDOMContent);
$newButton.addEventListener('click', showEntryForm);
$entriesButton.addEventListener('click', showEntries);
$entriesList.addEventListener('click', editEntry);
$deleteButton.addEventListener('click', deleteEntry);
$cancelButton.addEventListener('click', cancelModal);
$submitButton.addEventListener('click', confirmDelete);
