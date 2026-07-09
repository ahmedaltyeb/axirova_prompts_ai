import { requireUser } from "@/lib/auth/get-current-user";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar fullName={user.fullName} email={user.email} />
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
