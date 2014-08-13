loadApplication = ->
  styles = ["display: block","background: #f7cd81","color: white","padding: 20px 20px 20px 20px","text-align: center","font-weight: normal","font-size: 20px","line-height: 60px"].join(';')
  console.log '%c Hydrogen!', styles, 'Has loaded.'
  $(svgInjector)
  $(mobileScripts)
  $(mobileNav)
  $(ourWorks)

svgInjector = ->
  mySVGsToInject = document.querySelectorAll('img.inject-me')
  SVGInjector mySVGsToInject

mobileScripts = ->
  if Modernizr.touch
    FastClick.attach(document.body)
 
mobileNav = ->
  trigger = $('.menu-arrow')
  navigation = $('.primary-nav')
  trigger.on 'click', ->
    navigation.slideToggle()
    navigation.toggleClass 'open'
    $(@).toggleClass 'open'
    localStorage.setItem 'menu', navigation.hasClass 'open'

  mobileView = 767

  window.addEventListener 'resize', ->
    menuLs = localStorage.getItem('menu')
    flexWidth = window.innerWidth
    
    if flexWidth >= mobileView
      if menuLs is 'false'
        navigation.slideDown()
        navigation.removeClass 'open'
        trigger.removeClass 'open'
      else
    else
      if menuLs is 'false'
        navigation.hide()

ourWorks = ->
  $container = $('#worksContainer')
  $container.isotope
    itemSelector: ".item"
    masonry:
      columnWidth: ".grid-sizer"


$(loadApplication)
