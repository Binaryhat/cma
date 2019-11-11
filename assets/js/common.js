    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();  

  $('.toggle-footer').click(function() {
    $('.main-footer').slideToggle("slow");
    // Alternative animation for example
    // slideToggle("fast");
    
  });

 



});

function startTour() {
// Instance the tour
var tour = new Tour({
  steps: [
  {
  element: "#tour1",
  title: "Menubar",
  content: "Here You can see other page navigation"
  },
  {
  element: "#tour2",
  title: "News And Events",
  content: "Here you can see all news and events by swuitching tabs."
  }
  ],
  storage:false
  });

  // Initialize the tour
  tour.init();

  // Start the tour
  tour.start();
}
        
$("#tweeterpopperid").popover({
  html: true, 
content: function() {
        return $('#popover-content').html();
      },
      trigger: 'focus'
});


  $("#sharepopperid").popover({
  html: true, 
content: function() {
        return $('#popover-share').html();
      },
     trigger: 'focus'
});


 
// Vue 3D circular 
//https://wlada.github.io/vue-carousel-3d/examples/
//https://github.com/Wlada/vue-carousel-3d
if( $('#sliderexample').length )         // use this if you are using id to check
{
  
  new Vue({
    el: '#sliderexample',
    data: {
      slides: 7
    },
    components: {
      'carousel-3d': Carousel3d.Carousel3d,
      'slide': Carousel3d.Slide
    }
  })
}
   
if( $('#sliderexample2').length )         // use this if you are using id to check
{
   
  new Vue({
    el: '#sliderexample2',
    data: {
      slides: 7
    },
    components: {
      'carousel-3d': Carousel3d.Carousel3d,
      'slide': Carousel3d.Slide
    }
  })
}
if( $('#aboutslider').length )         // use this if you are using id to check
{
new Vue({
  el: '#aboutslider',
  data: {
    slides: 7
  },
  components: {
    'carousel-3d': Carousel3d.Carousel3d,
    'slide': Carousel3d.Slide
  }
})
}



// active navbar

$('.navbar-nav .nav-item .nav-link').click(function(){
  $('.navbar-nav .nav-item .nav-link').removeClass('active-nav');
  $(this).addClass('active-nav');
})
  

// Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}



// Sticky navbar
// =========================
$(document).ready(function () {
  // Custom function which toggles between sticky class (is-sticky)
  var stickyToggle = function (sticky, stickyWrapper, scrollElement) {
      var stickyHeight = sticky.outerHeight();
      var stickyTop = stickyWrapper.offset().top;
      if (scrollElement.scrollTop() >= stickyTop) {
          stickyWrapper.height(stickyHeight);
          sticky.addClass("is-sticky");
      }
      else {
          sticky.removeClass("is-sticky");
          stickyWrapper.height('auto');
      }
  };

  // Find all data-toggle="sticky-onscroll" elements
  $('[data-toggle="sticky-onscroll"]').each(function () {
      var sticky = $(this);
      var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
      sticky.before(stickyWrapper);
      sticky.addClass('sticky');

      // Scroll & resize events
      $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
          stickyToggle(sticky, stickyWrapper, $(this));
      });

      // On page load
      stickyToggle(sticky, stickyWrapper, $(window));
  });
});



//popup
$(function(){
	$("#addClass").click(function (e) {
		e.preventDefault();
		$('#qnimate').addClass('popup-box-on');
	});          
	$("#removeClass").click(function () {
		$('#qnimate').removeClass('popup-box-on');
	});
});


 


//scroll position indicator
function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $('#menu-center a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position() && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('#menu-center ul li').removeClass("active");
          currLink.closest('li').addClass("active");
          if ($(".sticky-links ul li.first").hasClass('active')) {
              $(".sticky-links ul").addClass('white');
          } else {
              $(".sticky-links ul").removeClass('white');
          }
      }
      //else {
      //    currLink.closest('li').removeClass("active");
      //}

  });
}

$(window).on("scroll", onScroll);
try {

  // Wow init 
  var wow = new WOW(
                 {
                     boxClass: 'wow',      // default
                     animateClass: 'animated', // default
                     offset: 0,          // default
                     mobile: false,       // default
                     live: true        // default
                 }
               )
  wow.init();
} catch (err) {
  console.log(err);
}
//smoothscroll
$('#menu-center a[href^="#"]').on('click', function (e) {
  e.preventDefault();
  $(document).off("scroll");
  var parent = $(this).closest('li');
  $('a').each(function () {
      $(this).closest('li').removeClass('active');
  })
  parent.addClass('active');
  if ($(".sticky-links ul li.first").hasClass('active')) {
      $(".sticky-links ul").addClass('white');
  } else {
      $(".sticky-links ul").removeClass('white');
  }
  var target = this.hash,
      menu = target;
  $target = $(target);
  $('html, body').stop().animate({
      'scrollTop': $target.offset().top
  }, 500, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
  });
});


//read more button
$('.open-bio').click(function(e) {
  e.preventDefault();
  var id = $(this).attr('href');

  if ($(id).is(":visible")) {
      $(this).text("Read More");
  } else {
      $(this).text("Read Less");
  }

  $(id).slideToggle(250);
});


//accordian
$(document).ready(function () {
  $('#accordion')
      .on('shown.bs.collapse', function() {
          $(this)
          .parent()
              .find(".fa-plus")
              .removeClass("fa-plus")
              .addClass("fa-chevron-down");
             
      })
      .on('hidden.bs.collapse', function() {
          $(this)
          .parent()
              .find(".fa-chevron-down")
              .removeClass("fa-chevron-down")
              .addClass("fa-plus");
      });
});


// $(document).ready(function () {
//   $('#heading2')
//       .on('hidden.bs.collapse', function() {
//           $(this)
//           .parent()
//               .find(".fa-chevron-up")
//               .removeClass("fa-chevron-up")
//               .addClass("fa-chevron-right");
             
//       })
//       .on('shown.bs.collapse', function() {
//           $(this)
//           .parent()
//               .find(".fa-chevron-right")
//               .removeClass("fa-chevron-right")
//               .addClass("fa-chevron-up");
//       });
// });



$(document).ready(function(){
  $('#lightgallery').lightGallery({
    thumbnail:true,
animateThumb: false,
showThumbByDefault: false
  });
});

$(document).ready(function(){
  $('#videogallery').lightGallery({
    thumbnail:true,
animateThumb: false,
showThumbByDefault: false
  });
});

//loader js
setTimeout(function() {    
  fullyLoaded();
  }, 1000);
  function fullyLoaded() {
  $(".logo-loader").fadeOut("slow");
  
} 

function fullyLoaded() {
   
  $("#preloader").fadeOut("slow");
}


