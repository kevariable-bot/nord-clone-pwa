const main = () => {
  const loadedNav = () => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const content = document.querySelector('#body-content');
        if (this.status != 200) return;

        document.querySelectorAll('.topnav, .sidenav').forEach(el => {
          el.innerHTML = xhttp.responseText;
        });

        document.querySelectorAll('.sidenav a, .topnav a').forEach(e => {
          e.addEventListener('click', function (event) {
            // Closed nav
            const sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            loadedPage(event.target.getAttribute('href').substr(1));
          });
        });
      }
    };

    xhttp.open('GET', 'components/nav.html', true);
    xhttp.send();
  };

  const loadedPage = page => {
    if (page === '') page = 'home';
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const content = document.querySelector('#body-content');
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          if (page === 'home') loadHome();
        } else if (this.status == 404) {
          content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
        } else {
          content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
        }
      }
    };

    xhttp.open('GET', `pages/${page}.html`, true);
    xhttp.send();
  };

  loadedPage(window.location.hash.substr(1));

  const loadHome = () => {
    const slider = document.querySelectorAll('.slider');
    M.Slider.init(slider, {
      indicators: false,
    });
  };

  return loadedNav();
};

export default main;
