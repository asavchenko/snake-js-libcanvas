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
      require(['lib/atom', 'game/board', 'game/snake', 'game/info'],
          function(atom, board, snake, info) {
            var GAME_SPEED = 500,
                gameInterval,
                isIntersect, isGameOver, start, init, createFood, food,
                level, speed, nextLevel, gameOver, score, scoreLevel;
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

              return snake.isEatenTail();
            };


            /**
             *
             * @return {boolean}
             */
            isGameOver = function() {
              return isIntersect(board.matrix);
            };


            /**
             *
             */
            gameOver = function() {
              speed = GAME_SPEED;
              level = 0;
              score = 0;
              window.clearInterval(gameInterval);
              gameInterval = 0;
              snake.stop();
              board.reset(snake.reset.bind(snake, function() {
                start();
                createFood();
              }));
            };


            /**
             *
             */
            start = function() {
              gameInterval = window.setInterval(function() {
                snake.hide();
                snake.move();
                if (isGameOver()) {
                  gameOver();
                } else {
                  if (scoreLevel > 1900) {
                    nextLevel();
                  }
                  snake.show();
                  if (board.matrix[food.y][food.x] !== 'f') {
                    snake.eat();
                    score += 100;
                    scoreLevel += 100;
                    createFood();
                    snake.show();
                  }
                  board.show();
                  info.update([
                    'score: ' + score,
                    'level: ' + level,
                    'speed: ' + (GAME_SPEED - speed)
                  ].join('\n'));
                }
              }, speed);
            };


            /**
             *
             */
            nextLevel = function() {
              var l, s;
              switch (level) {
                case 0:
                  s = GAME_SPEED - 100;
                  break;
                case 1:
                  s = GAME_SPEED - 150;
                  break;
                case 2:
                  l = 4;
                  s = GAME_SPEED - 200;
                  break;
                case 3:
                  l = 4;
                  s = GAME_SPEED - 250;
                  break;
                case 4:
                  l = 5;
                  s = GAME_SPEED - 300;
                  break;
                case 5:
                  l = 5;
                  s = GAME_SPEED - 350;
                  break;
                case 6:
                  l = 6;
                  s = GAME_SPEED - 400;
                  break;
                case 7:
                  l = 6;
                  s = GAME_SPEED - 430;
                  break;
                case 8:
                  l = 7;
                  s = GAME_SPEED - 440;
                  break;
                case 9:
                  l = 7;
                  s = GAME_SPEED - 470;
                  break;
                default:
                  gameOver();
              }
              level += 1;
              score += 1000;
              scoreLevel = 0;
              window.clearInterval(gameInterval);
              gameInterval = 0;
              snake.stop();
              board.reset(snake.reset.bind(snake, function() {
                start();
                createFood();
                speed = s;
              }, {length: l}));
            };


            /**
             *
             */
            init = function() {
              speed = GAME_SPEED;
              level = 0;
              score = 0;
              scoreLevel = 0;
              board.init();
              info.init();
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

