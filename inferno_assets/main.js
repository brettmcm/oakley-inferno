$(document).ready( function() {


  // Define Variables
  var vh = $(window).height(),
      controller = new ScrollMagic.Controller(),
      heroFog = $('#heroFog'),
      fogLayer = $('#fogLayer'),
      introBlock = $('#intro'),
      processGoggle = $('#process-image-goggle'),
      processButton = $('#process-button'),
      processLens = $('#process-lens');

  // Fade Out Fog On Hero Goggle
  new ScrollMagic.Scene({
      triggerElement: "#heroGoggle",
      duration:vh/2
    })
    .setTween(heroFog, 2, {opacity:0})
    .addTo(controller);
  new ScrollMagic.Scene({
      triggerElement: "#heroGoggle",
      duration:vh/2
    })
    .setTween(fogLayer, 2, {opacity:0})
    .addTo(controller);
  new ScrollMagic.Scene({
      triggerElement: "#intro",
      triggerHook: "onEnter",
      duration:vh
    })
    .setTween(introBlock, {opacity:1})
    .addTo(controller);



  

  // Init Process Animations
  var pInfernoBtn = $('#process-button').find('.outline'),
      pInternoBtnIcon = $('#process-button').find('.icon'),
      pInfernoBtnTL = new TimelineMax({paused:true}),
      pHeatLens = $('#process-lens'),
      pHeatLensTL = new TimelineMax({paused:true});

  pInfernoBtnTL.fromTo(pInfernoBtn, 0.5, {drawSVG:"0%"}, {drawSVG:"100%", ease:Power1.easeInOut})
               .fromTo(pInternoBtnIcon, 0.7, {opacity:0, y:50}, {opacity:1, y:0, ease:Power2.easeOut}, '-=0.5');
  pHeatLensTL.fromTo(pHeatLens, 0.7, {opacity:0}, {opacity:0.7, ease:Power2.easeOut});
  

  // Pin Process Goggle Image Container
  var pPinScene = new ScrollMagic.Scene({
    triggerElement: ".process-image",
    triggerHook: "onLeave",
    duration:"300%"
  })
  .setPin(".process-image", {pushFollowers: false})
  .addTo(controller);

  // Trigger Process Animations
  var pInfernoBtnScene = new ScrollMagic.Scene({
      triggerElement: "#process1", duration:"100%"
    }).addTo(controller);
  var pHeatLensScene = new ScrollMagic.Scene({
      triggerElement: "#process2", duration:"100%"
    }).addTo(controller);

  pInfernoBtnScene.on("enter", function (event) {
    pInfernoBtnTL.play();
  });
  pInfernoBtnScene.on("leave", function (event) {
    pInfernoBtnTL.reverse();
  });
  pHeatLensScene.on("enter", function (event) {
    pHeatLensTL.play();
  });
  pHeatLensScene.on("leave", function (event) {
    pHeatLensTL.reverse();
  });

  


  // Init 'Use Case' Carousel
  var processCarousel = $('.use-case-blocks').flickity({
      prevNextButtons: false,
      pageDots: true,
      imagesLoaded: true,
      watchCSS: true
  });

  



  // Init 'How It Works' Interactions
  var powerModule = $('.power-module'),
      moduleComponent = $('#module-component'),
      powerBtn = $('#tech-power-trigger'),
      ledLight = $('#tech-led-light'),
      infernoBtn = $('#tech-inferno-btn > path'),
      infernoBtnTL = new TimelineMax({ paused:true }),
      heatingAni = new TimelineMax({ paused:true, onStart:function(){ vibratingAni.play(0) }, onComplete:function(){ $(powerModule).removeClass('heating') } }),
      vibratingAni = new TimelineMax({ paused:true, repeat:100 });
      
  TweenMax.set(infernoBtn, {drawSVG:"0%"});
  infernoBtnTL.to(infernoBtn, 0.5, {drawSVG:"100%"});

  vibratingAni.to(moduleComponent, 0.001, { x:'+=2' })
              .to(moduleComponent, 0.001, { x:'-=2' });

  heatingAni.to(ledLight, 0.05, { opacity:0 })
            .to(ledLight, 0.05, { opacity:1, delay:0.3 })
            .add( function(){ vibratingAni.play(0) } )
            .to(ledLight, 0.05, { opacity:0, delay:0.3 })
            .to(ledLight, 0.05, { opacity:1, delay:0.3 })
            .to(ledLight, 0.05, { opacity:0, delay:0.3 })
            .to(ledLight, 0.05, { opacity:1, delay:0.3 })
            .to(ledLight, 0.05, { opacity:0, delay:0.3 })
            .to(ledLight, 0.05, { opacity:1, delay:0.3 })
            .to(ledLight, 0.05, { opacity:0, delay:0.3 })
            .to(ledLight, 0.05, { opacity:1, delay:0.3 })
            .to(ledLight, 0.05, { opacity:0, delay:0.3 })
            .add( function(){ vibratingAni.play(0) } )
            .to(ledLight, 0.05, { opacity:0.8, delay:0.3 });

  function engageUserControl() {
    if ( $('#specs > .power-module > .power-button').is(":hidden") ) {
      $(powerModule).addClass('power-on');
      if ( $(powerModule).hasClass('power-on') ) {
        infernoBtnTL.play();
        TweenMax.set(ledLight, {opacity:0.8});
      } else {
        infernoBtnTL.reverse();
        TweenMax.set(ledLight, {opacity:0});
      }
    } else {
      $(powerModule).removeClass('heating').removeClass('power-on');
      infernoBtnTL.reverse();
      TweenMax.set(ledLight, {opacity:0});
    }
  }
  engageUserControl();
  $( window ).resize(function() {
    engageUserControl();
  });

  $(powerBtn).click(function() {
    $(powerModule).toggleClass('power-on');
    if ( $(powerModule).hasClass('power-on') ) {
      infernoBtnTL.play();
      TweenMax.set(ledLight, {opacity:0.8});
    } else {
      infernoBtnTL.reverse();
      TweenMax.set(ledLight, {opacity:0});
    }
  });

  $(infernoBtn).click(function() {
    $(powerModule).addClass('heating');
    heatingAni.play(0);
  });


  // Init 'Shop Now' Product Image Carousel
  var prodCarousel = $('#buy').find('.carousel').flickity({
      prevNextButtons: false,
      pageDots: true,
      imagesLoaded: true,
      watchCSS: true
  });
});










