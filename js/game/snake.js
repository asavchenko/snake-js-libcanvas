(function(window) {
  'use strict';
  /*****************************************************************************
   *                                                                           *
   *                                                                           *
   *                                                                           *
   *                                  Snake                                    *
   *                                                                           *
   *                                                                           *
   *                                                                           *
   *                                                                           *
   ****************************************************************************/
  define(['game/board'], function(board) {
    var init, reset, turnLeft, turnRight, turnDown, turnUp,
        show, hide, head, tail, length, stop, eat, reverse, move,
        isCanReverse, getNextHead, isEatenTail;
    /**
     *
     */
    init = function(callback, options) {
      var START_POINT = {
        x: parseInt(board.width / 2),
        y: parseInt(board.height / 2)
      }, i, l;
      options = options || {};
      l = options.length || 3;
      this.body = [];
      for (i = 0; i < l; i += 1) {
        this.body.push({x: START_POINT.x, y: START_POINT.y + i});
      }
      this.show();
      this.direction = 90;
      if (typeof callback === 'function') {
        callback();
      }
    };


    /**
     *
     */
    move = function() {
      var i = this.body.length, head = this.getNextHead();
      this.prevTail = this.tail();
      while (i--) {
        this.body[i] = this.body[i - 1];
      }
      this.body[0] = head;
    };


    /**
     *
     * @return {*}
     */
    getNextHead = function() {
      var head = this.head();
      switch (this.direction) {
        case 0:
          return {x: head.x + 1, y: head.y};
        case 90:
          return {x: head.x, y: head.y - 1};
        case 180:
          return {x: head.x - 1, y: head.y};
        case 270:
          return {x: head.x, y: head.y + 1};
      }
    };


    /**
     *
     */
    reset = function(callback, options) {
      this.init(callback, options);
    };


    /**
     *
     */
    stop = function() {
      window.clearInterval(this.moveInterval);
      this.moveInterval = null;
    };

    /**
     *
     */
    show = function(value) {
      var i, x, y;
      i = this.body.length;
      value = value === 0 ? 0 : 1;
      while (i--) {
        x = this.body[i].x;
        y = this.body[i].y;
        if (typeof board.matrix[y] === 'undefined') {
          continue;
        }
        if (typeof board.matrix[y][x] === 'undefined') {
          continue;
        }
        board.matrix[y][x] = value;
      }
    };


    /**
     *
     */
    hide = function() {
      this.show(0);
    };


    /**
     *
     */
    eat = function() {
      this.body.push(this.tail());
    };


    /**
     *
     */
    isCanReverse = function(direction) {
      var h, n;
      h = this.head();
      n = this.body[1];
      switch (this.direction) {
        case 0:
          return direction === 180 && n.x === h.x - 1 && n.y === h.y;
        case 90:
          return direction === 270 && n.x === h.x && n.y === h.y + 1;
        case 180:
          return direction === 0 && n.x === h.x + 1 && n.y === h.y;
        case 270:
          return direction === 90 && n.x === h.x && n.y === h.y - 1;
      }
    };


    /**
     *
     */
    reverse = function() {
      this.body.reverse();
    };


    /**
     *
     */
    turnLeft = function() {
      if (this.direction === 180) {
        return;
      }
      if (this.isCanReverse(180)) {
        this.reverse();
      }
      this.direction = 180;
    };


    /**
     *
     */
    turnRight = function() {
      if (this.direction === 0) {
        return;
      }
      if (this.isCanReverse(0)) {
        this.reverse();
      }
      this.direction = 0;
    };


    /**
     *
     */
    turnDown = function() {
      if (this.direction === 270) {
        return;
      }
      if (this.isCanReverse(270)) {
        this.reverse();
      }
      this.direction = 270;
    };


    /**
     *
     */
    turnUp = function() {
      if (this.direction === 90) {
        return;
      }
      if (this.isCanReverse(90)) {
        this.reverse();
      }
      this.direction = 90;
    };


    /**
     *
     * @return {*}
     */
    head = function() {
      return this.body[0];
    };


    /**
     *
     * @return {*}
     */
    head.toString = head;


    /**
     *
     * @return {*}
     */
    tail = function() {
      return this.body[this.body.length - 1];
    };


    /**
     *
     */
    tail.toString = tail;


    /**
     * return {boolean}
     */
    isEatenTail = function() {
      var i;
      head = this.head();
      for (i = 2; i < this.body.length - 1; i += 1) {
        if (this.body[i].x === head.x && this.body[i].y === head.y) {
          return true;
        }
      }

      return false;
    };

    /**
     *
     * @return {Number}
     */
    length = function() {
      return this.body.length;
    };


    /**
     *
     * @type {length}
     */
    length.toString = length;


    return {
      init: init,
      reset: reset,
      stop: stop,
      turnLeft: turnLeft,
      turnRight: turnRight,
      turnUp: turnUp,
      turnDown: turnDown,
      show: show,
      hide: hide,
      head: head,
      tail: tail,
      getPrevTail: function() {
        return this.prevTail;
      },
      eat: eat,
      length: length,
      reverse: reverse,
      move: move,
      isCanReverse: isCanReverse,
      getNextHead: getNextHead,
      isEatenTail: isEatenTail
    };
  });
})(window);
