import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface ConfirmModalProps {
    handleConfirm: () => void;
    title?: string;
    description?: string;
    buttonType: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'primary';
    buttonName: string;
    isShow?: boolean;
    trigger?: boolean;
    handleClose?: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    description,
    handleConfirm,
    title,
    buttonType,
    buttonName,
    isShow,
    trigger = true,
    handleClose,
}) => {
    return (
        <AlertDialog open={isShow}>
            {trigger && (
                <AlertDialogTrigger asChild>
                    <Button variant={buttonType}>{buttonName}</Button>
                </AlertDialogTrigger>
            )}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
