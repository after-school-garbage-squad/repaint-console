import { EventDefaultImageSetPanel } from "./components/event-default-image-set-panel";
import { EventQrPanel } from "./components/event-qr-panel";

export const GeneralPage = () => {
  return (
    <main className={"flex flex-col gap-6"}>
      <h2 className={"text-2xl"}>一般</h2>
      <div className={"flex flex-col gap-4 md:flex-row"}>
        <div
          className={"flex flex-auto flex-col justify-start gap-4 md:flex-row"}
        >
          <EventQrPanel />
          <EventDefaultImageSetPanel imageidList={[]} />
        </div>
      </div>
    </main>
  );
};

export default GeneralPage;
