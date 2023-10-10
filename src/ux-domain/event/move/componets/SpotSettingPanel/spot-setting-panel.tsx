import type { FC } from "react";
import { useState } from "react";

import { useAtom } from "jotai";

import type { Spot } from "@/domain/event/types";

import { disableBonus } from "@/domain/event/api/disable-bonus";
import { useEventList } from "@/domain/event/utils/use-event-list";
import { PanelCard } from "@/ux-domain/event/components/panel-card";
import { alertDialogStateAtom } from "@/ux-domain/shared-ui/ErrorAlertDialog/atom";

type SpotSettingPanelProps = {
  spots: Spot[];
  selectEventId: string;
};

export const SpotSettingPanel: FC<SpotSettingPanelProps> = ({
  spots,
  selectEventId,
}) => {
  const { mutate } = useEventList();
  const setDialogState = useAtom(alertDialogStateAtom)[1];
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (spot: Spot) => {
    try {
      setIsSubmitting(true);
      await disableBonus(selectEventId, spot.spotId);
    } catch (error) {
      if (error instanceof Error) {
        setDialogState({ isOpen: true, error });
        setIsSubmitting(false);
        return;
      }
    }
    mutate();
    setIsSubmitting(false);
  };
  return (
    <PanelCard className={"w-full max-w-7xl"}>
      <h2 className={"text-lg"}>フィーバー中のスポット</h2>
      <div
        className={
          "mt-4 grid grid-flow-col grid-cols-1 gap-4 md:grid-flow-row md:grid-cols-3"
        }
      >
        {spots.map(
          (spot) =>
            spot.bonus && (
              <div
                key={spot.spotId}
                className="flex w-full flex-wrap items-center justify-between gap-2 rounded-lg border-2 border-gray px-4 py-2 shadow-lg"
              >
                <p>{spot.name}</p>
                <button
                  aria-label="スポット状態を解除"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit(spot)}
                  className={
                    "rounded-lg bg-red px-4 py-2 text-white disabled:bg-gray"
                  }
                >
                  解除
                </button>
              </div>
            ),
        )}
      </div>
    </PanelCard>
  );
};
