import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export function SidebarMenuLink({ icon: Icon, children, href }: { icon: React.ElementType; children: React.ReactNode; href: string }) {
    return (
        <Link href={href} className={cn('flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-muted/30 rounded-md')}>
            <Icon className="w-4 h-4" />
            <span>{children}</span>
        </Link>
    );
}