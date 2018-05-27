(function ($) {
  $(function() {

    // Parallax
    if($(window).width() > 1024) {
      if ($('body').hasClass('front') || $('body').hasClass('about-us')) {
        skrollr.init();
        // var s = skrollr.init({forceHeight: false});
      }
    }
    // End

    // PinchZoom effect
    // if ($('span').hasClass('pinch-zoom')){
    //   $(this).find('img').addClass('pinchzoom_img');
    // }

    // Grey striped
    var grey_inner_des = 11;
    var grey_inner_asc = 'desc' ;
    $('.striped-grey-des-asc .grey-des-asc').each(function() {
      if(grey_inner_asc == 'desc') {
        grey_inner_des = grey_inner_des - 1;
        if (grey_inner_des == 5) {
          grey_inner_des = 5;
          grey_inner_asc = 'asc' ;
        }
      }
      else {
        grey_inner_des = grey_inner_des + 1;
      }
      $(this).addClass('grey-bg-' + grey_inner_des*10);
    });
    // End

    // sticky Header 
    $(window).scroll(function() {
      var scrolled = $(window).scrollTop();
      if(scrolled >= 100) {
        $('body').addClass('sticky-header');
        $('.navbar').addClass('grey-dark-bg').removeClass('green-t-7');
      }
      else {
        $('body').removeClass('sticky-header');
        $('.navbar').removeClass('grey-dark-bg').addClass('green-t-7');
      }
    });


    // Custom input type file js 
    $('input[type="file"]').wrap('<div class="input-file"><div  class="input-file-sub"></div></div>');
    $('.input-file').prepend('<div class="file-name"><span class="select-file-text">File Selected: </span><span class="input-file-name">No File Choosen</span></div>');
    $('.input-file-sub input').change(function() {
      var filename = $(this).val();
      $(this).parent().parent().find(".file-name .input-file-name").text(filename);
      var target = event.target || event.srcElement;
      if (target.value.length == 0) {
        $(this).parent().parent().find(".file-name .input-file-name").text('No file chosen');
      }
    });

    $(document).on('click', '.career-form .form-managed-file .btn', function() {
      $('input[type="file"]').wrap('<div class="input-file"><div  class="input-file-sub"></div></div>');
      $('.input-file').prepend('<div class="file-name"><span class="select-file-text">File Selected: </span><span class="input-file-name">No File Choosen</span></div>');
      $('.input-file-sub input').change(function() {
        var filename = $(this).val();
        $(this).parent().parent().find(".file-name .input-file-name").text(filename);
        var target = event.target || event.srcElement;
        if (target.value.length == 0) {
          $(this).parent().parent().find(".file-name .input-file-name").text('No file chosen');
        }
      });
    });

    $(document ).ajaxComplete(function() {
      $('input[type="file"]').wrap('<div class="input-file"><div class="input-file-sub"></div></div>');
      $('.input-file').prepend('<div class="file-name"><span class="select-file-text">File Selected: </span><span class="input-file-name">No File Choosen</span></div>');
      $('.input-file-sub input').change(function() {
        var filename = $(this).val();
        $(this).parent().parent().find(".file-name .input-file-name").text(filename);
        var target = event.target || event.srcElement;
        if (target.value.length == 0) {
          $(this).parent().parent().find(".file-name .input-file-name").text('No file chosen');
        }
      });

      $(document).on('click', '.career-form .form-managed-file .btn', function() {
        $('input[type="file"]').wrap('<div class="input-file"><div  class="input-file-sub"></div></div>');
        $('.input-file').prepend('<div class="file-name"><span class="select-file-text">File Selected: </span><span class="input-file-name">No File Choosen</span></div>');
        $('.input-file-sub input').change(function() {
          var filename = $(this).val();
          $(this).parent().parent().find(".file-name .input-file-name").text(filename);
          var target = event.target || event.srcElement;
          if (target.value.length == 0) {
            $(this).parent().parent().find(".file-name .input-file-name").text('No file chosen');
          }
        });
      });
    });
    // End

    // Custom Checkbox Design
    $('input[type="checkbox"]').wrap('<div class="input-rc"></div>');
    $('.input-rc').append('<span class="input-rc-span"></span>');

    // Collapse (Board of Directors)
    $('.card-board:first-of-type').addClass('show-card');
    $('.card-board').on('click', 'h2', function() {
      $(this).next('.cards-wrap-main').slideToggle(400);
      $(this).parents('.card-board').siblings('.card-board').find('.cards-wrap-main').slideUp(400);
      $(this).parents('.card-board').toggleClass('show-card'); // Added 'show-card' class for set arrow icon
      if ($('.card-board').hasClass('show-card')) {
        $(this).parents().siblings('.card-board').removeClass('show-card');
      }
      setTimeout(function() {
        $('html, body').animate({
          scrollTop: ($(".show-card .title--large").offset().top) - 120
        }, 500);
      }, 450);
    });

    var pathname = window.location.pathname; // Returns path only
    var url_id = window.location.href; // Returns full URL
    var id_accordion = '#' + url_id.substring(url_id.lastIndexOf('#') + 1);
    var page_about = url_id.substring(url_id.lastIndexOf('/') + 1);
    if ($('body').hasClass('about-us')) {
      if (page_about == 'about-us') {
        // code
      }
      else {
        $('.card-board .cards-wrap-main').show();
        if ($(id_accordion).size() == 0) {
          // code...
        }
        else {
          $('.card-board').removeClass('show-card');
          $(id_accordion).parents('.card-board').addClass('show-card');
          setTimeout(function() {
            $('html, body').animate({
              scrollTop: ($(id_accordion).offset().top) - 100
            }, 100);
          }, 100);
        }
        $('.card-board .cards-wrap-main').hide();
        $('.card-board').each(function() {
          if ($(this).hasClass('show-card')) {
            $('.show-card .cards-wrap-main').show();
          }
        });
      }
    }
    // End

    // Set character limit in home parallax
    var parallax_body = $(".vertical-align-bottom .parallax-body .body").text();
    if(parallax_body.length > 430) {
      $('.vertical-align-bottom .parallax-body .body p:nth-child(2)').text(parallax_body.substring(0,430) + '...');
    }
    // End

    // Add wrapper for career section in contact us page 
    $('.careers-text, .equipment-list').wrapAll("<div class='careers-body green-bg'></div>");
    var title = $('.careers-text .pane-title').html();
    $('.careers-wrap').prepend("<div class='title--large career-title'>" + title + "</div>");
    $('.careers-text .pane-title').hide();

    // Remove classes of diamond shape in mobile device for product page
    productTitleTringalShape();
    $(window).resize(function() {
      productTitleTringalShape();
    });
    // End

    // Wrap class for investor login page
    $('.investor-login-banner, .investor-login-banner + #block-system-main').wrapAll('<div class="investor-login"></div>');
    // End

    // Wrap class for home page product section
    $('.home-product-wrap, .home-product-img-wrap').wrapAll('<div class="home-product-main-wrap  gradiant-overlay"></div>');
    // End

    // Banner image for career section
    var banner_bg_img = $('.career-bg img').attr('src');
    $('.contact-career').css('background-image', 'url(' + banner_bg_img + ')');
    // End

    // Banner image for investor login page
    var banner_bg_img = $('.investor-login-banner img').attr('src');
    $('.investor-login').css('background-image', 'url(' + banner_bg_img + ')');
    // End

    // Banner image for investor login page
    var banner_img = $('.home-product-img-wrap img').attr('src');
    $('.home-product-main-wrap').css('background-image', 'url(' + banner_img + ')');
    // End

    // No MD slider add class js
    var md_slider_div = $('.md-slide-wrap');
    $(window).load(function() {
      if($('body').find('div').hasClass('md-slide-wrap') || $('body').find('section').hasClass('investor-login-banner')) {
        // $('body').addClass('md-slider-page');
      }
      else {
        $('body').addClass('no-md-slider');
      }
    });
    // End

    // Get height
      
    if (jQuery(window).width() < 1024) {
      $(window).load(function() {
        var parallaxHeight = $('.about-parallax-content .pane-content').outerHeight();
        $('.about-parallax .parallax-effect').height(parallaxHeight + 100);
      });
      setTimeout(function() {
        var parallaxHeight = $('.about-parallax-content .pane-content').outerHeight();
        $('.about-parallax .parallax-effect').height(parallaxHeight + 100);
      }, 1000);
    }
    else if (jQuery(window).width() > 1024) {
      $(window).load(function() {
        var parallaxHeight = $('.about-parallax-content .pane-content').outerHeight();
        $('.about-parallax .parallax-effect').height(parallaxHeight);
      });
      setTimeout(function() {
        var parallaxHeight = $('.about-parallax-content .pane-content').outerHeight();
        $('.about-parallax .parallax-effect').height(parallaxHeight);
      }, 100);
    }

    $(window).resize(function() {
      if (jQuery(window).width() < 1024) {
        $('.about-parallax .parallax-effect').css('height', 'auto');
        var parallaxHeight = $('.about-parallax-content .pane-content').outerHeight();
        $('.about-parallax .parallax-effect').height(parallaxHeight + 100);
        setTimeout(function() {
          $('.about-parallax .parallax-effect').css('height', 'auto');
          var parallaxHeight = $('.about-parallax-content .pane-content').outerHeight();
          $('.about-parallax .parallax-effect').height(parallaxHeight + 100);
        }, 500);
      }
      else if (jQuery(window).width() > 1024  ) {
        $('.about-parallax .parallax-effect').css('height', 'auto');
        var parallaxHeight = $('.about-parallax-content .pane-content').outerHeight();
        $('.about-parallax .parallax-effect').height(parallaxHeight);
        setTimeout(function() {
          $('.about-parallax .parallax-effect').css('height', 'auto');
          var parallaxHeight = $('.about-parallax-content .pane-content').outerHeight();
          $('.about-parallax .parallax-effect').height(parallaxHeight);
        }, 500);
      }
    });

    // Remove mobile number click for desktop
    var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };
    if(isMobile.any()) {
       // alert("This is a Mobile Device");
    }
    else {
      // alert("This is a Desktop Device");
      jQuery(".footer a[href^='tel:'], .footer a[href^='fax:']").on("click", function(e) {
          e.preventDefault();
      });
    }

    //

  })
  function productTitleTringalShape() {
    if($(window).width() < 767) {
      $('.product-main-name > div').removeClass('shape');
    }
    else {
      $('.product-main-name > div').addClass('shape');
    }
  }
})(jQuery);

