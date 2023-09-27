"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PanelCard } from "../../components/panel-card";

export const EventDefaultImageSetPanel = () => {
  return (
    <PanelCard className={"flex flex-col"}>
      <div className={"flex items-center justify-between"}>
        <p className={"text-lg text-deepBlue"}>デフォルト画像の設定</p>
        <button className={"rounded-lg bg-deepBlue p-2 text-white"}>
          設定する
        </button>
      </div>
      <div className={"flex-auto"}>
        <Swiper
          className={"grid h-full w-full place-items-center"}
          pagination
          navigation
          slidesPerView={1}
          modules={[Navigation, Pagination]}
        >
          <SwiperSlide>
            <img
              src="/icon.png"
              alt="デフォルトイメージ"
              className="block h-full w-full object-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/icon.png"
              alt="デフォルトイメージ"
              className="block h-full w-full object-contain"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </PanelCard>
  );
};
