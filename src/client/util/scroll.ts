const keys: { [key: number]: boolean } = {
  37: true, // Left
  38: true, // Up
  39: true, // Right
  40: true, // Down
};

const preventDefault = (e: Event) => {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
};

const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
};

export function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = (document as any).onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove = preventDefault; // mobile
  document.onkeydown = preventDefaultForScrollKeys;
}

export function enableScroll() {
  if (window.removeEventListener) {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
  }
  window.onmousewheel = (document as any).onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}
