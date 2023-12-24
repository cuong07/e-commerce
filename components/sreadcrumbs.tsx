import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Slash, Tally1 } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    path: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const pathName = usePathname();

    const breadcrumbs = useMemo(() => {
        const pathArray = pathName.split('/').filter(Boolean);
        return pathArray.map((_, index) => {
            const path = `/${pathArray.slice(0, index + 1).join('/')}`;
            const label = items[index]?.label || path;
            return { label, path };
        });
    }, [pathName, items]);

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex ">
                <li className="flex ">
                    <Link href="/" className=" flex text-slate-500">
                        Home
                    </Link>
                    <span className="text-base mx-2 text-center">/</span>
                </li>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className="flex">
                        <div className="">
                            {index === breadcrumbs.length - 1 ? (
                                <span className="font-semibold">{breadcrumb.label}</span>
                            ) : (
                                <div className="flex text-slate-500">
                                    <Link href={breadcrumb.path} className=" hover:underline ">
                                        {breadcrumb.label}
                                    </Link>
                                    <span className="text-base mx-2 text-center">/</span>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
