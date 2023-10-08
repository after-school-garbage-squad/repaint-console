"use client";

import { useState, type FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Switch from "@radix-ui/react-switch";
import { useForm } from "react-hook-form";

import type { Spot } from "@/domain/event/types";
import type { z } from "zod";

import { deleteSpot } from "@/domain/event/api/delete-spot";
import { updateSpot } from "@/domain/event/api/update-spot";
import { editSpotSchema } from "@/domain/event/schema/edit-spot-schema";
import { useEventList } from "@/domain/event/utils/use-event-list";

type EditSpotTabProps = {
  spot: Spot;
  selectEventId: string;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditSpotTab: FC<EditSpotTabProps> = ({
  spot,
  selectEventId,
  setIsDialogOpen,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<z.infer<typeof editSpotSchema>>({
    mode: "onChange",
    resolver: zodResolver(editSpotSchema),
  });
  const { mutate } = useEventList();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onhandleSwitchChange = async (isPick: boolean) => {
    setIsLoading(true);
    await updateSpot(selectEventId, spot, isPick, spot.name);
    mutate();
    setIsLoading(false);
  };

  // TODO: ロジックの場所を変えたい
  const onhandleEditSubmit = async ({ name }: { name: string }) => {
    setIsLoading(true);
    await updateSpot(selectEventId, spot, spot.isPick, name);

    setIsLoading(false);
  };

  // TODO: ロジックの場所を変えたい
  const onhandleDeleteSubmit = async () => {
    setIsLoading(true);

    if (!selectEventId) return;
    await deleteSpot(selectEventId, spot.spotId);

    mutate();
    setIsLoading(false);

    setIsDialogOpen(false);
  };

  //TODO: focusさせるようにする
  const onhandleEditModeChange = () => {
    if (editMode) {
      reset();
    }
    setEditMode(!editMode);
  };

  return (
    <>
      <div className={"mt-4 flex flex-col gap-2"}>
        <form
          className="flex flex-col"
          id="spot-edit-form"
          onSubmit={handleSubmit(onhandleEditSubmit)}
        >
          <label
            htmlFor="spot-name"
            className="w-max border-b-2 border-gray px-2 text-sm text-zinc-700"
          >
            ビーコン名
          </label>
          <input
            disabled={!editMode || isLoading}
            id="spot-name"
            defaultValue={spot.name}
            type="text"
            className={
              "w-full rounded-lg border-2 border-deepBlue bg-white bg-none p-1 text-lg disabled:border-none"
            }
            {...register("name")}
          />
        </form>
        <div>
          <p className="w-max border-b-2 border-gray px-2 text-sm text-zinc-700">
            ビーコンHWID
          </p>
          <p className={"mx-2 mt-2"}>{spot.hwId}</p>
        </div>
        <div>
          <p className="w-max border-b-2 border-gray px-2 text-sm text-zinc-700">
            スポットID
          </p>
          <p className={"mx-2 mt-2"}>{spot.spotId}</p>
        </div>
        <div>
          <p className="w-max border-b-2 border-gray px-2 text-sm text-zinc-700">
            サービスUUID
          </p>
          <p className={"mx-2 mt-2"}>{spot.serviceUuid}</p>
        </div>
        <div className={"flex flex-col"}>
          <label
            htmlFor="pickable-mode-toggle"
            className="w-max border-b-2 border-gray px-2 text-sm text-zinc-700"
          >
            ピック可能切り替え
          </label>
          <Switch.Root
            onCheckedChange={onhandleSwitchChange}
            disabled={isLoading}
            defaultChecked={spot.isPick}
            id="pickable-mode-toggle"
            className="relative mx-2 mt-2 h-[25px] w-[42px] cursor-default rounded-full bg-gray outline-none focus:shadow-[0_0_0_2px] data-[state=checked]:bg-deepBlue"
          >
            <Switch.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
        </div>
      </div>
      <div className={"flex w-full justify-between"}>
        <button
          onClick={onhandleDeleteSubmit}
          className={"mt-4 rounded-lg bg-red px-4 py-2 text-white"}
          aria-label="ビーコンをイベントから削除する"
        >
          削除する
        </button>
        {editMode ? (
          <div className={"flex gap-4"}>
            <button
              onClick={onhandleEditModeChange}
              className={
                "mt-4 rounded-lg px-4 py-2 text-deepBlue outline-2 outline-deepBlue"
              }
            >
              キャンセル
            </button>
            <button
              disabled={!isDirty || !isValid || isLoading}
              type="submit"
              form="spot-edit-form"
              className={
                "mt-4 rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
              }
            >
              保存する
            </button>
          </div>
        ) : (
          <button
            disabled={editMode}
            onClick={onhandleEditModeChange}
            className={
              "mt-4 rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
            }
          >
            名前を変更する
          </button>
        )}
      </div>
    </>
  );
};
