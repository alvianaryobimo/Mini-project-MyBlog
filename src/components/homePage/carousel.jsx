import Axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Heading, Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
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
  const handleClick = (id) => { navigate(`detailPage/${id}`); }
  useEffect(() => {
    getData();
  }, []);

  return (
    <Swiper
      effect={'fade'}
      loop={true}
      navigation={true}
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[EffectFade, Autoplay, Navigation, Pagination]}
      className="mySwiper">
      {data?.map((item, index) => {
        return (
          <SwiperSlide onClick={() => handleClick(item.id)} key={index}>
            <Image position={"absolute"} src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`}></Image>
            <Box position={"relative"} h={"full"} w={"full"} bgColor={"rgba(0,0,0,40%)"}>
              <Heading cursor={"pointer"} display={"flex"} justifyContent={"center"}
                color={"white"} lineHeight={["250px", "504px"]}
                fontSize={"30px"} fontFamily={"monospace"}>
                {item.title}</Heading>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
