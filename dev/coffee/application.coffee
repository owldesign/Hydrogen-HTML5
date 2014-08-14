loadApplication = ->
  styles = ["display: block","background: #f7cd81","color: white","padding: 20px 20px 20px 20px","text-align: center","font-weight: normal","font-size: 20px","line-height: 60px"].join(';')
  console.log '%c Hydrogen!', styles, 'Has loaded.'
  $(svgInjector)
  $(mobileScripts)
  $(mobileNav)
  $(ourWorks)
  $(testimonialsSwiper)
  $(formSubscribe)
  $(googleMap)

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
  worksContainer = $('#worksContainer')
  filterContainer = $('#worksFilters')
  worksItem = $('#worksContainer .item')

  worksContainer.isotope
    itemSelector: '.item'
    filter: '*'
    animationEngine: 'best-available'
    masonry:
      columnWidth: '.grid-sizer'

  filterContainer.on 'click', 'button', ->
    filterValue = $(this).attr('data-filter')
    worksContainer.isotope filter: filterValue

  $('.button-group').each (i, buttonGroup) ->
    buttonGroup = $(buttonGroup)
    buttonGroup.on 'click', 'button', ->
      $buttonGroup.find('.is-checked').removeClass 'is-checked'
      $(@).addClass 'is-checked'

  # Hotlinking
  worksItem.on 'click', ->
    url = $(@).data 'url'
    window.open(url, '_blank')

testimonialsSwiper = ->
  mySwiper = $('.testimonials-swiper').swiper(
    mode: 'horizontal'
    loop: true
    calculateHeight: true
    pagination: '.testimonials-pager'
    paginationClickable: true
  )

formSubscribe = ->
  form = $('#subscribe')
  formMessages = $('.form-result');

  # Form validation on iOS Safari
  hasHtml5Validation = ->
    typeof document.createElement("input").checkValidity is "function"

  if hasHtml5Validation()
    form.submit (e) ->
      unless @checkValidity()
        e.preventDefault()
        $(this).addClass "invalid"
        $("#status").html "invalid"
      else
        $(this).removeClass "invalid"
        e.preventDefault()
        formData = $(form).serialize()
        $.ajax(
          type: "POST"
          url: $(form).attr("action")
          data: formData
        ).done((response) ->
          if response == "success"
            $('.hide-me').fadeOut()
            $(formMessages).removeClass "error"
            $(formMessages).addClass "success"

            $(formMessages).text 'Thanks for contacting us!'
            $("#name").val ""
            $("#number").val ""
          else
            $(formMessages).removeClass "success"
            $(formMessages).addClass "error"
            $(formMessages).text "Oops! An error occured please check all the fields."
        ).fail (data) ->
          $(formMessages).text "Oops! An error occured please check all the fields."


googleMap = ->
  myLatlng = new google.maps.LatLng(45.3558359, -122.599946) # Address Coordinates
  mapOptions =
    zoom: 16
    panControl: false
    mapTypeControl: false
    center: myLatlng
    styles: [
      {
        featureType: "administrative"
        elementType: "all"
        stylers: [
          {
            visibility: "on"
          }
          {
            saturation: -100
          }
          {
            lightness: 20
          }
        ]
      }
      {
        featureType: "road"
        elementType: "all"
        stylers: [
          {
            visibility: "on"
          }
          {
            saturation: -100
          }
          {
            lightness: 40
          }
        ]
      }
      {
        featureType: "water"
        elementType: "all"
        stylers: [
          {
            visibility: "on"
          }
          {
            saturation: -10
          }
          {
            lightness: 30
          }
        ]
      }
      {
        featureType: "landscape.man_made"
        elementType: "all"
        stylers: [
          {
            visibility: "simplified"
          }
          {
            saturation: -60
          }
          {
            lightness: 10
          }
        ]
      }
      {
        featureType: "landscape.natural"
        elementType: "all"
        stylers: [
          {
            visibility: "simplified"
          }
          {
            saturation: -60
          }
          {
            lightness: 60
          }
        ]
      }
      {
        featureType: "poi"
        elementType: "all"
        stylers: [
          {
            visibility: "off"
          }
          {
            saturation: -100
          }
          {
            lightness: 60
          }
        ]
      }
      {
        featureType: "transit"
        elementType: "all"
        stylers: [
          {
            visibility: "off"
          }
          {
            saturation: -100
          }
          {
            lightness: 60
          }
        ]
      }
    ]

  mapElement = document.getElementById("map")
  map = new google.maps.Map(mapElement, mapOptions)
  marker = new google.maps.Marker(
    position: myLatlng
    map: map
    icon: '/images/map-marker.png'
  )


$(loadApplication)
