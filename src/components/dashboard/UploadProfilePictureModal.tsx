import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profileService } from "@/api/profile";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Loader2 } from "lucide-react";

interface UploadProfilePictureModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const UploadProfilePictureModal = ({ isOpen, onOpenChange }: UploadProfilePictureModalProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const { toast } = useToast();

    const handleUpload = async (file: File) => {
        setIsPending(true);
        try {
            await profileService.uploadProfilePicture(file);
            toast({
                title: "Success",
                description: "Profile picture updated successfully.",
            });
            onOpenChange(false);
            resetForm();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to upload profile picture",
                variant: "destructive",
            });
        } finally {
            setIsPending(false);
        }
    };

    const resetForm = () => {
        setSelectedFile(null);
        setPreview(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            toast({
                title: "Error",
                description: "Please select a file to upload",
                variant: "destructive",
            });
            return;
        }
        handleUpload(selectedFile);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle>Upload Profile Picture</DialogTitle>
                    <DialogDescription>
                        Choose an image to use as your profile picture. Recommended size: 400x400px
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center space-y-4 hover:border-primary/50 transition-colors">
                            {preview ? (
                                <div className="flex flex-col items-center gap-4">
                                    <img src={preview} alt="Preview" className="w-32 h-32 rounded-full object-cover" />
                                    <p className="text-sm font-medium text-foreground">{selectedFile?.name}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <Upload className="w-8 h-8 text-muted-foreground" />
                                    <p className="text-sm font-medium">Drag and drop or click to select</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-input"
                            />
                            <label htmlFor="file-input" className="cursor-pointer inline-block">
                                <Button type="button" variant="outline" size="sm" className="rounded-lg" asChild>
                                    <span>Choose File</span>
                                </Button>
                            </label>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                onOpenChange(false);
                                resetForm();
                            }}
                            className="rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-xl"
                            disabled={isPending || !selectedFile}
                        >
                            {isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : null}
                            Upload Picture
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UploadProfilePictureModal;
