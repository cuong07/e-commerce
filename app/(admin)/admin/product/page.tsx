import { FormProduct } from '@/components/admin/form/form-product';
import ImageUpload from '@/components/admin/image/image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getCategories } from '@/lib/api/category';
import { CategoryData } from '@/type';
import React from 'react';

async function getCategory() {
    const categories = await getCategories({ page: 0, limit: 1000 });
    return categories.content as CategoryData[];
}

const ProductAdminPage = async () => {
    const categories: CategoryData[] = await getCategory();

    return (
        <div className="flex flex-col">
            <FormProduct categories={categories} />
        </div>
    );
};

export default ProductAdminPage;
