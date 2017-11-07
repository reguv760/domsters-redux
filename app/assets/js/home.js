/* eslint-disable consistent-return, radix, no-undef */
function moveElement(elementId, finalX, finalY, interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementId)) return false;
  const elem = document.getElementById(elementId);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = '0px';
  }
  if (!elem.style.top) {
    elem.style.top = '0px';
  }
  let xPos = parseInt(elem.style.left);
  let yPos = parseInt(elem.style.top);
  let dist;
  if (xPos === finalX && yPos === finalY) {
    return true;
  }
  if (xPos < finalX) {
    dist = Math.ceil((finalX - xPos) / 10);
    xPos += dist;
  }
  if (xPos > finalX) {
    dist = Math.ceil((xPos - finalX) / 10);
    xPos -= dist;
  }
  if (yPos < finalY) {
    dist = Math.ceil((finalY - yPos) / 10);
    yPos += dist;
  }
  if (yPos > finalY) {
    dist = Math.ceil((yPos - finalY) / 10);
    yPos -= dist;
  }
  elem.style.left = `${xPos}px`;
  elem.style.top = `${yPos}px`;
  const repeat = `moveElement("${elementId}", "${finalX}", "${finalY}", "{$interval}")`;
  elem.movement = setTimeout(repeat, interval);
}


function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('intro')) return false;
  const intro = document.getElementById('intro');
  const slideshow = document.createElement('div');
  slideshow.setAttribute('id', 'slideshow');
  const frame = document.createElement('img');
  frame.setAttribute('src', 'images/frame.gif');
  frame.setAttribute('alt', '');
  frame.setAttribute('id', 'frame');
  slideshow.appendChild(frame);
  const preview = document.createElement('img');
  preview.setAttribute('src', 'images/slideshow.gif');
  preview.setAttribute('alt', 'a glimpse of what awaits you');
  preview.setAttribute('id', 'preview');
  slideshow.appendChild(preview);
  insertAfter(slideshow, intro);
  const links = document.getElementsByTagName('a');
  for (let i = 0; i < links.length; i += i + 1) {
    links[i].onmouseover = function onMouseOver() {
      const destination = this.getAttribute('href');
      if (destination.indexOf('index.html') !== -1) {
        moveElement('preview', 0, 0, 5);
      }
      if (destination.indexOf('about.html') !== -1) {
        moveElement('preview', -150, 0, 5);
      }
      if (destination.indexOf('photos.html') !== -1) {
        moveElement('preview', -300, 0, 5);
      }
      if (destination.indexOf('live.html') !== -1) {
        moveElement('preview', -450, 0, 5);
      }
      if (destination.indexOf('contact.html') !== -1) {
        moveElement('preview', -600, 0, 5);
      }
    };
  }
}

addLoadEvent(prepareSlideshow);
