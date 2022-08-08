/*
Use a window's inner dimensions for viewport units.
This fixes
*/

var root = document.documentElement;
let vh = window.innerHeight * 0.01;
root.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      root.style.setProperty('--vh', `${vh}px`);
});