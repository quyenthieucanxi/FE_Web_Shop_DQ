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
                <SwiperSlide ><img  className='h-[100px]' src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.15752-9/449769255_1874750003046616_666448433440353889_n.png?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFgbOmuC2pjzeZnPE3bS3oT4L14EIuri_PgvXgQi6uL85E2MCWHK7FmY1xccxC3uxpB9LsTdSFZzoIrGzGbiIoo&_nc_ohc=C5xg_ouhX1YQ7kNvgE1ve6v&_nc_ht=scontent.fsgn5-7.fna&oh=03_Q7cD1QFdeisdaPAzIvGLNB5Xzbf5KbXSCDihNDgupyBiEC5Sfg&oe=66BF5728" alt="" /></SwiperSlide>
                <SwiperSlide ><img  className='h-[100px]' src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.15752-9/450090913_1202650084245454_9200067398269480560_n.png?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFvVFxjoeg7rhQZ1oPR35L4DQjxFKWRDPgNCPEUpZEM-HnwvbX9YVxM93RzL54J8l8Vl-emyW0irc8aKhQc5cmx&_nc_ohc=o-p8Ps-lXHAQ7kNvgH2hL8s&_nc_ht=scontent.fsgn5-7.fna&oh=03_Q7cD1QECTBQ02Xr5U9D70RS1TTpGsrcP-cdo5ahDlmwrKmUwHA&oe=66BF5552" alt="" /></SwiperSlide>
                <SwiperSlide ><img  className='h-[100px]' src="https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.15752-9/449252170_1005420624181027_4325079723489570914_n.png?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGlEq5Ha70lzjJ7-6oMmgpzshFCGvt5aJKyEUIa-3lokqWJSGi1iZXTTnO04ayzd11dLxq_A0a8LIM8zW_iCMwe&_nc_ohc=DrT71nyBrzYQ7kNvgGghNzw&_nc_ht=scontent.fsgn5-1.fna&oh=03_Q7cD1QGhZKwiRtaGJNfcQgRIixxwfotqjw9XYW4rnUeCoc52PQ&oe=66BF5155" alt="" /></SwiperSlide>
                
            </Swiper>
        </>
    )
}