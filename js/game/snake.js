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
      this.body.unshift(this.getNextHead());
    };


    /**
     * @param {object} cell
     */
    isCanReverse = function(cell) {
      switch (this.direction) {
        case 0:
          return this.body[1].x === cell.x + 1 && this.body[1].y === cell.y;
        case 90:
          return this.body[1].x === cell.x && this.body[1].y === cell.y - 1;
        case 180:
          return this.body[1].x === cell.x - 1 && this.body[1].y === cell.y;
        case 270:
          return this.body[1].x === cell.x && this.body[1].y === cell.y + 1;
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
      this.direction = 180;
      if (this.isCanReverse(this.head())) {
        this.reverse();
      }
    };


    /**
     *
     */
    turnRight = function() {
      if (this.direction === 0) {
        return;
      }
      this.direction = 0;
      if (this.isCanReverse(this.head())) {
        this.reverse();
      }
    };


    /**
     *
     */
    turnDown = function() {
      if (this.direction === 270) {
        return;
      }
      this.direction = 270;
      if (this.isCanReverse(this.head())) {
        this.reverse();
      }
    };


    /**
     *
     */
    turnUp = function() {
      if (this.direction === 90) {
        return;
      }
      this.direction = 90;
      if (this.isCanReverse(this.head())) {
        this.reverse();
      }
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
