/* global data */
/* exported data */

var $img = document.querySelector('img');
var $photoURL = document.querySelector('#photo-url');

function photoUpdate(event) {
  var photoLink = event.target.value;
  $img.setAttribute('src', photoLink);

}
$photoURL.addEventListener('input', photoUpdate);
