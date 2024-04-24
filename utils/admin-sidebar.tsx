import { BaggageClaim, DollarSign, LayoutDashboard, ListIcon, ShoppingCart, TrendingUp, Users } from 'lucide-react';

export const adminSidebar = [
    {
        name: 'Dashboard',
        icon: <LayoutDashboard size={20} />,
        link: '',
        sub: [
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
        ],
    },
    {
        name: 'Statistics',
        icon: <TrendingUp size={20} />,
        link: 'statistic',
        sub: [
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
        ],
    },
    {
        name: 'Payment',
        icon: <DollarSign size={20} />,
        link: 'payment',
        sub: [
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
        ],
    },
    {
        name: 'Product',
        icon: <BaggageClaim size={20} />,
        link: 'product',
        sub: [
            {
                name: 'Add product',
                icon: <LayoutDashboard size={18} />,
                link: 'product',
            },
            {
                name: 'Listings',
                icon: <ListIcon size={18} />,
                link: 'product/listings',
            },
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
        ],
    },
    {
        name: 'Order',
        icon: <ShoppingCart size={20} />,
        link: 'order',
        sub: [
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
        ],
    },
    {
        name: 'User',
        icon: <Users size={20} />,
        link: 'user',
        sub: [
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
            {
                name: 'Dashboard',
                icon: <LayoutDashboard size={18} />,
                link: '',
            },
        ],
    },
];
