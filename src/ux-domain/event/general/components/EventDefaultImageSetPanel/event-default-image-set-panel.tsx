"use client";

import { useState, useEffect } from "react";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { EventDefaultImageSetDialog } from "./event-default-image-dialog";

import type { SwiperClass } from "swiper/react";

import { deleteDefaultImage } from "@/domain/event/api/delete-default-image";
import { getImageUrlList } from "@/domain/event/utils/get-image-rul-list";
import { PanelCard } from "@/ux-domain/event/components/panel-card";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type EventDefaultImageSetPanelProps = {
  imageIdList: string[];
  selectEventId: string;
};

export const EventDefaultImageSetPanel: React.FC<
  EventDefaultImageSetPanelProps
> = ({ imageIdList, selectEventId }) => {
  const [activeIndex, setAvtiveIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [imageList, setImageList] = useState<
    | {
        imageId: string;
        url: string;
      }[]
    | null
  >(null);

  const getActiveIndex = (swiper: SwiperClass) => {
    setAvtiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const getImageList = async () => {
      const imageUrlList = await getImageUrlList(selectEventId, imageIdList);
      if (!imageUrlList) return;
      setImageList(imageUrlList);
    };
    getImageList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageIdList]);

  const handleDeleteImage = async () => {
    setIsLoading(true);
    const imageId = imageList?.[activeIndex].imageId;
    if (!imageId) return;

    await deleteDefaultImage(selectEventId, imageId);

    setImageList((prev) => {
      if (!prev) return null;
      const newImageList = [...prev];
      newImageList.splice(activeIndex, 1);
      return newImageList;
    });

    setIsLoading(false);
  };

  return (
    <PanelCard className={"flex flex-col gap-4"}>
      <div className={"flex items-center justify-between gap-4"}>
        <h2 className={"text-lg "}>デフォルト画像の設定</h2>
        <EventDefaultImageSetDialog selectEventId={selectEventId} />
      </div>
      <div className={"flex-auto"}>
        <Swiper
          className={"grid h-64 w-64 place-items-center"}
          pagination
          navigation
          slidesPerView={1}
          modules={[Navigation, Pagination]}
          onSlideChangeTransitionEnd={getActiveIndex}
        >
          {imageList &&
            imageList.map((image) => (
              <SwiperSlide
                className="grid h-full w-full place-items-center"
                key={image.imageId}
              >
                <div className="mx-auto block h-full w-full">
                  <img
                    className="mx-auto h-full w-4/5 object-contain"
                    src={image.url}
                    alt="デフォルトイメージ"
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className={"flex justify-end gap-2"}>
        <button
          className={"rounded-lg bg-red px-4 py-2 text-white disabled:bg-gray"}
          disabled={!imageList?.length || isLoading}
          onClick={handleDeleteImage}
        >
          現在の画像を削除
        </button>
      </div>
    </PanelCard>
  );
};
