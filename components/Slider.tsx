"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';
import { Autoplay, Pagination } from 'swiper/modules';

export default function Slider() {
    return (
        <>
            <Swiper spaceBetween={30} centeredSlides={true} 
                autoplay={{ delay: 3000,
                    disableOnInteraction: false,
                }} pagination={{ clickable: true, }} modules={[Pagination,Autoplay]} loop={true} className="mySwiper">
                <SwiperSlide ><img className=' h-[100px]' src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.15752-9/449706426_1680739309343134_6611425643722911278_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=PqHGjP73ul0Q7kNvgGIkVGz&_nc_ht=scontent.fsgn2-5.fna&oh=03_Q7cD1QER_icNAO-jNcKoJWyJjif_5DNSVsLfTozc0AAUt0Sm7w&oe=66BC1023" alt="" /></SwiperSlide>
                <SwiperSlide ><img  className='h-[100px]' src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t1.15752-9/403406954_739451471382960_8726675172920704444_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_ohc=yY3HTTFmUT8Q7kNvgGOcxYk&_nc_ht=scontent.fsgn2-10.fna&oh=03_Q7cD1QHhew9lD-A0Q81NLRoqK6n7l42NuBgJkr8f1VyThnYXoA&oe=66BC1338" alt="" /></SwiperSlide>

            </Swiper>
        </>
    )
}