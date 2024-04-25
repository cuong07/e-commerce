'use client';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Textarea } from '../ui/textarea';

interface IInputArea {
    control: any;
    name: string;
    label: string;
}

export const InputArea: React.FC<IInputArea> = ({ control, name, label }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="flex flex-col gap-2">
                            <FormLabel>{label}</FormLabel>
                            <Textarea {...field} className="min-h-32" />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
