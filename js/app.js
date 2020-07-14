import '../js/sw-checking.js';
import main from '../js/main.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);
  main();
});
