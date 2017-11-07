function moveElement(elementID, final_x, final_y, interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  const elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = '0px';
  }
  if (!elem.style.top) {
    elem.style.top = '0px';
  }
  let xpos = parseInt(elem.style.left);
  let ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos) / 10);
    xpos += dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x) / 10);
    xpos -= dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos) / 10);
    ypos += dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y) / 10);
    ypos -= dist;
  }
  elem.style.left = `${xpos}px`;
  elem.style.top = `${ypos}px`;
  const repeat = `moveElement('${elementID}',${final_x},${final_y},${interval})`;
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
  for (let i = 0; i < links.length; i++) {
    links[i].onmouseover = function () {
      const destination = this.getAttribute('href');
      if (destination.indexOf('index.html') != -1) {
        moveElement('preview', 0, 0, 5);
      }
      if (destination.indexOf('about.html') != -1) {
        moveElement('preview', -150, 0, 5);
      }
      if (destination.indexOf('photos.html') != -1) {
        moveElement('preview', -300, 0, 5);
      }
      if (destination.indexOf('live.html') != -1) {
        moveElement('preview', -450, 0, 5);
      }
      if (destination.indexOf('contact.html') != -1) {
        moveElement('preview', -600, 0, 5);
      }
    };
  }
}

addLoadEvent(prepareSlideshow);
