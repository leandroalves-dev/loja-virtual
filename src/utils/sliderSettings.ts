const sliderSettings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        {
        breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
        breakpoint: 980,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
        breakpoint: 850,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        },
        },
        {
        breakpoint: 650,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
        breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};
  
  export default sliderSettings;