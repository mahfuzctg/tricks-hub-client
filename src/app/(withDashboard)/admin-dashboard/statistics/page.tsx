/* eslint-disable @typescript-eslint/no-unused-vars */
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
          <Pie data={[{ name: 'Total Users', value: statistics.totalUsers }, { name: 'Premium Users', value: statistics.totalPremiumUsers }]} cx="50%" cy="50%" outerRadius={90} fill="#8884d8" dataKey="value" label>
            {COLORS.map((color, index) => (
              <Cell key={index} fill={color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-white my-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Statistics Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chartData.map(({ title, chart }, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">{title}</h2>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                {chart}
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
