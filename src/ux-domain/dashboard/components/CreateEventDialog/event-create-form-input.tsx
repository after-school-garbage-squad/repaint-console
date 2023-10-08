import { forwardRef, type ComponentProps } from "react";

type EventCreateFormInputProps = {
  label: string;
  error?: string;
} & ComponentProps<"input">;

export const CreateEventFormInput = forwardRef<
  HTMLInputElement,
  EventCreateFormInputProps
>(({ label, error, ...rest }, ref) => {
  return (
    <>
      <fieldset
        className={
          "grid grid-flow-col grid-rows-[1fr_1fr] items-center md:grid-flow-row md:grid-cols-[180px_1fr] md:grid-rows-[1fr]"
        }
      >
        <label htmlFor="event-name">{label}</label>
        <input
          ref={ref}
          id="event-name"
          className={
            "w-full rounded-lg border-2 border-deepBlue p-2 outline-none"
          }
          {...rest}
        />
      </fieldset>
      {error && <p className={"text-red"}>{error}</p>}
    </>
  );
});
