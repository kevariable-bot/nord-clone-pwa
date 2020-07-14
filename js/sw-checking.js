if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(message => {
      console.log(message);
    });
  });
} else {
  console.log('your browser is not support');
}
