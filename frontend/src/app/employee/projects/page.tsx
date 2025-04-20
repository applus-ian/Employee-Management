'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function ProjectsPage() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <div className="ml-0 lg:ml-[15rem] px-4 sm:px-6 py-6 bg-muted/40">
          <div className="max-w-[100rem] mx-auto space-y-6 w-full">
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2">
              <Separator orientation="vertical" className=" h-4" />
              <div>
                <h1 className="text-3xl font-semibold leading-none">Projects</h1>
                <p className="text-muted-foreground text-sm mt-2 text-gray-500">Setup and manage projects</p>
              </div>
            </header>
            <div className="border-b border-gray-300">
              <div className="text-sm text-orange-600 font-semibold border-b-2 border-orange-500 inline-block px-2 py-1">
                Projects
              </div>
            </div>

            {/* Main Card */}
            <Card className="w-full rounded-2xl border bg-white shadow-sm">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold text-gray-800">Projects</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Filters + Search */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Start Date
                    </Button>
                    <Button variant="outline" size="sm">
                      End Date
                    </Button>
                    <Button variant="outline" size="sm">
                      Employees
                    </Button>
                  </div>
                  <Button variant="outline" className="text-orange-600 border-orange-400 bg-white">
                    New Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                    >
                      <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
                    </svg>
                  </Button>
                </div>

                {/* Show entries + Search bar */}
                <div className="flex items-center gap-2">
                  <label htmlFor="entries" className="text-sm text-muted-foreground">
                    Show
                  </label>
                  <select id="entries" className="border rounded-md px-2 py-1 text-sm">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span className="text-sm text-muted-foreground">entries</span>
                  <Input type="text" placeholder="Search..." className="max-w-full" />
                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>No. of Employees Assigned</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: '#5437',
                          name: 'Pipeline Optimization',
                          desc: 'Enhance pipeline flow...',
                          start: '2025-04-10',
                          end: '2025-05-20',
                          count: 5,
                        },
                        {
                          id: '#5643',
                          name: 'DataStream Integrator',
                          desc: 'Integrate data pipelines...',
                          start: '2025-04-15',
                          end: '2025-06-01',
                          count: 3,
                        },
                        {
                          id: '#5684',
                          name: 'Flow Architecture',
                          desc: 'Design data flow systems...',
                          start: '2025-04-12',
                          end: '2025-05-25',
                          count: 4,
                        },
                        {
                          id: '#4363',
                          name: 'ETL Process Upgrade',
                          desc: 'Improve ETL efficiency...',
                          start: '2025-04-18',
                          end: '2025-06-05',
                          count: 8,
                        },
                      ].map((proj, idx) => (
                        <TableRow key={idx} className="even:bg-[#F7F6FE]">
                          <TableCell>{proj.id}</TableCell>
                          <TableCell>{proj.name}</TableCell>
                          <TableCell>{proj.desc}</TableCell>
                          <TableCell>{proj.start}</TableCell>
                          <TableCell>{proj.end}</TableCell>
                          <TableCell>{proj.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center pt-4 text-sm text-muted-foreground">
                  <div>Previous</div>
                  <div className="flex items-center gap-1">
                    <Badge className="bg-orange-600 text-white px-3 py-1">1</Badge>
                    <Button variant="ghost" size="sm">
                      2
                    </Button>
                    <Button variant="ghost" size="sm">
                      3
                    </Button>
                  </div>
                  <div>Next</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
