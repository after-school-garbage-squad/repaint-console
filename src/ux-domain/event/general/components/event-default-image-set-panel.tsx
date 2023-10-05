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

import { getIdToken } from "@/domain/auth/api/get-id-token";
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
      }>
      <div className={"flex flex-col gap-4"}>
        <p className={"text-lg text-deepBlue"}>イベントデフォルト画像の追加</p>
        <button
          onClick={() => inputRef.current?.click()}
          className={"w-max rounded-lg bg-deepBlue px-4 py-2 text-white"}>
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
            onClick={onSubmit}>
            追加する
          </button>
        </div>
      )}
    </Dialog>
  );
};

export const EventDefaultImageSetPanel: React.FC = () => {
  const [selectEvent] = useAtom(selectEventAtom);

  // TODO: 切り分ける
  const [imageList, setImageList] = useState<
    | {
        imageId: string;
        url: string;
      }[]
    | null
  >(null);

  const [selectEventId] = useAtom(selectEventIdAtom);

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
      console.log(result);
      setImageList(result);
    };
    initImageList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectEvent]);

  return (
    <PanelCard className={"flex flex-col gap-4"}>
      <div className={"flex items-center justify-between"}>
        <p className={"text-lg text-deepBlue"}>デフォルト画像の設定</p>
        <EventDefaultImageSetDialog />
      </div>
      <div className={"flex gap-2"}>
        <button
          className={"rounded-lg bg-red px-4 py-2 text-white disabled:bg-gray"}
          disabled={!!imageList}>
          現在の画像を削除
        </button>
      </div>
      <div className={"flex-auto"}>
        <Swiper
          className={"grid place-items-center"}
          pagination
          navigation
          slidesPerView={1}
          modules={[Navigation, Pagination]}>
          {imageList &&
            imageList.map((image) => (
              <SwiperSlide key={image.imageId}>
                <img
                  src={image.url}
                  alt="デフォルトイメージ"
                  className="block h-full w-full object-contain"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </PanelCard>
  );
};
