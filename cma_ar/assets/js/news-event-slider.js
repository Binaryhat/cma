$(document).ready(function(){	
  		
  $('.newsslider').on('init', function(event, slick){
    $('.animated').addClass('activate fadeInUp');
   
  });		

  $('.newsslider').slick({
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    mobileFirst:false,
    arrows:false,
    dots: true,
    responsive: [
    {
      breakpoint: 7680,//8k resolutions
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 3840,//4k resolutions
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1920,//FHD resolution
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1200,//HD resolutions
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 720,//All Tab and mobile resolution
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
 ]
  });			


});