import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { mockQuotes } from "@/datas/quotesMockdata";
import { Quote } from "@/types/globals";

const mappedQuotes = mockQuotes.map((q: Quote, idx) => ({
  id: idx + 1,
  title: q.text,
  author: q.author,
  type: q.category,
  status: q.status ?? "pending",  
  progress: 100,
  likes: q.total_likes ?? 0,
}));

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      className="container mx-auto px-2 lg:px-8 min-h-screen"
    >
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <DataTable data={mappedQuotes} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
