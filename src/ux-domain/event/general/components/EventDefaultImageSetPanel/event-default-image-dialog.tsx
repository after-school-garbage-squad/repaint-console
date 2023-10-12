"use client";

import type { FC } from "react";
import { useImperativeHandle, useRef, useState } from "react";

import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{ imageFile: FileList }>();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const setDialogState = useAtom(alertDialogStateAtom)[1];

  const { mutate } = useEventList();

  const inputChaneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    // DataURLを作成
    if (e.target.files?.[0] === undefined) return;
    reader.readAsDataURL(e.target.files?.[0]);

    reader.addEventListener("load", () => {
      if (e.target.files?.[0] === undefined) return;
      setPreviewImage(reader.result as string);
      setImageFile(e.target.files?.[0]);
    });

    if (e.target.files?.[0].size > 1024 * 1024 * 32) {
      setError("imageFile", {
        type: "manual",
        message: "32MB以下の画像を選択してください",
      });
    } else if (e.target.files?.[0].type === "image/png") {
      setError("imageFile", {
        type: "manual",
        message: undefined,
      });
    } else {
      setError("imageFile", {
        type: "manual",
        message: "ファイル形式はpngのみです。",
      });
    }
  };

  const { ref, ...rest } = register("imageFile", {
    onChange: inputChaneHandler,
  });

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const onSubmit = async () => {
    const data: FormData = new FormData();
    data.append("image", imageFile as File);

    try {
      await registerDefaultImage(selectEventId, data);
    } catch (error) {
      if (error instanceof Error) {
        setDialogState({ isOpen: true, error: new TypeError(error.message) });
      }
      setIsDialogOpen(false);
      return;
    }

    setPreviewImage(null);
    mutate();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-col gap-4"}>
          <p className={"text-lg text-deepBlue"}>
            イベントデフォルト画像の追加
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={"w-max rounded-lg bg-deepBlue px-4 py-2 text-white"}
          >
            画像のアップロード
          </button>
          <input
            {...rest}
            disabled={isSubmitting}
            ref={inputRef}
            type="file"
            accept="image/png"
            className={"hidden"}
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
          <div
            className={
              "mt-4 flex flex-col items-end justify-end gap-2 md:flex-row md:items-center"
            }
          >
            {errors.imageFile && (
              <p className="w-full flex-auto text-center text-lg text-red md:w-max">
                {errors.imageFile.message}
              </p>
            )}
            <button
              type="submit"
              disabled={!!errors.imageFile?.message || isSubmitting}
              className={
                "w-max rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
              }
            >
              追加する
            </button>
          </div>
        )}
      </form>
    </Dialog>
  );
};
