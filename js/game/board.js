(function() {
  'use strict';
  /*****************************************************************************
   *                                                                           *
   *                                                                           *
   *                                                                           *
   *                             Board                                         *
   *                                                                           *
   *                                                                           *
   *                                                                           *
   *                                                                           *
   ****************************************************************************/
  define(['lib/libcanvas', 'lib/atom'], function(LibCanvas, atom) {
    var BOARD_WIDTH,
        BOARD_HEIGHT,
        CELL_SIZE,
        FILL_BOARD_COLOR,
        STROKE_BOARD_COLOR,
        FILL_CELL_COLOR,
        STROKE_CELL_COLOR,
        init, show, reset,
        reset_,
        LC,
        canvas,
        context,
        FILL_CANVAS_COLOR;
    BOARD_WIDTH = 10;
    BOARD_HEIGHT = 22;
    CELL_SIZE = 16;
    FILL_BOARD_COLOR = '#212121';
    STROKE_BOARD_COLOR = '#313131';
    FILL_CELL_COLOR = '#505050';
    STROKE_CELL_COLOR = '#616161';
    LC = LibCanvas.extract({});
    canvas = atom.dom('canvas').first;
    context = canvas.getContext('2d-libcanvas');
    FILL_CANVAS_COLOR = '#000000';
    context.fill(
        new LC.RoundedRectangle(
        1, 1, CELL_SIZE * BOARD_WIDTH, CELL_SIZE * BOARD_HEIGHT),
        FILL_CANVAS_COLOR);
    atom.patching(window);
    /**
     * This function should be called only once
     */
    init = function() {
      var i, j;
      this.width = BOARD_WIDTH;
      this.height = BOARD_HEIGHT;
      this.cellSize = CELL_SIZE;
      this.canvas = canvas;
      this.data = [];
      this.matrix = [];
      this.background = FILL_BOARD_COLOR;
      this.color = FILL_CELL_COLOR;
      this.backgroundStroke = STROKE_BOARD_COLOR;
      this.colorStroke = STROKE_CELL_COLOR;
      for (i = 0; i < this.height; i += 1) {
        this.data[i] = [];
        this.matrix[i] = [];
        for (j = 0; j < this.width; j += 1) {
          this.data[i][j] = new LC.RoundedRectangle(
              j * this.cellSize + j,
              i * this.cellSize + i,
              this.cellSize,
              this.cellSize)
              .snapToPixel();
          this.matrix[i][j] = 0;
          context
            .fill(this.data[i][j], this.background)
            .stroke(this.data[i][j], this.backgroundStroke);
        }
      }
    };


    /**
     * reset phase 1
     */
    reset = function(callback) {
      var i, j;
      for (i = this.height - 1; i >= 0; i -= 1) {
        for (j = 0; j < this.width; j += 1) {
          window.setTimeout(function(i, j) {
            this.matrix[i][j] = 1;
            context.fill(this.data[i][j], this.color)
              .stroke(this.data[i][j], this.colorStroke);
            if (i === 0 && j === this.width - 1) {
              reset_.call(this, callback);
            }
          }.bind(this, i, j), 100 * (this.height - i + j + this.width));
        }
      }
    };


    /**
     * reset phase 2
     */
    reset_ = function(callback) {
      var i, j;
      for (i = 0; i < this.data.length; i += 1) {
        for (j = 0; j < this.data[i].length; j += 1) {
          window.setTimeout(function(ii, jj) {
            this.matrix[ii][jj] = 0;
            context.fill(this.data[ii][jj], this.background)
              .stroke(this.data[ii][jj], this.backgroundStroke);
            if (ii === this.height - 1 && jj === this.width - 1) {
              if (callback) {
                callback();
              }
            }
          }.bind(this, i, j), 100 * (i + j));
        }
      }
    };


    /**
     *
     */
    show = function() {
      var i, j, w, h;
      for (i = 0, h = this.data.length; i < h; i += 1) {
        for (j = 0, w = this.data[i].length; j < w; j += 1) {
          if (typeof this.matrix[i] === 'undefined') {
            continue;
          }
          if (typeof this.matrix[i][j] === 'undefined') {
            continue;
          }
          if (this.matrix[i][j]) {
            context.fill(this.data[i][j], this.color)
              .stroke(this.data[i][j], this.colorStroke);
          } else {
            context.fill(this.data[i][j], this.background)
              .stroke(this.data[i][j], this.backgroundStroke);
          }
        }
      }
    };

    return {
      init: init,
      show: show,
      reset: reset
    };
  });
})();
