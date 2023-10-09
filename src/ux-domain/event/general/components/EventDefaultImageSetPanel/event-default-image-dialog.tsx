"use client";

import type { FC } from "react";
import { useRef, useState } from "react";

import { useAtom } from "jotai";

import { registerDefaultImage } from "@/domain/event/api/register-default-image";
import { useEventList } from "@/domain/event/utils/use-event-list";
import { alertDialogStateAtom } from "@/ux-domain/shared-ui/ErrorAlertDialog/atom";
import { Dialog } from "@/ux-domain/shared-ui/dialog";

type EventDefaultImageSetDialogProps = {
  selectEventId: string;
};

export const EventDefaultImageSetDialog: FC<
  EventDefaultImageSetDialogProps
> = ({ selectEventId }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setDialogState = useAtom(alertDialogStateAtom)[1];

  const { mutate } = useEventList();

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
    setIsLoading(true);
    const data: FormData = new FormData();
    data.append("image", inputRef.current?.files?.[0] as Blob);

    try {
      await registerDefaultImage(selectEventId, data);
    } catch (error) {
      if (error instanceof Error) {
        setDialogState({ isOpen: true, error: new TypeError(error.message) });
      }
      setIsDialogOpen(false);
      setIsLoading(false);
      return;
    }

    setPreviewImage(null);
    mutate();
    setIsLoading(false);
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
            disabled={isLoading}
            className={
              "rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
            }
            onClick={onSubmit}
          >
            追加する
          </button>
        </div>
      )}
    </Dialog>
  );
};
