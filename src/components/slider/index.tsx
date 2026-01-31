import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Box, IconButton } from "@mui/material";
import { arrowLeft, arrowRight, slider } from "../../assets";
import "swiper/css";
import "swiper/css/navigation";

const arrowBtn = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  backgroundColor: "#fff",
  boxShadow: "0px -1px 6px #00000038",
  width: { xs: "20px", sm: "31px", lg: "42px" },
  height: { xs: "20px", sm: "31px", lg: "42px" },
  padding: { xs: "4px", sm: "8px" },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": { backgroundColor: "#fff" },
};

const ImageSlider = ({ slides }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (
      swiperReady &&
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;

      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperReady, swiperInstance]);

  return (
    <Box
      position="relative"
      sx={{ width: { xs: "80%", md: "400px", lg: "100%" } }}
      maxWidth="538px"
      margin="auto"
    >
      {slides && slides?.length > 0 ? (
        slides?.length > 1 ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
              setSwiperReady(true);
            }}
          >
            {slides?.map((img, index) => (
              <SwiperSlide key={index}>
                <Box
                  component="img"
                  src={img}
                  alt={`slide-${index}`}
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Box
            component="img"
            src={slides[0]}
            alt={`slide`}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        )
      ) : null}

      {slides && slides?.length > 1 && (
        <>
          <IconButton
            ref={prevRef}
            sx={{
              ...arrowBtn,
              left: { xs: "-30px", sm: "-40px", lg: "-60px" },
            }}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src={arrowLeft}
              alt="left-arrow"
            />
          </IconButton>

          <IconButton
            ref={nextRef}
            sx={{
              ...arrowBtn,
              right: { xs: "-30px", sm: "-40px", lg: "-60px" },
            }}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src={arrowRight}
              alt="right-arrow"
            />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default ImageSlider;
