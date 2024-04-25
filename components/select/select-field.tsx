'use client';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ISelectField {
    control: any;
    name: string;
    label: string;
    data: any[];
}

export const SelectField: React.FC<ISelectField> = ({ control, name, label, data }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="flex flex-col gap-2">
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder={`Select ${label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {data?.map((item) => (
                                        <SelectItem value={item.name} key={item.id}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
