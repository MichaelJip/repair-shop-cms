import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Car,
    FolderGit2,
    LayoutDashboard,
    ShieldCheck,
    Ticket,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { home } from '@/routes';
import type { NavItem } from '@/types';
import roles from '@/routes/roles';
import vehiclesModel from '@/routes/vehiclesModel';
import customers from '@/routes/customers';
import vehicles from '@/routes/vehicles';
import promos from '@/routes/promos';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: home(),
        icon: LayoutDashboard,
    },
    {
        title: 'Roles',
        href: roles.index(),
        icon: ShieldCheck,
    },
    {
        title: 'Customers',
        href: customers.index(),
        icon: Users,
    },
    {
        title: 'Promos',
        href: promos.index(),
        icon: Ticket,
    },
    {
        title: 'Vehicles',
        href: vehicles.index(),
        icon: Car,
        items: [
            {
                title: 'All Vehicles',
                href: vehicles.index(),
            },
            {
                title: 'Vehicle Models',
                href: vehiclesModel.index(),
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={home()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
