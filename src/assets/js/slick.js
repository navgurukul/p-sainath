$(document).ready(function () {
  $(".newsArticles").slick({
    arrows: true,
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  });
});

$(document).ready(function () {
  $(".testimonials").slick({
    arrows: true,
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  });
});

$(document).ready(function () {
  $(".sorttedby").slick({
    arrows: true,
    dots: true,
    centerMode: true,
    autoplay: true,
    centerPadding: "60px",
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
});