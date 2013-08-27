;(function($){



  $.fn.readMore = function( readmore, readless, settings ) {

    var self,
      read_more,
      read_less,
      options,
      defaults,
      orig_height;

    self = this;

    options = settings ? settings : {} ;

    defaults = {
      animation: false,
      afterContract: function(){},
      afterExpand: function(){}
    };

    for ( def in defaults ) {
      if ( options[def] === undefined ) {
        options[def] = defaults[def];
      }
    }

    orig_height = self.height();

    read_more = $(document.getElementById(readmore));
    read_less = $(document.getElementById(readless));

    read_more.hide();
    read_less.hide();


    // Checking if element has vertical overflow
    if( self[0].offsetHeight < self[0].scrollHeight ){
      read_more.show();
    };

    read_more.on('click', function(){
      expand.call(this, options.afterExpand );
      toggleButtons();
      return false;
    });

    read_less.on('click', function(){
      contract.call(this, options.afterContract );
      toggleButtons();
      return false;
    });

    var expand = function(callback){
      var full_height = fullHeight();
      switch ( animationType() ) {
        case false:
          self.addClass('full-height');
          break;
        case 'slide':
          self.animate({ height: full_height });
          break;
        case 'fade':
          self.fadeOut('fast', function(){
            self.css({ height: full_height
             });
            self.fadeIn('fast');
          });
          break;
      }
      callback.call(self);
    }

    var contract = function(callback){
      switch ( animationType() ) {
        case false:
          self.removeClass('full-height');
          break;
        case 'slide':
          self.animate({ height: origHeight() });
          break;
        case 'fade':
          self.fadeOut('fast', function(){
            self.css({ height: origHeight() });
            self.fadeIn('fast');
          });
          break;
      }
      callback.call(self);
    }

    var toggleButtons = function(){
      read_less.toggle();
      read_more.toggle();
    }

    var animationType = function(){
      return options.animation;
    }

    var origHeight = function(){
      return orig_height;
    }

    var fullHeight = function(){
      return self[0].scrollHeight;
    }

  }


}(jQuery));

