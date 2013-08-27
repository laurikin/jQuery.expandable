;(function($){

    var defaults = {
      animation: false,
      anim_duration: 300,
      afterContract: function(){},
      afterExpand: function(){}
    };


  $.fn.expandable = function( readmore, readless, settings ) {

    var self,
      read_more,
      read_less,
      config,
      defaults,
      orig_height;

    self = this;

    config =  $.extend( {}, defaults, settings );

    orig_height = self.height();

    read_more = $(readmore);
    read_less = $(readless);

    read_more.hide();
    read_less.hide();


    // Checking if element has vertical overflow
    if( self[0].offsetHeight < self[0].scrollHeight ){
      read_more.show();
    };

    read_more.on('click', function(){
      expand.call(this, config.afterExpand );
      toggleButtons();
      return false;
    });

    read_less.on('click', function(){
      contract.call(this, config.afterContract );
      toggleButtons();
      return false;
    });

    var expand = function(callback){
      var full_height = fullHeight();
      var dur = config.anim_duration;
      switch ( animationType() ) {
        case false:
          self.css({ height: full_height });
          break;
        case 'slide':
          self.animate({ height: full_height }, dur );
          break;
        case 'fade':
          self.fadeOut(dur, function(){
            self.css({ height: full_height
             });
            self.fadeIn(dur);
          });
          break;
      }
      callback.call(self);
    }

    var contract = function(callback){
      var dur = config.anim_duration;
      switch ( animationType() ) {
        case false:
          self.css({ height: origHeight() });
          break;
        case 'slide':
          self.animate({ height: origHeight() }, dur );
          break;
        case 'fade':
          self.fadeOut(dur, function(){
            self.css({ height: origHeight() });
            self.fadeIn(dur);
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
      return config.animation;
    }

    var origHeight = function(){
      return orig_height;
    }

    var fullHeight = function(){
      return self[0].scrollHeight;
    }

    return self;

  }


}(jQuery));

