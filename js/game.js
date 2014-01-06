(function(window) {
  'use strict';
  /*****************************************************************************
   *                                                                           *
   *                                                                           *
   *                                                                           *
   *                                    Game                                   *
   *                                                                           *
   *                                                                           *
   *                                                                           *
   *                                                                           *
   ****************************************************************************/
  require(['lib/domReady'], function(domReady) {
    domReady(function() {
      require(['lib/atom', 'game/board', 'game/snake'],
          function(atom, board, snake) {
            var GAME_SPEED = 350,
                gameInterval,
                isIntersect, isGameOver, start, init, createFood, food;
            /**
             *
             * @param {Array} vboard
             *
             * @return {*}
             */
            isIntersect = function(vboard) {
              var head = snake.head(), nHead = snake.getNextHead();
              if (typeof vboard[head.y] === 'undefined') {
                return true;
              }

              if (typeof vboard[head.y][head.x] === 'undefined') {
                return true;
              }

              if (nHead.y === food.y && nHead.x === food.x) {
                snake.eat();
                createFood();
                return false;
              }

              return snake.isEatenTail();
            };


            /**
             *
             * @return {boolean}
             */
            isGameOver = function() {
              var e;
              e = isIntersect(board.matrix);
              if (e && e !== 'f') {
                snake.stop();
                board.reset(snake.reset.bind(snake, function() {
                  start();
                  createFood();
                }));
                return true;
              }

              return false;
            };


            /**
             *
             */
            start = function() {
              gameInterval = window.setInterval(function() {
                if (isGameOver()) {
                  window.clearInterval(gameInterval);
                  gameInterval = 0;
                } else {
                  if (!board.matrix[food.y][food.x]) {
                    snake.eat();
                    createFood();
                  }
                  board.show();
                }
              }, GAME_SPEED);
            };


            /**
             *
             */
            init = function() {
              board.init();
              snake.init();
              createFood();
              atom.Keyboard().events.add({
                'adown': function() {
                  snake.turnDown();
                },
                'aright': function() {
                  snake.turnRight();
                },
                'aleft': function() {
                  snake.turnLeft();
                },
                'aup': function() {
                  snake.turnUp();
                },
                'space': function() {
                  snake.turnRight();
                }
              });
            };


            /**
             *
             */
            createFood = function() {
              var x, y;
              x = atom.number.random(0, board.width - 1);
              y = atom.number.random(0, board.height - 1);
              food = {x: x, y: y};
              board.matrix[y][x] = 'f';
            };


            init();
            start();
          }
      );
    });
  });
})(window);

