loadApplication = ->
  styles = ["display: block","background: #f7cd81","color: white","padding: 20px 20px 20px 20px","text-align: center","font-weight: normal","font-size: 20px","line-height: 60px"].join(';')
  console.log '%c Hydrogen!', styles, 'Has loaded.'
  $(mobileScripts)
  $(mobileNav)

mobileScripts = ->
  if Modernizr.touch
    FastClick.attach(document.body)
 
mobileNav = ->
  trigger = $('.bouncing-arrow')
  navigation = $('.primary-nav')
  trigger.on 'click', ->
    navigation.slideToggle()
    navigation.toggleClass 'open'
    $(@).toggleClass 'open'

$(loadApplication)
