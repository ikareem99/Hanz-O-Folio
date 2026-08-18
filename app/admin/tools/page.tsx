import { getTools } from '@/lib/data';
import ToolClient from './ToolClient';

export default async function AdminToolsPage() {
  const tools = await getTools();

  return (
    <ToolClient tools={tools} />
  );
}
