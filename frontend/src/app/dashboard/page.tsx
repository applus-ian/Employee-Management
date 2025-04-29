'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SidebarProvider } from '@/components/ui/sidebar';

const data = [
  { name: 'IT', employees: 8 },
  { name: 'Finance', employees: 10 },
  { name: 'HR', employees: 6 },
  { name: 'Engineering', employees: 20 },
  { name: 'Sales', employees: 6 },
];

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <main className="flex flex-col flex-1 p-6 gap-6 bg-muted/40 bg-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Left: 4 Summary Cards in 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-2">
            {/* Active Employees */}
            <Card className="rounded-3xl bg-white border-none">
              <CardHeader className="relative">
                <CardDescription>Active Employee</CardDescription>
                <CardTitle className="text-3xl sm:text-5xl font-semibold tabular-nums">50</CardTitle>
                <div className="absolute right-4 top-4">
                  <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                    <TrendingUpIcon className="size-3" /> +12.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  +5 new active employees this month <TrendingUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">Retention rate: 92%</div>
              </CardFooter>
            </Card>

            {/* Inactive Employees */}
            <Card className="rounded-3xl bg-white border-none">
              <CardHeader className="relative">
                <CardDescription>Inactive Employee</CardDescription>
                <CardTitle className="text-3xl sm:text-5xl font-semibold tabular-nums">10</CardTitle>
                <div className="absolute right-4 top-4">
                  <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                    <TrendingDownIcon className="size-3" /> -20%
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  20% decrease due to seasonal attrition <TrendingDownIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">Focus on retention: Target 15% improvement</div>
              </CardFooter>
            </Card>

            {/* Total Employees */}
            <Card className="rounded-3xl bg-white border-none">
              <CardHeader className="relative">
                <CardDescription>Total Employee</CardDescription>
                <CardTitle className="text-3xl sm:text-5xl font-semibold tabular-nums">60</CardTitle>
                <div className="absolute right-4 top-4">
                  <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                    <TrendingUpIcon className="size-3" /> +12.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Retaining top talent contributes to growth <TrendingUpIcon className="size-4" />
                </div>
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Hiring projected to increase by 15% this quarter
                </div>
              </CardFooter>
            </Card>

            {/* Offices */}
            <Card className="rounded-3xl bg-white border-none">
              <CardHeader className="relative">
                <CardDescription>Offices</CardDescription>
                <CardTitle className="text-3xl sm:text-5xl font-semibold tabular-nums">5</CardTitle>
                <div className="absolute right-4 top-4">
                  <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                    <TrendingUpIcon className="size-3" /> +4.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  New offices planned in Europe and Asia next quarter
                </div>
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Efficient office spaces boosting employee collaboration
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Right: Employees by Department Chart */}
          <div className="flex items-stretch w-full">
            <Card className="w-full h-full rounded-2xl bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Employees by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="employees" fill="#6366F1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
