/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
    setFiles: any;
    files: any[];
}

export default function ImageUpload({ setFiles, files }: ImageUploadProps) {
    // const [files, setFiles] = useState<any>([]);
    const { toast } = useToast();

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length < 4) {
                toast({
                    description: <span className="flex">You must add more than 4 images</span>,
                    variant: 'destructive',
                });
                return;
            }
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    }),
                ),
            );
        },
    });
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <Card className="overflow-hidden shadow-md">
            <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    {files?.length === 0 && (
                        <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            width="300"
                            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        />
                    )}

                    {files?.length >= 3 && (
                        <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            src={files[0]?.preview}
                            onLoad={() => {
                                URL.revokeObjectURL(files[0].preview);
                            }}
                            width="300"
                        />
                    )}

                    <div className="grid grid-cols-3 gap-2">
                        {files?.length >= 3 &&
                            files.slice(1, 3).map((file: any, index: number) => (
                                <div key={file.name} className="relative">
                                    <Image
                                        alt="Product image"
                                        className="aspect-square w-full rounded-md object-cover"
                                        height="84"
                                        width="84"
                                        src={file?.preview}
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview);
                                        }}
                                    />
                                    {index === 1 && (
                                        <div className="w-full rounded-md flex items-center  justify-center text-white font-bold text-2xl h-full absolute top-0 left-0 bg-zinc-800 bg-opacity-75 z-50">
                                            <div className="text-center">{`+${files.length - 3}`}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        {files?.length === 0 && (
                            <>
                                <Image
                                    alt="Product image"
                                    className="aspect-square w-full rounded-md object-cover"
                                    height="84"
                                    width="84"
                                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                                />
                                <Image
                                    alt="Product image"
                                    className="aspect-square w-full rounded-md object-cover"
                                    height="84"
                                    width="84"
                                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                                />
                            </>
                        )}

                        <button
                            {...getRootProps({
                                className:
                                    'flex aspect-square w-full items-center justify-center rounded-md border border-dashed',
                            })}
                        >
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <input {...getInputProps()} />
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
