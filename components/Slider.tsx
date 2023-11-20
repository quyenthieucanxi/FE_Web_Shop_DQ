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
                <SwiperSlide><img src="https://cdn.chotot.com/admincentre/zn4pnENC6338xiCSOTCelj80qRlo6o_IlM0ckoEk2tM/preset:raw/plain/131246fab089b93697f4c9b04701c81b-2842184845821107881.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.chotot.com/admincentre/zn4pnENC6338xiCSOTCelj80qRlo6o_IlM0ckoEk2tM/preset:raw/plain/131246fab089b93697f4c9b04701c81b-2842184845821107881.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.chotot.com/admincentre/zn4pnENC6338xiCSOTCelj80qRlo6o_IlM0ckoEk2tM/preset:raw/plain/131246fab089b93697f4c9b04701c81b-2842184845821107881.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.chotot.com/admincentre/zn4pnENC6338xiCSOTCelj80qRlo6o_IlM0ckoEk2tM/preset:raw/plain/131246fab089b93697f4c9b04701c81b-2842184845821107881.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.chotot.com/admincentre/zn4pnENC6338xiCSOTCelj80qRlo6o_IlM0ckoEk2tM/preset:raw/plain/131246fab089b93697f4c9b04701c81b-2842184845821107881.jpg" alt="" /></SwiperSlide>
            </Swiper>
        </>
    )
}