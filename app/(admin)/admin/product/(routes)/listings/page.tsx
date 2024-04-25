'use client';

import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getProducts } from '@/lib/api/products';
import { ProductData } from '@/type';
import { useModalStore } from '@/hooks/use-modal-store';
import { useRouter } from 'next/navigation';
import useProductStore from '@/hooks/use-product-store';
import { useEffect } from 'react';
import moment from 'moment';
import { formatCurency } from '@/lib/utils';

export default function ProductListingPage() {
    const router = useRouter();
    const { pagination, productsData, totalPage, isLoading, nextPage, setFetching, getListProduct } = useProductStore();
    const { onOpen } = useModalStore();

    useEffect(() => {
        (async () => {
            try {
                const { page, limit } = pagination;
                const response = await getProducts({ page, limit });
                getListProduct(response?.data?.data);
                setFetching(false);
            } catch (error: any) {
                setFetching(false);
                console.log('Error fetching products:', error);
                if (error.response) {
                    onOpen('error', {
                        message: error.response.data,
                        code: error.response.status,
                    });
                } else {
                    onOpen('error', {
                        message: error.message,
                        code: error.code,
                    });
                }
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination]);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>Manage your products and view their sales performance.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="hidden md:table-cell">Total Sales</TableHead>
                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productsData?.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="hidden sm:table-cell">
                                    <Image
                                        alt="Product image"
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        src={process.env.NEXT_PUBLIC_BASE_URL + product.thumbnail}
                                        width="64"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{product.price}</Badge>
                                </TableCell>
                                <TableCell>{formatCurency(product.price)}</TableCell>
                                <TableCell className="hidden md:table-cell">25</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {moment(product.createdAt).format('LL')}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
            </CardFooter>
        </Card>
    );
}
