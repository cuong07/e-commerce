'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import ImageUpload from '../image/image-upload';
import { CategoryData } from '@/type';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InputField } from '@/components/input/input-field';
import { InputArea } from '@/components/input/input-area';
import { SelectField } from '@/components/select/select-field';

interface FormProducProps {
    categories: CategoryData[];
}

const schema = z.object({
    name: z.string().min(10),
    price: z.string(),
    description: z.string().min(10),
    category_id: z.string(),
});

export const FormProduct = ({ categories }: FormProducProps) => {
    const form = useForm<z.infer<typeof schema>>({
        defaultValues: {
            name: '',
            price: '',
            description: '',
        },
        resolver: zodResolver(schema),
        reValidateMode: 'onBlur',
        mode: 'all',
    });

    const onSubmit = (value: z.infer<typeof schema>) => {
        const newValue = {
            ...value,
            category_id: categories.filter((item) => item.name === value.category_id)[0].id,
        };
        console.log(newValue);
    };

    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-end gap-4 mb-4">
                        <Button variant="outline">Discard</Button>
                        <Button variant="submit" type="submit">
                            Save Product
                        </Button>
                    </div>
                    <div className="md:flex-row flex gap-8 flex-col">
                        <div className="w-2/3 flex flex-col gap-8">
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle>Product Details</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <InputField control={form.control} name="name" label="Name" type="text" />
                                        <InputField control={form.control} name="price" label="Price" type="number" />
                                        <InputArea control={form.control} name="description" label="Description" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle>Product Category</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6 sm:grid-cols-3">
                                        <SelectField
                                            data={categories}
                                            name="category_id"
                                            label="Category"
                                            control={form.control}
                                        />
                                        <div className="grid gap-3">
                                            <Label htmlFor="subcategory">Subcategory (optional)</Label>
                                            <Select disabled>
                                                <SelectTrigger id="subcategory" aria-label="Select subcategory">
                                                    <SelectValue placeholder="Select subcategory" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="t-shirts">T-Shirts</SelectItem>
                                                    <SelectItem value="hoodies">Hoodies</SelectItem>
                                                    <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="status">Status</Label>
                                            <Select disabled>
                                                <SelectTrigger id="status" aria-label="Select status ">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="published">Active</SelectItem>
                                                    <SelectItem value="archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <ImageUpload />
                            <ImageUpload />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
