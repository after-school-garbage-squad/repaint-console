import type { FC } from "react";

import QRCode from "react-qr-code";

import type { Spot } from "@/domain/event/types";

type SpotQRContentProps = {
  spot: Spot;
  selectEventId: string;
};

export const SpotQRContent: FC<SpotQRContentProps> = ({
  spot,
  selectEventId,
}) => {
  return (
    <div className="flex flex-col">
      {spot.isPick ? (
        <div id="qr-code" className={"grid flex-auto place-items-center p-4"}>
          <QRCode
            value={JSON.stringify({
              event_id: selectEventId,
              spot_id: spot.spotId,
            })}
            width={250}
          />
        </div>
      ) : (
        <div className={"grid h-60 w-full place-items-center"}>
          <p>ピック可能スポットのみQRコードを表示することができます。</p>
        </div>
      )}
      <button
        disabled={!spot.isPick}
        className={
          "rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
        }
      >
        保存する
      </button>
    </div>
  );
};
