'use client';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const employeeGrowth = [
  { month: 'Jan', employees: 120 },
  { month: 'Feb', employees: 140 },
  { month: 'Mar', employees: 160 },
  { month: 'Apr', employees: 190 },
];

const lifecycleStatus = [
  { status: 'Active', value: 100 },
  { status: 'Onboarding', value: 40 },
  { status: 'Exited', value: 20 },
];

const employees = [
  {
    id: 1,
    name: 'John Doe',
    department: 'Engineering',
    role: 'Developer',
    lineManager: 'Alice Nguyen',
    office: 'New York',
  },
  {
    id: 2,
    name: 'Jane Smith',
    department: 'HR',
    role: 'Manager',
    lineManager: 'Robert Brown',
    office: 'San Francisco',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    department: 'Sales',
    role: 'Sales Executive',
    lineManager: 'Sara Khan',
    office: 'Chicago',
  },
  {
    id: 4,
    name: 'Alice Brown',
    department: 'Engineering',
    role: 'Frontend Engineer',
    lineManager: 'David Lee',
    office: 'New York',
  },
  {
    id: 5,
    name: 'Michael Lee',
    department: 'Marketing',
    role: 'Marketing Coordinator',
    lineManager: 'Emily Davis',
    office: 'Boston',
  },
  {
    id: 6,
    name: 'Emma Davis',
    department: 'Design',
    role: 'UI/UX Designer',
    lineManager: 'Karen Blake',
    office: 'Austin',
  },
  {
    id: 7,
    name: 'Chris Wilson',
    department: 'Engineering',
    role: 'Backend Engineer',
    lineManager: 'Alice Nguyen',
    office: 'Seattle',
  },
  {
    id: 8,
    name: 'Olivia Garcia',
    department: 'Finance',
    role: 'Accountant',
    lineManager: 'Laura Scott',
    office: 'Chicago',
  },
  {
    id: 9,
    name: 'Daniel Martinez',
    department: 'Support',
    role: 'Support Specialist',
    lineManager: 'Tom Hanks',
    office: 'San Diego',
  },
  {
    id: 10,
    name: 'Sophia Lopez',
    department: 'Engineering',
    role: 'DevOps Engineer',
    lineManager: 'David Lee',
    office: 'New York',
  },
];
const roleDistribution = [
  { name: 'Developers', value: 12 },
  { name: 'Graphic Designer', value: 6 },
  { name: 'Digital Marketing', value: 4 },
];

const departmentData = [
  { department: 'Engineering', count: 20 },
  { department: 'Design', count: 10 },
  { department: 'Marketing', count: 8 },
];

const skillsData = [
  { skill: 'React', level: 90 },
  { skill: 'Figma', level: 70 },
  { skill: 'SEO', level: 60 },
  { skill: 'Next.js', level: 80 },
  { skill: 'Illustrator', level: 50 },
];

export default function Page() {
  return (
    <main className="flex flex-col flex-1 p-6 gap-6 bg-muted/40 bg-slate-100">
      {/* Horizontal Summary Cards */}
      <div className="flex flex-row gap-4  pb-1 snap-x snap-mandatory">
        {/* Active Employees */}
        <Card className="min-w-[250px] h-[200px] snap-start relative rounded-xl bg-white border-none overflow-hidden shadow-md">
          <CardHeader className="relative z-10">
            <CardDescription>Active Employee</CardDescription>
            <CardTitle className="text-3xl sm:text-5xl font-semibold tabular-nums">50</CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" /> +12.5%
              </Badge>
            </div>
          </CardHeader>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-32 h-32 bg-orange-100 rounded-full absolute -right-12 -top-12" />
            <div className="w-24 h-24 bg-orange-200 rounded-full absolute -right-8 -top-8" />
            <div className="w-16 h-16 bg-orange-300 rounded-full absolute -right-4 -top-4" />
          </div>
          <CardFooter className="flex-col items-start gap-1 text-xs z-10">
            <div className="line-clamp-1 flex gap-2 font-medium">
              +5 new active employees this month <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Retention rate: 92%</div>
          </CardFooter>
        </Card>

        {/* Inactive Employees */}
        <Card className="min-w-[250px] h-[200px] snap-start relative rounded-xl bg-white border-none overflow-hidden shadow-md">
          <CardHeader className="relative z-10">
            <CardDescription>Inactive Employee</CardDescription>
            <CardTitle className="text-3xl sm:text-5xl font-semibold tabular-nums">10</CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingDownIcon className="size-3" /> -20%
              </Badge>
            </div>
          </CardHeader>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-32 h-32 bg-orange-100 rounded-full absolute -right-12 -top-12" />
            <div className="w-24 h-24 bg-orange-200 rounded-full absolute -right-8 -top-8" />
            <div className="w-16 h-16 bg-orange-300 rounded-full absolute -right-4 -top-4" />
          </div>
          <CardFooter className="flex-col items-start gap-1 text-xs z-10">
            <div className="line-clamp-1 flex gap-2 font-medium">
              20% decrease due to seasonal attrition <TrendingDownIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Focus on retention: Target 15% improvement</div>
          </CardFooter>
        </Card>

        {/* Total Employees */}
        <Card className="min-w-[250px] h-[200px] snap-start relative rounded-xl bg-white border-none overflow-hidden shadow-md">
          <CardHeader className="relative z-10">
            <CardDescription>Total Employee</CardDescription>
            <CardTitle className="text-3xl sm:text-5xl font-semibold tabular-nums">60</CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" /> +12.5%
              </Badge>
            </div>
          </CardHeader>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-32 h-32 bg-orange-100 rounded-full absolute -right-12 -top-12" />
            <div className="w-24 h-24 bg-orange-200 rounded-full absolute -right-8 -top-8" />
            <div className="w-16 h-16 bg-orange-300 rounded-full absolute -right-4 -top-4" />
          </div>
          <CardFooter className="flex-col items-start gap-1 text-xs z-10">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Retaining top talent contributes to growth <TrendingUpIcon className="size-4" />
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium">Hiring projected to increase by 15% this quarter</div>
          </CardFooter>
        </Card>

        {/* Offices */}
        <Card className="min-w-[250px] h-[200px] snap-start relative rounded-xl bg-white border-none overflow-hidden shadow-md">
          <CardHeader className="relative z-10">
            <CardDescription>Offices</CardDescription>
            <CardTitle className="text-3xl sm:text-5xl font-semibold tabular-nums">5</CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" /> +4.5%
              </Badge>
            </div>
          </CardHeader>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-32 h-32 bg-orange-100 rounded-full absolute -right-12 -top-12" />
            <div className="w-24 h-24 bg-orange-200 rounded-full absolute -right-8 -top-8" />
            <div className="w-16 h-16 bg-orange-300 rounded-full absolute -right-4 -top-4" />
          </div>
          <CardFooter className="flex-col items-start gap-1 text-xs z-10">
            <div className="line-clamp-1 flex gap-2 font-medium">
              New offices planned in Europe and Asia next quarter
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Efficient office spaces boosting employee collaboration
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-full">
        {/* Left side: Post + Comments */}
        <div className="w-full md:w-[515px] flex flex-col gap-6">
          {/* Post Section */}
          <Card className="rounded-xl shadow-md bg-white p-4 flex flex-col gap-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/75.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-800 leading-tight">Christian Bale</h4>
                <p className="text-xs text-muted-foreground">@imbatman</p>
              </div>
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="How good was your day?"
              className="w-full border-none border-gray-300 rounded-md px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />

            {/* Post Button */}
            <div className="flex justify-end">
              <Button className="bg-slate-700 text-white text-xs px-4 py-1 rounded-md">POST</Button>
            </div>
          </Card>

          {/* Scrollable Comments Section */}
          <Card className="rounded-xl shadow-md bg-white p-4">
            <div className="flex flex-col gap-4 max-h-[310px] overflow-y-auto pr-2">
              {[
                {
                  text: `Just completed the annual compliance training! ❤️❤️❤️
Learned a lot about new safety protocols and data handling.
Shoutout to the HR team for organizing it!`,
                  time: '11:13 PM · Sep 1, 2022',
                  likes: 8,
                  replies: 3,
                },
                {
                  text: `Wrapped up a big product demo today. Super proud of the team! 💪🚀
Clients seemed really impressed.`,
                  time: '3:45 PM · Sep 2, 2022',
                  likes: 15,
                  replies: 6,
                },
                {
                  text: `Enjoyed a peaceful walk in the park this evening. 🌇🍃
Sometimes, a little break makes all the difference.`,
                  time: '7:22 PM · Sep 3, 2022',
                  likes: 5,
                  replies: 1,
                },
                {
                  text: `Presented our quarterly report to leadership. Went better than expected! 📊👏`,
                  time: '10:05 AM · Sep 4, 2022',
                  likes: 12,
                  replies: 4,
                },
              ].map((post, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 text-sm text-slate-800 shadow-sm">
                  {/* Comment Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src="https://randomuser.me/api/portraits/men/85.jpg"
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm">Christian Bale</div>
                      <div className="text-xs text-muted-foreground">@imbatman</div>
                    </div>
                  </div>

                  {/* Comment Text */}
                  <p className="text-sm leading-snug mb-2 whitespace-pre-line">{post.text}</p>

                  {/* Timestamp and Reactions */}
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>{post.time}</span>
                    <span className="flex gap-4">
                      <span>{post.likes} ❤️</span>
                      <span>{post.replies} 💬</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          {/* Horizontal Birthday Cards */}
          <div className="w-full md:w-[500px] overflow-x-auto hide-scrollbar">
            <div className="flex flex-row gap-2 snap-x snap-mandatory px-1">
              {[
                {
                  name: 'Chuchu',
                  username: '@chuchu',
                  img: 'https://randomuser.me/api/portraits/men/32.jpg',
                  message: 'Wishing you a day filled with love, joy, and cake! 🎂',
                  quote: '"Count your life by smiles, not tears. Count your age by friends, not years."',
                },
                {
                  name: 'Anna',
                  username: '@anna123',
                  img: 'https://randomuser.me/api/portraits/women/45.jpg',
                  message: 'Hope your birthday is as amazing as you are! 🎉',
                  quote: '"Make a wish and let the celebration begin!"',
                },
                {
                  name: 'Mike',
                  username: '@mike_dev',
                  img: 'https://randomuser.me/api/portraits/men/12.jpg',
                  message: 'Have a fantastic birthday full of fun and laughter! 🎈',
                  quote: '"Life’s too short not to party on your birthday!"',
                },
                {
                  name: 'Sara',
                  username: '@sara_b',
                  img: 'https://randomuser.me/api/portraits/women/56.jpg',
                  message: 'Cheers to another year of awesomeness! 🥳',
                  quote: '"Another year older, another year bolder!"',
                },
              ].map((birthday, index) => (
                <Card
                  key={index}
                  className="min-w-[260px] md:w-[280px] rounded-xl p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-300 shadow-inner snap-start relative overflow-hidden"
                >
                  {/* Confetti dots */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-yellow-300 rounded-full animate-pulse delay-200"></div>

                  <CardHeader className="flex items-center gap-4 mb-4 p-0">
                    <img
                      src={birthday.img}
                      alt={birthday.name}
                      className="w-16 h-16 rounded-full border-4 border-yellow-400 shadow-md"
                    />
                    <div>
                      <CardTitle className="text-xl font-bold text-yellow-800">
                        🎉 Happy Birthday, {birthday.name}!
                      </CardTitle>
                      <CardDescription className="text-sm text-yellow-700">{birthday.username}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="text-yellow-800 text-sm font-medium italic pl-1 p-0 space-y-2">
                    <p>{birthday.message}</p>
                    <p className="text-yellow-600 text-xs italic">{birthday.quote}</p>
                  </CardContent>

                  <button
                    className="mt-4 w-full py-2 text-yellow-700 border border-yellow-700 rounded-md hover:bg-yellow-100 transition"
                    onClick={() => alert(`Send your birthday wishes to ${birthday.name}! 🎉`)}
                    aria-label={`Send birthday wish to ${birthday.name}`}
                  >
                    Send a Birthday Wish
                  </button>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Birthdays This Month Grid */}
          <div className="mt-6 px-1">
            <h3 className="text-lg font-semibold text-slate-700 mb-3">🎂 Upcoming Birthdays This Month</h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  name: 'Zack',
                  date: 'May 21',
                  img: 'https://randomuser.me/api/portraits/men/48.jpg',
                },
                {
                  name: 'Emily',
                  date: 'May 24',
                  img: 'https://randomuser.me/api/portraits/women/64.jpg',
                },
                {
                  name: 'Leo',
                  date: 'May 27',
                  img: 'https://randomuser.me/api/portraits/men/23.jpg',
                },
                {
                  name: 'Tina',
                  date: 'May 30',
                  img: 'https://randomuser.me/api/portraits/women/19.jpg',
                },
              ].map((person, index) => (
                <Card
                  key={index}
                  className="rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm border border-yellow-200"
                >
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-12 h-12 rounded-full border-2 border-yellow-400"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-yellow-800">{person.name}</span>
                    <span className="text-xs text-muted-foreground">🎉 {person.date}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">
        {/* Employee Filters + Table */}
        <div className="xl:col-span-2 flex flex-col gap-6 bg-white p-6 rounded-xl shadow-md">
          {/* Header Row: Title + Search */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Employees</h2>
            <input type="text" placeholder="Search employees" className="border border-gray-300 rounded-md p-2 w-64" />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <select className="border border-gray-300 rounded-md p-2">
              <option>At office</option>
              <option>Remote</option>
            </select>
            <select className="border border-gray-300 rounded-md p-2">
              <option>All job titles</option>
            </select>
            <select className="border border-gray-300 rounded-md p-2">
              <option>All status</option>
            </select>
          </div>

          {/* Employee Table */}
          <div className="max-h-40 overflow-y-auto  rounded-md border border-gray-200 scrollbar-hide ">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-left font-semibold">
                <tr>
                  <th className="px-4 py-2">Employee Name</th>
                  <th className="px-4 py-2">Job Title</th>
                  <th className="px-4 py-2">Line Manager</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Office</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-accent transition-colors">
                    <td className="px-4 py-2 font-medium">{emp.name}</td>
                    <td className="px-4 py-2">{emp.role}</td>
                    <td className="px-4 py-2">{emp.lineManager}</td>
                    <td className="px-4 py-2">{emp.department}</td>
                    <td className="px-4 py-2">{emp.office}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Employees Chart */}
        <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Employees</h3>
            <button className="text-sm font-medium text-purple-600 hover:underline">All Member</button>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={roleDistribution} dataKey="value" nameKey="role" outerRadius={70} innerRadius={50} label>
                {roleDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              Developers
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-500"></span>
              Graphic Designer
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              Digital Marketing
            </li>
          </ul>
        </div>
      </div>

      {/* Bar Chart */}
      <ChartCard title="🏢 Department Distribution">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={departmentData}>
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Radar Chart */}
      <ChartCard title="📊 Skill Set Coverage">
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={skillsData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Skill Level" dataKey="level" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="🧑‍💼 Role Distribution">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={roleDistribution} dataKey="value" outerRadius={80} label>
              {roleDistribution.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="🔄 Employee Lifecycle">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={lifecycleStatus} dataKey="value" outerRadius={80} label>
              {lifecycleStatus.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value} employees`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="📈 Employee Growth">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={employeeGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="employees" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </main>
  );
  function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <Card className="bg-white dark:bg-muted/30 border shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    );
  }
}
