// @flow
import { FLOATING_PLAYER_CLASS, ORIENTATION } from './view';

function getRootEl() {
  return document && document.documentElement;
}

export function getScreenWidth() {
  const rootEl = getRootEl();
  return rootEl ? rootEl.clientWidth : window.innerWidth;
}

export function getScreenHeight() {
  const rootEl = getRootEl();
  return rootEl ? rootEl.clientHeight : window.innerHeight;
}

export function getFloatingPlayerRect() {
  const elem = document.querySelector(`.${FLOATING_PLAYER_CLASS}`);
  return elem ? elem.getBoundingClientRect() : null;
}

export function clampFloatingPlayerToScreen(x: number, y: number) {
  const playerRect = getFloatingPlayerRect();

  let newX = x;
  let newY = y;

  if (playerRect) {
    const screenW = getScreenWidth();
    const screenH = getScreenHeight();

    if (x + playerRect.width > screenW) {
      newX = screenW - playerRect.width;
    } else if (x < 0) {
      newX = 0;
    }

    if (y + playerRect.height > screenH) {
      newY = screenH - playerRect.height;
    } else if (y < 0) {
      newY = 0;
    }
  }

  return { x: newX, y: newY };
}

export function calculateRelativePos(x: number, y: number) {
  return {
    x: x / getScreenWidth(),
    y: y / getScreenHeight(),
  };
}

function getClosest(num: number, arr: Array<number>) {
  let curr = arr[0];
  let diff = Math.abs(num - curr);
  for (let val = 0; val < arr.length; val++) {
    const newdiff = Math.abs(num - arr[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
    }
  }
  return curr;
}

export function getAspectRatio(width: number, height: number) {
  const ratioFloatsArray = [1.77, 1.6, 1.5, 1.33, 1, 0.75, 0.66, 0.625, 0.56];

  const currentRatioFloat = width / height;
  const matchedRatioFloat = parseFloat(getClosest(currentRatioFloat, ratioFloatsArray));

  if (matchedRatioFloat === 1) {
    return ORIENTATION.square;
  } else if (matchedRatioFloat < 1) {
    return ORIENTATION.landscape;
  } else {
    return ORIENTATION.portrait;
  }
}
