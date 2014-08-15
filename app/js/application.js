(function() {
  var footerNav, formSubscribe, googleMap, loadApplication, mobileNav, mobileScripts, ourWorks, scrollToTop, svgInjector, testimonialsSwiper;

  loadApplication = function() {
    var styles;
    styles = ["display: block", "background: #f7cd81", "color: white", "padding: 20px 20px 20px 20px", "text-align: center", "font-weight: normal", "font-size: 20px", "line-height: 60px"].join(';');
    console.log('%c Hydrogen!', styles, 'Has loaded.');
    $(svgInjector);
    $(mobileScripts);
    $(mobileNav);
    $(footerNav);
    $(testimonialsSwiper);
    $(formSubscribe);
    $(googleMap);
    $(scrollToTop);
    $(window).load(function() {
      return $(ourWorks);
    });
    return $('a[href*=#]:not([href=#])').on('click', function(e) {
      var target;
      e.preventDefault();
      if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        target = $(this.hash);
        target = (target.length ? target : $('[name=' + this.hash.slice(1) + ']'));
        if (target.length) {
          return $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
        }
      }
    });
  };

  svgInjector = function() {
    var mySVGsToInject;
    mySVGsToInject = document.querySelectorAll('img.inject-me');
    return SVGInjector(mySVGsToInject);
  };

  mobileScripts = function() {
    if (Modernizr.touch) {
      return FastClick.attach(document.body);
    }
  };

  footerNav = function() {
    var footerNavContainer, footerNavTrigger, offset;
    offset = $('.header').height();
    footerNavContainer = $('.footer-nav');
    footerNavTrigger = $('.navTrigger');
    window.addEventListener('scroll', function() {
      if ($(window).scrollTop() > offset) {
        return $('.navTrigger').addClass('is-fixed');
      } else {
        footerNavTrigger.removeClass('is-fixed');
        footerNavContainer.removeClass('is-visible');
        return footerNavTrigger.removeClass('menu-is-open');
      }
    });
    return footerNavTrigger.on('click', function() {
      $(this).toggleClass('menu-is-open');
      return footerNavContainer.toggleClass('is-visible');
    });
  };

  scrollToTop = function() {
    var $back_to_top, offset, offset_opacity, scroll_top_duration;
    offset = $('.header').height();
    offset_opacity = 1200;
    scroll_top_duration = 700;
    $back_to_top = $('#toTop');
    window.addEventListener('scroll', function() {
      if ($(this).scrollTop() > offset) {
        $back_to_top.addClass("is-visible");
      } else {
        $back_to_top.removeClass("is-visible fade-out");
      }
      if ($(this).scrollTop() > offset_opacity) {
        return $back_to_top.addClass("fade-out");
      }
    });
    return $back_to_top.on("click", function(event) {
      event.preventDefault();
      return $("body,html").animate({
        scrollTop: 0
      }, scroll_top_duration);
    });
  };

  mobileNav = function() {
    var mobileView, navigation, trigger;
    trigger = $('.menu-arrow');
    navigation = $('.primary-nav');
    trigger.on('click', function() {
      navigation.slideToggle();
      navigation.toggleClass('open');
      $(this).toggleClass('open');
      return localStorage.setItem('menu', navigation.hasClass('open'));
    });
    mobileView = 767;
    return window.addEventListener('resize', function() {
      var flexWidth, menuLs;
      menuLs = localStorage.getItem('menu');
      flexWidth = window.innerWidth;
      if (flexWidth >= mobileView) {
        if (menuLs === 'false') {
          navigation.slideDown();
          navigation.removeClass('open');
          return trigger.removeClass('open');
        } else {

        }
      } else {
        if (menuLs === 'false') {
          return navigation.hide();
        }
      }
    });
  };

  ourWorks = function() {
    var filterContainer, worksContainer, worksItem;
    worksContainer = $('#worksContainer');
    filterContainer = $('#worksFilters');
    worksItem = $('#worksContainer .item');
    worksContainer.isotope({
      itemSelector: '.item',
      filter: '*',
      animationEngine: 'best-available',
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });
    filterContainer.on('click', 'button', function() {
      var filterValue;
      filterValue = $(this).attr('data-filter');
      return worksContainer.isotope({
        filter: filterValue
      });
    });
    $('.button-group').each(function(i, buttonGroup) {
      buttonGroup = $(buttonGroup);
      return buttonGroup.on('click', 'button', function() {
        buttonGroup.find('.is-checked').removeClass('is-checked');
        return $(this).addClass('is-checked');
      });
    });
    return worksItem.on('click', function() {
      var url;
      url = $(this).data('url');
      return window.open(url, '_blank');
    });
  };

  testimonialsSwiper = function() {
    var mySwiper;
    return mySwiper = $('.testimonials-swiper').swiper({
      mode: 'horizontal',
      loop: true,
      calculateHeight: true,
      pagination: '.testimonials-pager',
      paginationClickable: true
    });
  };

  formSubscribe = function() {
    var form, formMessages, hasHtml5Validation;
    form = $('#subscribe');
    formMessages = $('.form-result');
    hasHtml5Validation = function() {
      return typeof document.createElement("input").checkValidity === "function";
    };
    if (hasHtml5Validation()) {
      return form.submit(function(e) {
        var formData;
        if (!this.checkValidity()) {
          e.preventDefault();
          $(this).addClass("invalid");
          return $("#status").html("invalid");
        } else {
          $(this).removeClass("invalid");
          e.preventDefault();
          formData = $(form).serialize();
          return $.ajax({
            type: "POST",
            url: $(form).attr("action"),
            data: formData
          }).done(function(response) {
            if (response === "success") {
              $('.hide-me').fadeOut();
              $(formMessages).removeClass("error");
              $(formMessages).addClass("success");
              $(formMessages).text('Thanks for contacting us!');
              $("#name").val("");
              $("#number").val("");
              return $('html,body').animate({
                scrollTop: $('.contact-form').offset().top - 70
              });
            } else {
              $(formMessages).removeClass("success");
              $(formMessages).addClass("error");
              return $(formMessages).text("Oops! An error occured please check all the fields.");
            }
          }).fail(function(data) {
            return $(formMessages).text("Oops! An error occured please check all the fields.");
          });
        }
      });
    }
  };

  googleMap = function() {
    var map, mapElement, mapOptions, marker, myLatlng;
    myLatlng = new google.maps.LatLng(45.3558359, -122.599946);
    mapOptions = {
      zoom: 16,
      panControl: false,
      mapTypeControl: false,
      center: myLatlng,
      styles: [
        {
          featureType: "administrative",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }, {
              saturation: -100
            }, {
              lightness: 20
            }
          ]
        }, {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }, {
              saturation: -100
            }, {
              lightness: 40
            }
          ]
        }, {
          featureType: "water",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }, {
              saturation: -10
            }, {
              lightness: 30
            }
          ]
        }, {
          featureType: "landscape.man_made",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified"
            }, {
              saturation: -60
            }, {
              lightness: 10
            }
          ]
        }, {
          featureType: "landscape.natural",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified"
            }, {
              saturation: -60
            }, {
              lightness: 60
            }
          ]
        }, {
          featureType: "poi",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }, {
              saturation: -100
            }, {
              lightness: 60
            }
          ]
        }, {
          featureType: "transit",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }, {
              saturation: -100
            }, {
              lightness: 60
            }
          ]
        }
      ]
    };
    mapElement = document.getElementById("map");
    map = new google.maps.Map(mapElement, mapOptions);
    return marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: 'images/map-marker.png'
    });
  };

  $(loadApplication);

}).call(this);
