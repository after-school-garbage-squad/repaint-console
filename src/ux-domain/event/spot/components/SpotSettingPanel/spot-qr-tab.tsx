import type { FC } from "react";

import html2canvas from "html2canvas";
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
  const handleSaveImage = () => {
    // eslint-disable-next-line unicorn/prefer-query-selector
    const qrCodeElement = document.getElementById("qr-code");

    html2canvas(qrCodeElement!).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imgData;
      a.download = "qr-code.png";
      a.click();
    });
  };

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
        onClick={handleSaveImage}
        className={
          "rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
        }
      >
        保存する
      </button>
    </div>
  );
};
