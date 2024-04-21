import React from 'react';
import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurency } from '@/lib/utils';

interface SalesSummaryProps {
    title: string;
    total: number;
    percent: number;
}

export const SalesSummary = ({ title, percent, total }: SalesSummaryProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatCurency(total)}</div>
                <p className="text-xs text-muted-foreground">+{percent}% from last month</p>
            </CardContent>
        </Card>
    );
};
