import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Briefcase, Wrench, FileText, LogOut } from 'lucide-react';
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
      <aside className="w-full lg:w-64 border-r border-border bg-card">
        <div className="flex h-16 items-center border-b border-border px-6">
          <h2 className="text-lg font-bold text-card-foreground">Portfolio Admin</h2>
        </div>
        <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LayoutDashboard className="size-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/projects">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <FolderKanban className="size-4" />
                Projects
              </Button>
            </Link>
            <Link href="/admin/experience">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Briefcase className="size-4" />
                Experience
              </Button>
            </Link>
            <Link href="/admin/tools">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Wrench className="size-4" />
                Tools
              </Button>
            </Link>
            <Link href="/admin/posts">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <FileText className="size-4" />
                Blog Posts
              </Button>
            </Link>
          </nav>
          
          <div className="pt-4 border-t border-border">
            <form action={async () => {
              'use server';
              const { logout } = await import('@/actions/auth');
              await logout();
            }}>
              <Button variant="destructive" type="submit" className="w-full justify-start gap-2">
                <LogOut className="size-4" />
                Logout
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
