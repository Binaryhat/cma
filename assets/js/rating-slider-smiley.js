


/* ===================================================================
 * Mahesh - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
  
  
   /* rangeSlider
    * -------------------------------------------------- */
   var rangeSlider = function () {
    var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value,
      prevalue = $(".range-slider__range").attr('value'),
    smiley = $('#smiley_box');
  
    $(".range-slider__range").on('change', function () {
      value = $(this).val();
      console.log(value);
      console.log("pre-" + prevalue);
      if (value < 100) {
        smiley.css('background-image', 'url(assets/images/smiley/Smiley1.png)');
      }
      if (value > 100) {
        smiley.css('background-image', 'url(assets/images/smiley/Smiley2.png)');
      }
      if (value > 200) {
        smiley.css('background-image', 'url(assets/images/smiley/Smiley3.png)');
      }
      if (value > 300) {
        smiley.css('background-image', 'url(assets/images/smiley/Smiley4.png)');
      }
      if (value > 400) {
        smiley.css('background-image', 'url(assets/images/smiley/Smiley5.png)');
  
      }
      prevalue = value;
    });
  
    $('.minus').click(function () {
      // console.log("dfdsfdsfd" + value);
      if (prevalue <= 140) {
        $(".range-slider__range").val(40);
        $(".range-slider__range").trigger('change');
      } else {
        $(".range-slider__range").val(parseInt($(".range-slider__range").val()) - 110);
        $(".range-slider__range").trigger('change');
      }
  
  
    });
    $('.plus').click(function () {
      if (prevalue >= 360) {
        $(".range-slider__range").val(460);
        $(".range-slider__range").trigger('change');
      } else {
        $(".range-slider__range").val(parseInt($(".range-slider__range").val()) + 110);
        $(".range-slider__range").trigger('change');
      }
  
    });
  
    slider.each(function () {
  
      // value.each(function(){
      //   var value = $(this).prev().attr('value');
      //   $(this).html(value);
      // });
  
      range.on('input', function () {
        $(this).next(value).html(this.value);
        
        if (this.value < 40) {
          this.value = 40;      }
        if (this.value > 460) {
          this.value = 460;
        }
        if (value < 100) {
          smiley.css('background-image', 'url(assets/images/smiley/Smiley1.png)');
        }
        if (this.value > 100) {
          smiley.css('background-image', 'url(assets/images/smiley/Smiley2.png)');
        }
        if (this.value > 200) {
          smiley.css('background-image', 'url(assets/images/smiley/Smiley3.png)');
        }
        if (this.value > 300) {
          smiley.css('background-image', 'url(assets/images/smiley/Smiley4.png)');
        }
        if (this.value > 400) {
          smiley.css('background-image', 'url(assets/images/smiley/Smiley5.png)');
  
        }
      });
    });
  };
  
  
  
  
  
  
   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {
      rangeSlider();
  
  
    })();
    
  })(jQuery);
  
  
  
  
  
  
  