import Axios from "axios"
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import { useState } from "react";
import { Image, Heading, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function Carousel() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const getData = async (data1) => {
    try {
      const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=1&orderBy=total_fav&sort=DESC", data1);
      setData(response.data.result);
    } catch (err) {
      console.log(err);
    }
  }
  const handleClick = (id) => {
    navigate(`detailPage/${id}`);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Swiper
      effect={'fade'}
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
      loop={true}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[EffectFade, Autoplay, Navigation, Pagination]}
    >
      className="mySwiper"
      {data?.map((item, index) => {
        return (
          <SwiperSlide onClick={() => handleClick(item.id)} key={index}>
            <Image position={"relative"} src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} ></Image>
            <Box h={"full"} w={"full"} bgColor={"rgba(0,0,0,50%)"} position={"absolute"}>
              <Heading
                cursor={"pointer"}
                display={"flex"} justifyContent={"center"}
                lineHeight={["250px", "504px"]} fontSize={"35px"}
                fontFamily={"monospace"} color={"white"} >
                {item.title}</Heading>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
