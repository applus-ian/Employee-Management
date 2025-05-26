'use client';
import { TrendingDownIcon, TrendingUpIcon, Search, Filter, ChevronRight } from 'lucide-react';
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
import { useEffect, useRef, useState } from 'react';

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

export default function DashboardPage() {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame
    let animationFrame: number;

    const scroll = () => {
      if (isPaused) {
        animationFrame = requestAnimationFrame(scroll);
        return;
      }

      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollWidth - clientWidth) {
        scrollAmount = 0;
      }
      carousel.scrollLeft = scrollAmount;
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPaused]);

  return (
    <main className="flex flex-col flex-1 p-3 sm:p-4 md:p-6 gap-4 md:gap-6 bg-gray-50/50">
      {/* Welcome Section with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Here&apos;s what&apos;s happening with your employees today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Summary Cards with Improved Visuals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Employees */}
        <Card className="rounded-xl bg-white border-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium text-gray-600">Active Employees</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl sm:text-4xl font-semibold tabular-nums text-gray-900">50</CardTitle>
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs bg-green-50 text-green-600 border-green-200"
              >
                <TrendingUpIcon className="size-3" /> +12.5%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <TrendingUpIcon className="size-4 text-green-500" />
              <span>+5 new active employees this month</span>
            </div>
          </CardContent>
        </Card>

        {/* Inactive Employees */}
        <Card className="rounded-xl bg-white border-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium text-gray-600">Inactive Employees</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl sm:text-4xl font-semibold tabular-nums text-gray-900">10</CardTitle>
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs bg-red-50 text-red-600 border-red-200">
                <TrendingDownIcon className="size-3" /> -20%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <TrendingDownIcon className="size-4 text-red-500" />
              <span>20% decrease due to seasonal attrition</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Employees */}
        <Card className="rounded-xl bg-white border-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium text-gray-600">Total Employees</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl sm:text-4xl font-semibold tabular-nums text-gray-900">60</CardTitle>
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs bg-blue-50 text-blue-600 border-blue-200"
              >
                <TrendingUpIcon className="size-3" /> +12.5%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <TrendingUpIcon className="size-4 text-blue-500" />
              <span>Retaining top talent contributes to growth</span>
            </div>
          </CardContent>
        </Card>

        {/* Offices */}
        <Card className="rounded-xl bg-white border-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium text-gray-600">Offices</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl sm:text-4xl font-semibold tabular-nums text-gray-900">5</CardTitle>
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs bg-purple-50 text-purple-600 border-purple-200"
              >
                <TrendingUpIcon className="size-3" /> +4.5%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <TrendingUpIcon className="size-4 text-purple-500" />
              <span>New offices planned in Europe and Asia</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area with Better Organization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column: Social Feed */}
        <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
          {/* Post Section */}
          <Card className="rounded-xl bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/women/75.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Christian Bale</h4>
                  <p className="text-xs text-gray-500">@imbatman</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <input
                type="text"
                placeholder="How good was your day?"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition-all ml-auto">
                Share Update
              </Button>
            </CardFooter>
          </Card>

          {/* Comments Section with Improved Styling */}
          <Card className="rounded-xl bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Updates</CardTitle>
              <CardDescription className="text-sm text-gray-600">Latest posts from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
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
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-4 text-sm text-gray-900 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/85.jpg"
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <div className="font-semibold text-sm text-gray-900">Christian Bale</div>
                        <div className="text-xs text-gray-500">@imbatman</div>
                      </div>
                    </div>
                    <p className="text-sm leading-snug mb-2 whitespace-pre-line text-gray-700">{post.text}</p>
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>{post.time}</span>
                      <span className="flex gap-4">
                        <span className="flex items-center gap-1">
                          <span className="text-red-500">❤️</span> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-blue-500">💬</span> {post.replies}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Birthdays and Quick Stats */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Birthday Carousel with Enhanced Design */}
          <Card className="rounded-xl bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">🎂 Today&apos;s Birthdays</CardTitle>
              <CardDescription className="text-sm text-gray-600">Celebrate with your colleagues</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={carouselRef}
                className="w-full overflow-x-auto hide-scrollbar relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex flex-row gap-4 px-1 pb-2">
                  {[
                    {
                      name: 'Chuchu',
                      username: '@chuchu',
                      img: 'https://randomuser.me/api/portraits/men/32.jpg',
                      message: 'Wishing you a day filled with love, joy, and cake! 🎂',
                      quote: 'Count your life by smiles, not tears. Count your age by friends, not years.',
                    },
                    {
                      name: 'Anna',
                      username: '@anna123',
                      img: 'https://randomuser.me/api/portraits/women/45.jpg',
                      message: 'Hope your birthday is as amazing as you are! 🎉',
                      quote: 'Make a wish and let the celebration begin!',
                    },
                    {
                      name: 'Mike',
                      username: '@mike_dev',
                      img: 'https://randomuser.me/api/portraits/men/12.jpg',
                      message: 'Have a fantastic birthday full of fun and laughter! 🎈',
                      quote: "Life's too short not to party on your birthday!",
                    },
                    {
                      name: 'Sara',
                      username: '@sara_b',
                      img: 'https://randomuser.me/api/portraits/women/56.jpg',
                      message: 'Cheers to another year of awesomeness! 🥳',
                      quote: 'Another year older, another year bolder!',
                    },
                  ].map((birthday, index) => (
                    <Card
                      key={index}
                      className="min-w-[240px] sm:min-w-[260px] md:min-w-[280px] rounded-xl p-3 sm:p-4 md:p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                    >
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

                      <Button
                        className="mt-4 w-full py-2 text-yellow-700 border border-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
                        onClick={() => alert(`Send your birthday wishes to ${birthday.name}! 🎉`)}
                        aria-label={`Send birthday wish to ${birthday.name}`}
                      >
                        Send a Birthday Wish
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Section */}
          <Card className="rounded-xl bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-orange-800">Team Members</p>
                  <p className="text-2xl font-bold text-orange-900 mt-1">24</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-800">Projects</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">12</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-800">Tasks</p>
                  <p className="text-2xl font-bold text-green-900 mt-1">48</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-purple-800">Events</p>
                  <p className="text-2xl font-bold text-purple-900 mt-1">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section with Enhanced Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Employee Growth Chart */}
        <Card className="rounded-xl bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Employee Growth</CardTitle>
                <CardDescription className="text-sm text-gray-600">Monthly employee count trend</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={employeeGrowth}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="month" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="employees"
                    stroke="#EE7A2A"
                    strokeWidth={2}
                    dot={{ fill: '#EE7A2A', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#EE7A2A' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="rounded-xl bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Department Distribution</CardTitle>
            <CardDescription className="text-sm text-gray-600">Employee count by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="department" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar dataKey="count" fill="#EE7A2A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Employee Status */}
        <Card className="rounded-xl bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Employee Status</CardTitle>
            <CardDescription className="text-sm text-gray-600">Current employee lifecycle status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={lifecycleStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {lifecycleStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Skills Distribution */}
        <Card className="rounded-xl bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Skills Distribution</CardTitle>
            <CardDescription className="text-sm text-gray-600">Employee skills proficiency levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="skill" className="text-sm" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} className="text-sm" />
                  <Radar name="Skills" dataKey="level" stroke="#EE7A2A" fill="#EE7A2A" fillOpacity={0.3} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Table Section with Enhanced Design */}
      <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Employee Overview</CardTitle>
              <CardDescription className="text-sm text-gray-600">Manage and monitor your team</CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees"
                  className="pl-9 w-full sm:w-64 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://randomuser.me/api/portraits/${emp.id % 2 ? 'men' : 'women'}/${emp.id}.jpg`}
                            alt={emp.name}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{emp.name}</div>
                            <div className="text-sm text-gray-500">{emp.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{emp.role}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{emp.department}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Active
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
