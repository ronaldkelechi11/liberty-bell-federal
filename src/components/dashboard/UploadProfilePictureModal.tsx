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
import { Label } from "@/components/ui/label";
import { profileService } from "@/api/profile";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, Loader2 } from "lucide-react";

interface UploadProfilePictureModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const UploadProfilePictureModal = ({ isOpen, onOpenChange }: UploadProfilePictureModalProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const uploadMutation = useMutation({
        mutationFn: (file: File) => profileService.uploadProfilePicture(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast({
                title: "Success",
                description: "Profile picture updated successfully.",
            });
            onOpenChange(false);
            resetForm();
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: error.message || "Failed to upload profile picture",
                variant: "destructive",
            });
        }
    });

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
        console.log(selectedFile);

        uploadMutation.mutate(selectedFile);
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
                            disabled={uploadMutation.isPending || !selectedFile}
                        >
                            {uploadMutation.isPending ? (
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
