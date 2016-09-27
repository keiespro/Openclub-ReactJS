/**
 * OpenClub (https://www.openclub.com.au/)
 *
 * Copyright © 2016 OpenClub Holdings, PTY LTD. All Rights Reserved.
 *
 * This source code is proprietary software belonging to OpenClub Holdings PTY LTD
 * and is licensed for use by OpenClub PTY LTD.
 */

export function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent(`on${event}`, listener);
  }
}

export function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent(`on${event}`, listener);
  }
}

export function windowScrollX() {
  return (window.pageXOffset !== undefined) ? window.pageXOffset :
    (document.documentElement || document.body.parentNode || document.body).scrollLeft;
}

export function windowScrollY() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset :
    (document.documentElement || document.body.parentNode || document.body).scrollTop;
}
