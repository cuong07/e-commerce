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
import Link from "next/link";

export const ErrorModal = () => {
  const { isOpen, data, onClose, type } = useModalStore();
  const isModalOpen = isOpen && type === "error";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6 flex flex-col items-center">
          <DialogTitle className="text-2xl text-center font-bold">
            ERROR {data.code}
          </DialogTitle>
          {data.code === 403 && (
            <div className="flex flex-col gap-2 justify-center">
              <p className="text-2xl text-center font-bold">
                Your're not authenticated
              </p>
              <Button className="max-w-max text-center mx-auto" variant="link">
                <Link href="/sign-in">please go back login page</Link>
              </Button>
            </div>
          )}
          <DialogDescription className="text-center text-lg text-red-500 min-h-[60px]">
            {data.message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 p-2">
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
