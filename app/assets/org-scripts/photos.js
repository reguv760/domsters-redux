function showPic(whichpic) {
  if (!document.getElementById('placeholder')) return true;
  const source = whichpic.getAttribute('href');
  const placeholder = document.getElementById('placeholder');
  placeholder.setAttribute('src', source);
  if (!document.getElementById('description')) return false;
  if (whichpic.getAttribute('title')) {
    var text = whichpic.getAttribute('title');
  } else {
    var text = '';
  }
  const description = document.getElementById('description');
  if (description.firstChild.nodeType == 3) {
    description.firstChild.nodeValue = text;
  }
  return false;
}

function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('imagegallery')) return false;
  const placeholder = document.createElement('img');
  placeholder.setAttribute('id', 'placeholder');
  placeholder.setAttribute('src', 'images/placeholder.gif');
  placeholder.setAttribute('alt', 'my image gallery');
  const description = document.createElement('p');
  description.setAttribute('id', 'description');
  const desctext = document.createTextNode('Choose an image');
  description.appendChild(desctext);
  const gallery = document.getElementById('imagegallery');
  insertAfter(description, gallery);
  insertAfter(placeholder, description);
}

function prepareGallery() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('imagegallery')) return false;
  const gallery = document.getElementById('imagegallery');
  const links = gallery.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      return showPic(this);
    };
  }
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
