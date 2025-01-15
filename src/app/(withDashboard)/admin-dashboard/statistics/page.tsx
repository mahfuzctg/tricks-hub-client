/* eslint-disable  @typescript-eslint/no-unused-vars*/
'use client';

import { useGetStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Statistics = () => {
  const { data } = useGetStatisticsQuery(undefined);
  const statistics = data?.data || {}; 

  const chartData = [
    {
      title: 'Payments Overview',
      chart: (
        <BarChart data={[{ name: 'Total Payments', value: statistics.totalPayments }, { name: `Total Sold Membership (${statistics.totalSoldMembershipAmount}$)`, value: statistics.totalSoldMembershipAmount }]}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1F2937" />
        </BarChart>
      ),
    },
    {
      title: 'Posts Overview',
      chart: (
        <LineChart data={[{ name: 'Total Posts', value: statistics.totalPosts }, { name: 'Total Upvotes', value: statistics.totalUpvotes }, { name: 'Total Comments', value: statistics.totalPostComments }, { name: 'Premium Posts', value: statistics.totalPremiumPosts }]}>
          <CartesianGrid stroke="#ddd" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#1F2937" />
        </LineChart>
      ),
    },
    {
      title: 'Users Overview',
      chart: (
        <PieChart>
          <Pie data={[{ name: 'Total Users', value: statistics.totalUsers }, { name: 'Premium Users', value: statistics.totalPremiumUsers }]} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
            {['#1F2937', '#1F2937'].map((color, index) => (
              <Cell key={index} fill={color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-white">
      <h1 className="text-3xl text-black font-bold text-center mb-8">Statistics Overview</h1>

      {chartData.map(({ title, chart }, index) => (
        <div key={index} className="mb-12 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">{title}</h2>
          <ResponsiveContainer width="100%" height={300}>
            {chart}
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
