function showSection(id) {
  const divs = document.getElementsByTagName('div');
  for (let i = 0; i < divs.length; i++) {
    if (divs[i].className.indexOf('section') == -1) continue;
    if (divs[i].getAttribute('id') != id) {
      divs[i].style.display = 'none';
    } else {
      divs[i].style.display = 'block';
    }
  }
}

function prepareInternalnav() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('internalnav')) return false;
  const nav = document.getElementById('internalnav');
  const links = nav.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    const sectionId = links[i].getAttribute('href').split('#')[1];
    if (!document.getElementById(sectionId)) continue;
    document.getElementById(sectionId).style.display = 'none';
    links[i].destination = sectionId;
    links[i].onclick = function () {
      showSection(this.destination);
      return false;
    };
  }
}

addLoadEvent(prepareInternalnav);
