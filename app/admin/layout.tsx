import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Briefcase, Wrench, FileText, MessageSquare, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Admin Dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-background">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 border-b lg:border-r lg:border-b-0 border-border bg-card flex flex-col">
        <div className="flex h-16 items-center border-b border-border px-6 shrink-0">
          <h2 className="text-lg font-bold text-card-foreground">Portfolio Admin</h2>
        </div>
        <div className="flex flex-col justify-between h-auto lg:h-[calc(100vh-4rem)] p-4 gap-4">
          <nav className="flex flex-wrap gap-2 lg:flex-col lg:space-y-2 lg:gap-0">
            <Link href="/admin" className="flex-1 lg:flex-none">
              <Button variant="ghost" className="w-full justify-start gap-2 whitespace-nowrap">
                <LayoutDashboard className="size-4 shrink-0" />
                <span className="hidden sm:inline lg:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/admin/projects" className="flex-1 lg:flex-none">
              <Button variant="ghost" className="w-full justify-start gap-2 whitespace-nowrap">
                <FolderKanban className="size-4 shrink-0" />
                <span className="hidden sm:inline lg:inline">Projects</span>
              </Button>
            </Link>
            <Link href="/admin/experience" className="flex-1 lg:flex-none">
              <Button variant="ghost" className="w-full justify-start gap-2 whitespace-nowrap">
                <Briefcase className="size-4 shrink-0" />
                <span className="hidden sm:inline lg:inline">Experience</span>
              </Button>
            </Link>
            <Link href="/admin/tools" className="flex-1 lg:flex-none">
              <Button variant="ghost" className="w-full justify-start gap-2 whitespace-nowrap">
                <Wrench className="size-4 shrink-0" />
                <span className="hidden sm:inline lg:inline">Tools</span>
              </Button>
            </Link>
            <Link href="/admin/posts" className="flex-1 lg:flex-none">
              <Button variant="ghost" className="w-full justify-start gap-2 whitespace-nowrap">
                <FileText className="size-4 shrink-0" />
                <span className="hidden sm:inline lg:inline">Blog Posts</span>
              </Button>
            </Link>
            <Link href="/admin/messages" className="flex-1 lg:flex-none">
              <Button variant="ghost" className="w-full justify-start gap-2 whitespace-nowrap">
                <MessageSquare className="size-4 shrink-0" />
                <span className="hidden sm:inline lg:inline">Messages</span>
              </Button>
            </Link>
          </nav>
          
          <div className="pt-4 border-t border-border mt-auto">
            <form action={async () => {
              'use server';
              const { logout } = await import('@/actions/auth');
              await logout();
            }}>
              <Button variant="destructive" type="submit" className="w-full justify-start gap-2">
                <LogOut className="size-4 shrink-0" />
                <span className="hidden sm:inline lg:inline">Logout</span>
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
