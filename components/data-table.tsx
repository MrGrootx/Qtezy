"use client";

import * as React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconLoader,
} from "@tabler/icons-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { any, z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Check, Eye, Loader, Trash, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const schema = z.object({
  id: any(),
  title: z.string(),
  author: z.string(),
  type: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
  progress: z.number(),
  likes: z.number(),
});

export function DataTable({ data }: { data: z.infer<typeof schema>[] }) {
  const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
      accessorKey: "title",
      header: "Title",
      enableHiding: false,
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => (
        <div className="w-32">
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {row.original.author}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        let icon = null;
        let color: "outline" | "success" | "warning" | "destructive" =
          "outline";
        if (status === "approved") {
          icon = (
            <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
          );
          color = "success";
        } else if (status === "pending") {
          icon = <IconLoader />;
          color = "warning";
        } else if (status === "rejected") {
          icon = <X className="text-red-500" />;
          color = "destructive";
        }
        return (
          <Badge
            variant={color}
            appearance="light"
            className="text-muted-foreground px-1.5 flex items-center gap-1"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "likes",
      header: "Likes",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.likes}</span>
      ),
    },
    {
      id: "actions",
      cell: (data) => (
        <div className="flex items-center gap-2">
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button size="icon" variant="link">
                    <Eye />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>View</TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{data.row.original.title}</DialogTitle>
                <div className="flex items-center gap-2 justify-between">
                  <DialogDescription>
                    {data.row.original.author}
                  </DialogDescription>
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className="text-muted-foreground px-1.5"
                    >
                      {data.row.original.type}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="destructive">
                <Trash />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="default"
                onClick={() => {
                  const id = data.row.original.id.toString();
                  setApprovingId(id);

                  approveQuoteMutation.mutate(id);
                }}
                disabled={approvingId === data.row.original.id.toString()}
              >
                {approvingId === data.row.original.id.toString() ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Check />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Approve</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline">
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reject</TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];
  const [approvingId, setApprovingId] = React.useState<string | null>(null);
  const queryClient = useQueryClient();
  const approveQuoteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.get(`/api/quotes/approve?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    retry: false,
    onSettled: () => {
      setApprovingId(null);
      queryClient.invalidateQueries({ queryKey: ["allquotes"] });
    },
    onSuccess: () => {
      toast.success("Quote approved successfully", {
        description: "The quote has been approved.",
      });
    },
  });

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="flex w-full items-center justify-end gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={`${table.getState().pagination.pageSize}`}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
export default DataTable;
