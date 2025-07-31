"use client";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useGetAllQuotes from "@/hooks/useGetAllQuotes";
import { Quote } from "@/types/globals";

export default function Page() {
  const { data: allQuotes } = useGetAllQuotes();

  const quotesArray = Array.isArray(allQuotes) ? allQuotes : [];

  const mappedQuotes = quotesArray.map((q: Quote, idx: number) => ({
    id: q.id,
    title: q.text,
    author: q.author,
    type: q.category,
    status: q.status ?? "pending",
    progress: 100,
    likes: q.total_likes ?? 0,
  }));

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
