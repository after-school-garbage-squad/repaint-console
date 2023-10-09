import * as Dialog from "@radix-ui/react-alert-dialog";

type AlertDialogProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  onOpenChange?: () => void;
  open?: boolean;
};

export const AlertDialog: React.FC<AlertDialogProps> = ({
  trigger,
  children,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black opacity-30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[320px] w-[90%] max-w-sm  -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-4 pb-4 pt-8 shadow-lg md:w-full md:max-w-2xl">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
