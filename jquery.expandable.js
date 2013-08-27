;(function($){

  var defaults = {
    animation: false,
    anim_duration: 300,
    afterContract: function(){},
    afterExpand: function(){}
  };

  var Expandable = function( element, readmore, readless, settings ){

    var self = this;

    self.el = element
    self.config =  $.extend( {}, defaults, settings );
    self.orig_height = self.el.height();
    self.read_more = $(readmore).hide();
    self.read_less = $(readless).hide();

    // Checking if element has vertical overflow
    if( self.el[0].offsetHeight < self.el[0].scrollHeight ){
      self.read_more.show();
      self.init()
    };

  };

  Expandable.prototype = {

    init: function(){

      var self = this;

      this.read_more.on('click', function(){
        self.expand.call(self, self.config.afterExpand );
        self.toggleButtons.call(self);
        return false;
      });

      this.read_less.on('click', function(){
        self.contract.call(self, self.config.afterContract );
        self.toggleButtons.call(self);
        return false;
      });

    },
    expand: function(callback){
      var el = this.el;
      var full_height = this.fullHeight.call(this);
      var dur = this.config.anim_duration;
      switch ( this.animationType.call(this) ) {
        case false:
          el.css({ height: full_height });
          break;
        case 'slide':
          el.animate({ height: full_height }, dur );
          break;
        case 'fade':
          el.fadeOut(dur, function(){
            el.css({ height: full_height
             });
            el.fadeIn(dur);
          });
          break;
      }
      callback.call(el);
    },
    contract: function(callback){
      var el = this.el;
      var dur = this.config.anim_duration;
      var orig_height = this.origHeight.call(this);
      switch ( this.animationType.call(this) ) {
        case false:
          el.css({ height: orig_height });
          break;
        case 'slide':
          el.animate({ height: orig_height }, dur );
          break;
        case 'fade':
          el.fadeOut(dur, function(){
            el.css({ height: orig_height });
            el.fadeIn(dur);
          });
          break;
      }
      callback.call(el);
    },
    animationType: function(){
      return this.config.animation;
    },
    toggleButtons: function(){
      this.read_less.toggle();
      this.read_more.toggle();
    },
    origHeight: function(){
      return this.orig_height;
    },
    fullHeight: function(){
      return this.el[0].scrollHeight;
    }

  }


  $.fn.expandable = function( readmore, readless, settings ) {

    new Expandable( this, readmore, readless, settings );

    return this;

  }


}(jQuery));

