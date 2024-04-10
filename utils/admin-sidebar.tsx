import { BaggageClaim, DollarSign, LayoutDashboard, ShoppingCart, TrendingUp, Users } from 'lucide-react';

export const AdminSidebar = [
    {
        name: 'Dashboard',
        icon: <LayoutDashboard />,
        link: '',
    },
    {
        name: 'Statistics',
        icon: <TrendingUp />,
        link: 'statistic',
    },
    {
        name: 'Payment',
        icon: <DollarSign />,
        link: 'payment',
    },
    {
        name: 'Product',
        icon: <BaggageClaim />,
        link: 'product',
    },
    {
        name: 'Order',
        icon: <ShoppingCart />,
        link: 'order',
    },
    {
        name: 'User',
        icon: <Users />,
        link: 'user',
    },
];
