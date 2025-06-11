import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { BookOpen, Calendar, CalendarCheck, LayoutGrid, Users } from 'lucide-react';
import { SidebarMenuLink } from './ui/sidebar-menu-link';
import AppLogo from './app-logo';

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

             <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuLink icon={LayoutGrid} href="/dashboard">
                            Dashboard
                        </SidebarMenuLink>
                    </SidebarMenuItem>

                    <SidebarGroupLabel>Master Data</SidebarGroupLabel>
                    <SidebarMenuItem>
                        <SidebarMenuLink icon={Users} href="/anggota">
                            Anggota
                        </SidebarMenuLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuLink icon={BookOpen} href="/buku">
                            Buku
                        </SidebarMenuLink>
                    </SidebarMenuItem>

                    <SidebarGroupLabel>Transaksi</SidebarGroupLabel>
                    <SidebarMenuItem>
                        <SidebarMenuLink icon={Calendar} href="/peminjaman">
                            Peminjaman
                        </SidebarMenuLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuLink icon={CalendarCheck} href="/pengembalian">
                            Pengembalian
                        </SidebarMenuLink>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
