(function() {
  var loadApplication, mobileNav, mobileScripts;

  loadApplication = function() {
    var styles;
    styles = ["display: block", "background: #f7cd81", "color: white", "padding: 20px 20px 20px 20px", "text-align: center", "font-weight: normal", "font-size: 20px", "line-height: 60px"].join(';');
    console.log('%c Hydrogen!', styles, 'Has loaded.');
    $(mobileScripts);
    return $(mobileNav);
  };

  mobileScripts = function() {
    if (Modernizr.touch) {
      return FastClick.attach(document.body);
    }
  };

  mobileNav = function() {
    var navigation, trigger;
    trigger = $('.bouncing-arrow');
    navigation = $('.primary-nav');
    return trigger.on('click', function() {
      navigation.slideToggle();
      navigation.toggleClass('open');
      return $(this).toggleClass('open');
    });
  };

  $(loadApplication);

}).call(this);
