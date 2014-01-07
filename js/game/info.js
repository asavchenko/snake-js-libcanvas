(function() {
  'use strict';
  /*****************************************************************************
   *                                                                           *
   *                                                                           *
   *                                                                           *
   *                             Info                                        *
   *                                                                           *
   *                                                                           *
   *                                                                           *
   *                                                                           *
   ****************************************************************************/
  define(['lib/libcanvas', 'game/board'], function(libcanvas, board) {
    return {
      init: function() {
        var helper, width = 150, height = 80;
        helper = new libcanvas.App.Light(new libcanvas.Size(width, height), {
          appendTo: 'div'
        });
        this.text = helper.createText(
            new libcanvas.Shapes.Rectangle(0, 0, width, height), {
              family: 'monospace', color: '#eda'
            });
      },
      update: function(msg) {
        this.text.content = msg;
      }
    };
  });
})();
