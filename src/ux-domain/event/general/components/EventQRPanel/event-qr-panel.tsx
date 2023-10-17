"use client";

import type { FC } from "react";

import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";

import { PanelCard } from "../../../components/panel-card";

export type EventQrPanelProps = {
  selectEventId: string;
  hasDefaultImage: boolean;
};

export const EventQrPanel: FC<EventQrPanelProps> = ({
  selectEventId,
  hasDefaultImage,
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
    <PanelCard className={"flex flex-col"}>
      <div className={"flex items-center justify-between"}>
        <h2 className={"text-lg"}>イベントQRコード</h2>
        <button
          onClick={handleSaveImage}
          disabled={!hasDefaultImage}
          className={"rounded-lg bg-deepBlue p-2 text-white disabled:bg-gray"}
        >
          ダウンロード
        </button>
      </div>
      <div id="qr-code" className={"grid flex-auto place-items-center p-4"}>
        {hasDefaultImage ? (
          <QRCodeCanvas
            size={250}
            value={`https://repaint.asgs.dev/?event_id=${selectEventId}`}
            imageSettings={{
              src: "/icon.png",
              x: undefined,
              y: undefined,
              height: 72,
              width: 72,
              excavate: false,
            }}
          />
        ) : (
          <p>デフォルト画像を追加後に表示されます。</p>
        )}
      </div>
    </PanelCard>
  );
};
