$(document).ready(function () {
  // count down top bar
  
  var fiveSeconds = '2023/12/30'
  $("#countdown").countdown(fiveSeconds).on('update.countdown', function (event) {
    $(this).html(
      event.strftime(
        "<div><span>%D</span> <span>Days</span></div> <div><span>%H</span> <span>Hours</span></div> <div><span>%M</span> <span>Mins</span></div> <div><span>%S</span> <span>Secs</span></div>"
      ),
    );
  }).on('finish.countdown', function (event) {
    $('header .topbar-count-down').hide();
    $('header .t4s-topbar .section-wrap').addClass("min-topbar");


  });;
  
  $(document).on("click", "#topbar_close", function () {
    $(".t4s-topbar ").slideToggle();
  });

  // menu bar
  $(document).on("click", ".menubar_btn", function () {
    $(".nav-list").slideToggle();
  });
  // $(".slide-item .marquee-content").clone().appendTo(".marquee");

  // text writter
  $("#type_writter").typewriter({
    prefix: "",
    text: ["Fashion", "Furniture", "Electronics", "Sports", "Plant"],
    typeDelay: 100,
    waitingTime: 1500,
    blinkSpeed: 800,
  });

  // isotope
  // init Isotope
  var $grid = $(".isotope-grid").isotope({
    itemSelector: ".isotope-item",
    layoutMode: "fitRows",
  });
  // bind filter button click
  $("#filters-group").on("click", ".btn-filter", function () {
    var filterValue = $(this).attr("data-filter");
    // use filterFn if matches value
    $grid.isotope({ filter: filterValue });
  });

  // change is-checked class on buttons isotope
  $(".btn-filters-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "a", function () {
      event.preventDefault();
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });
  //  install EC
  $(".install-ec").click(function (e) {
    e.preventDefault();
    window.open(
      ` https://apps.shopify.com/ecomposer?utm_source=ocolus&utm_medium=TFlanding=${$("#input_install").val()}`,
      "_blank"
    );
  });

  // change is-checked class on buttons tabs
  $(".tabs-group").each(function (i, buttonGroup) {
    let $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", ".tabs-item", function () {
      event.preventDefault();
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");

      // active content
      $(".tabs-content.active").removeClass("active");
      $(`.tabs-content.${$(this).data("tabs")}`).addClass("active");
    });
  });
  // isotope
  // init Isotope
  var $grid2 = $(".tabs-content").isotope({
    itemSelector: ".tab-content-item",
    layoutMode: "fitRows",
    filter: ".product",
  });
  // bind filter button click
  $("#tabs-group").on("click", ".tabs-item", function () {
    // console.log(12321);
    var filterValue = $(this).attr("data-filter");
    // use filterFn if matches value
    $grid2.isotope({ filter: filterValue });
  });

  // masonry layoutmode

  // $(".masonry-row").isotope({
  //   itemSelector: ".masonry-item",
  //   masonry: {
  //     columnWidth: 1,
  //   },
  // });

  // video popup
  $(".play-btn-popup").magnificPopup({
    disableOn: 767,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });
  // accordion
  $(document).on("click", ".faq-button", function () {
    var $faqItem = $(this).closest(".faq-item");
    var $faqContent = $faqItem.find(".faq-content");
    var $faqbtn = $(this).closest(".faq-button");
    if ($faqItem.hasClass("active")) {
      // Nếu phần tử đang active, đóng nó
      $faqItem.removeClass("active");
      $faqbtn.removeClass("active");
      $faqContent.slideUp();
    } else {
      // Nếu phần tử không active, đóng tất cả và mở nó
      $(".faq-item.active, .faq-button.active").removeClass("active");
      $(".faq-content:visible").slideUp();
  
      $(this).toggleClass("active");
      $faqItem.toggleClass("active");
      $faqContent.slideToggle();
    }
  });
  // back to top
  $(window).on("scroll", function () {
    let current_pos = $(this).scrollTop();

    // caculator percent
    let scrollTop2 = $(window).scrollTop();
    let docHeight = $(document).height();
    let winHeight = $(window).height();
    let scrollPercent = scrollTop2 / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);

    $(".btt-progress").css(
      "background",
      `conic-gradient(rgba(0, 0, 0,0.25) ${
        scrollPercentRounded * 3.6
      }deg , rgb(255, 255, 255) 0deg)`
    );
    $(".lm-bar-load").css("width", `${scrollPercentRounded}%`);

    current_pos > 100
      ? $(".back-to-top").addClass("active")
      : $(".back-to-top").removeClass("active");
    // console.log(current_pos, $(document).height());

    current_pos > 100
      ? $(".lm-bar-load").addClass("lm-active ")
      : $(".lm-bar-load").removeClass("lm-active ");
  });
  $(document).on("click", ".back-to-top", function () {
    $(window).scrollTop(0);
  });
 
  // header sticky
  let stickyNavTop = $('header .t4s-header').offset().top;
  let topbarHeight = $("header .t4s-topbar").outerHeight();
  let lastScrollTop = 0;
  
  const stickyNav = function(){
    let scrollTop = $(window).scrollTop();
    let st = $(this).scrollTop(); // our current vertical position from the top
    // otherwise change it back to relative
    if (scrollTop < stickyNavTop) { 
        $('header .t4s-header').removeClass('sticky'); 
    }
    if (st > lastScrollTop && st > stickyNavTop ) {
      // Scroll Down
      $("header .t4s-header").removeClass("t4s-nav-down").addClass('sticky').addClass("t4s-nav-up");
    }
    else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $("header .t4s-header").removeClass("t4s-nav-up").addClass("t4s-nav-down");
        $(".nav-list").hide();
      }
      if( st <= topbarHeight){
        $("header .t4s-header").removeClass("t4s-nav-down")
      }
      
    }
    lastScrollTop = st;
  };
  stickyNav();
  // and run it again every time you scroll
  $(window).scroll(function() {
    stickyNav();
  });


  // zoom image

  $("figure").on("mousemove", function (event) {
    let zoomer = event.currentTarget;
    event.offsetX
      ? (offsetX = event.offsetX)
      : (offsetX = event.touches[0].pageX);
    event.offsetY
      ? (offsetY = event.offsetY)
      : (offsetX = event.touches[0].pageX);
    x = (offsetX / zoomer.offsetWidth) * 100;
    y = (offsetY / zoomer.offsetHeight) * 100;
    zoomer.style.backgroundPosition = x + "% " + y + "%";
  });

  // hide show trial button
  let prevScrollpos = $(window).offset.top;
  $(document).on("scroll", function () {
    // sticky
    let currentScrollPos = $(window).scrollTop();
    if ($(window).scrollTop() > 300) {
      if (prevScrollpos > currentScrollPos) {
        $(".t4s_btn_trial").addClass("is--show");
      } else {
        $(".t4s_btn_trial").removeClass("is--show");
      }
    }
    prevScrollpos = currentScrollPos;
  });
});
