import { getMessages } from "@/lib/data";

export const metadata = {
  title: "Messages | Admin",
};

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
      </div>

      <div className="rounded-md border bg-card text-card-foreground shadow-sm">
        <div className="w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b [&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[20%]">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[25%]">Email</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[10%]">Budget</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[30%]">Message</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[15%]">Date</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No messages found.
                  </td>
                </tr>
              ) : (
                messages.map((msg: any) => (
                  <tr key={msg._id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{msg.name}</td>
                    <td className="p-4 align-middle">
                      <a href={`mailto:${msg.email}`} className="text-primary hover:underline">{msg.email}</a>
                    </td>
                    <td className="p-4 align-middle">{msg.budget || 'N/A'}</td>
                    <td className="p-4 align-middle">
                      <p className="line-clamp-2 text-muted-foreground" title={msg.message}>
                        {msg.message}
                      </p>
                    </td>
                    <td className="p-4 align-middle text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
