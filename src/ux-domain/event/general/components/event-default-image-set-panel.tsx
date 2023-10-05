"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type React from "react";
import { useEffect, useRef, useState } from "react";

import { useAtom } from "jotai";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PanelCard } from "../../components/panel-card";

import type { Swiper as SwiperType } from "swiper/core";

import { getIdToken } from "@/domain/auth/api/get-id-token";
import { deleteDefaultImage } from "@/domain/event/api/delete-default-image";
import { getEventList } from "@/domain/event/api/get-event-list";
import { getImageUrl } from "@/domain/event/api/get-image-url";
import { registerDefaultImage } from "@/domain/event/api/register-default-image";
import {
  eventListAtom,
  selectEventAtom,
  selectEventIdAtom,
} from "@/domain/event/store/atom";
import { Dialog } from "@/ux-domain/shared-ui/dialog";

const EventDefaultImageSetDialog = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setEventList = useAtom(eventListAtom)[1];
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectEventId] = useAtom(selectEventIdAtom);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const inputChaneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    // DataURLを作成
    if (e.target.files?.[0] === undefined) return;
    reader.readAsDataURL(e.target.files?.[0]);

    reader.addEventListener("load", () => {
      setPreviewImage(reader.result as string);
    });
  };

  const onSubmit = async () => {
    const idToken = await getIdToken();
    if (!idToken) return;
    const data: FormData = new FormData();
    data.append("image", inputRef.current?.files?.[0] as Blob);

    await registerDefaultImage(idToken, selectEventId, data);
    const newEventList = await getEventList(idToken);
    setEventList(newEventList);
    setPreviewImage(null);
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
      trigger={
        <button className={"rounded-lg bg-deepBlue p-2 text-white"}>
          画像の追加
        </button>
      }
    >
      <div className={"flex flex-col gap-4"}>
        <p className={"text-lg text-deepBlue"}>イベントデフォルト画像の追加</p>
        <button
          onClick={() => inputRef.current?.click()}
          className={"w-max rounded-lg bg-deepBlue px-4 py-2 text-white"}
        >
          画像のアップロード
        </button>
        <input
          onChange={(e) => inputChaneHandler(e)}
          ref={inputRef}
          type="file"
          className={"hidden"}
          accept={"image/*"}
        />
      </div>
      <div className={"mx-auto p-4"}>
        {previewImage && (
          <img
            alt="アップロードした画像のプレビュー"
            src={previewImage}
            className={
              "mx-auto max-h-96 w-full max-w-lg bg-slate-200 object-contain"
            }
          />
        )}
      </div>
      {previewImage && (
        <div className={"mt-4 flex justify-end"}>
          <button
            className={"rounded-lg bg-deepBlue px-4 py-2 text-white"}
            onClick={onSubmit}
          >
            追加する
          </button>
        </div>
      )}
    </Dialog>
  );
};

export const EventDefaultImageSetPanel: React.FC = () => {
  const [selectEvent] = useAtom(selectEventAtom);
  const [eventList, setEventlist] = useAtom(eventListAtom);
  const [activeIndex, setAvtiveIndex] = useState<number>(0);
  const [selectEventId] = useAtom(selectEventIdAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // TODO: 切り分ける
  const [imageList, setImageList] = useState<
    | {
        imageId: string;
        url: string;
      }[]
    | null
  >(null);

  const getActiveIndex = (swiper: SwiperType) => {
    setAvtiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const initImageList = async () => {
      const idToken = await getIdToken();
      if (!idToken) return;

      if (selectEvent?.images === undefined) return;
      const imageIdList = selectEvent.images;

      const urls = imageIdList.map(async (imageId) => {
        const url = await getImageUrl(idToken, selectEventId, imageId);
        return { imageId, url };
      });
      const result = await Promise.all(urls);
      setImageList(result);
    };
    initImageList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectEvent]);

  const handleDeleteImage = async () => {
    setIsLoading(true);
    const idToken = await getIdToken();
    if (!idToken) return;
    const imageId = imageList?.[activeIndex].imageId;
    if (!imageId) return;

    await deleteDefaultImage(idToken, selectEventId, imageId);

    setEventlist(
      eventList.map((event) => {
        if (event.eventId !== selectEventId) return event;
        return {
          ...event,
          images: event.images.filter((image) => image !== imageId),
        };
      }),
    );
    setIsLoading(false);
  };

  return (
    <PanelCard className={"flex flex-col gap-4"}>
      <div className={"flex items-center justify-between"}>
        <h2 className={"text-lg "}>デフォルト画像の設定</h2>
        <EventDefaultImageSetDialog />
      </div>
      <div className={"flex gap-2"}>
        <button
          className={"rounded-lg bg-red px-4 py-2 text-white disabled:bg-gray"}
          disabled={!imageList?.length || isLoading}
          onClick={handleDeleteImage}
        >
          現在の画像を削除
        </button>
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
    </PanelCard>
  );
};
