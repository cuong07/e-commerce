import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

export const ErrorModal = () => {
  const { isOpen, data, onClose, type } = useModalStore();
  const isModalOpen = isOpen && type === "error";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            ERROR {data.code}
          </DialogTitle>
          <DialogDescription className="text-center text-lg text-red-500 min-h-[100px]">
            {data.message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-end w-full">
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
