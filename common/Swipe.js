function Swipe(container) {
  let element = container.find(":first");

  let swipe = {};

  swipe.scrollTo = function (x, speed) {
    element.css({
      'transition-timing-function' : 'linear',
      'transition-duration'        : speed + 'ms',
      'transform'                  : 'translate3d(-' + x * 1 / 3 + 'px,0px,0px)'
    });
    return this;
  }

  return swipe;
}
