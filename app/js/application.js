(function() {
  var loadApplication, mobileNav, mobileScripts, ourWorks, svgInjector;

  loadApplication = function() {
    var styles;
    styles = ["display: block", "background: #f7cd81", "color: white", "padding: 20px 20px 20px 20px", "text-align: center", "font-weight: normal", "font-size: 20px", "line-height: 60px"].join(';');
    console.log('%c Hydrogen!', styles, 'Has loaded.');
    $(svgInjector);
    $(mobileScripts);
    $(mobileNav);
    return $(ourWorks);
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
    var $container;
    $container = $('#worksContainer');
    return $container.isotope({
      itemSelector: ".item",
      masonry: {
        columnWidth: ".grid-sizer"
      }
    });
  };

  $(loadApplication);

}).call(this);
