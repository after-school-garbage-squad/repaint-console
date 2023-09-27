"use client";

import html2canvas from "html2canvas";
import { useAtom } from "jotai";
import QRCode from "react-qr-code";

import { PanelCard } from "../../components/panel-card";

import { selectEventIDAtom } from "@/domain/event/store/atom";

export const EventQrPanel = () => {
  const [selectEventID] = useAtom(selectEventIDAtom);

  const handleSaveImage = () => {
    // eslint-disable-next-line unicorn/prefer-query-selector
    const qrCodeElement = document.getElementById("#qr-code");

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
        <p className={"text-lg text-deepBlue"}>イベント管理者</p>
        <button
          onClick={handleSaveImage}
          className={"rounded-lg bg-deepBlue p-2 text-white"}>
          ダウンロード
        </button>
      </div>
      <div className={"grid flex-auto place-items-center"}>
        <QRCode value={selectEventID!} />
      </div>
    </PanelCard>
  );
};
