"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useRef, useState } from "react";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PanelCard } from "../../components/panel-card";

import { Dialog } from "@/components/dialog";

const EventDefaultImageSetDialog = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const inputChaneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    // DataURLを作成
    if (e.target.files?.[0] === undefined) return;
    reader.readAsDataURL(e.target.files?.[0]);
    // 読み込み完了後の処理
    reader.addEventListener("load", () => {
      setPreviewImage(reader.result as string);
    });
  };

  return (
    <Dialog
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
      <div className={"object-contain p-4"}>
        {previewImage && (
          <img
            alt="アップロードした画像のプレビュー"
            className={"relative"}
            src={previewImage}
          />
        )}
        {previewImage && (
          <div className={"mt-4 flex justify-end"}>
            <button className={"rounded-lg bg-green px-4 py-2 text-white"}>
              追加する
            </button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export const EventDefaultImageSetPanel = () => {
  return (
    <PanelCard className={"flex flex-col gap-4"}>
      <div className={"flex items-center justify-between"}>
        <p className={"text-lg text-deepBlue"}>デフォルト画像の設定</p>
      </div>
      <div className={"flex gap-2"}>
        <button className={"rounded-lg bg-red px-4 py-2 text-white"}>
          現在の画像を削除
        </button>
        <EventDefaultImageSetDialog />
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
