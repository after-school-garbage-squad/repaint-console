import type { ComponentProps } from "react";
import { forwardRef } from "react";

type EventCreateFormInputProps = {
  label: string;
  error?: string;
} & ComponentProps<"input">;

export const EventEditFormInput = forwardRef<
  HTMLInputElement,
  EventCreateFormInputProps
>(({ label, error, defaultValue, ...rest }, ref) => {
  return (
    <fieldset>
      <label htmlFor="name" className={"text-base text-zinc-700 "}>
        {label}
      </label>
      <input
        ref={ref}
        id="name"
        type="text"
        className={
          "w-full rounded-lg border-2 border-deepBlue bg-white bg-none p-1 text-lg disabled:border-none"
        }
        disabled
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <p className={"text-red"}>{error}</p>}
    </fieldset>
  );
});
