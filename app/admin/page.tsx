import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Tool from '@/models/Tool';
import Post from '@/models/Post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, Briefcase, Wrench, FileText } from 'lucide-react';

export default async function AdminDashboardPage() {
  await connectToDatabase();

  const projectCount = await Project.countDocuments();
  const experienceCount = await Experience.countDocuments();
  const toolCount = await Tool.countDocuments();
  const postCount = await Post.countDocuments();

  const stats = [
    { name: 'Total Projects', value: projectCount, icon: FolderKanban },
    { name: 'Total Experience', value: experienceCount, icon: Briefcase },
    { name: 'Total Tools', value: toolCount, icon: Wrench },
    { name: 'Total Blog Posts', value: postCount, icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your portfolio admin dashboard. Here is a summary of your content.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
