'use client'

import { useGetStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, ResponsiveContainer } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Statistics = () => {
        const { data} = useGetStatisticsQuery(undefined);
        const statistics = data?.data || {}; 

    // Data for various charts
    const paymentsData = [
        { name: 'Total Payments', value: statistics.totalPayments },
        { name: `Total Sold Membership (${statistics.totalSoldMembershipAmount}$)`, value: statistics.totalSoldMembershipAmount }
    ];

    const postData = [
        { name: 'Total Posts', value: statistics.totalPosts },
        { name: 'Total Upvotes', value: statistics.totalUpvotes },
        { name: 'Total Comments', value: statistics.totalPostComments },
        { name: 'Premium Posts', value: statistics.totalPremiumPosts }
    ];

    const usersData = [
        { name: 'Total Users', value: statistics.totalUsers },
        { name: 'Premium Users', value: statistics.totalPremiumUsers }
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className= "text-2xl md:text-3xl text-gray-500 font-bold text-center mb-8">Statistics Overview</h1>

            {/* Payments Section */}
            <div className="mb-12">
                <h2 className="text-xl lg:text-2xl font-semibold mb-4">Payments Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={paymentsData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4F46E5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Posts Section */}
            <div className="mb-12">
                <h2 className="text-xl lg:text-2xl font-semibold mb-4">Posts Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={postData}>
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#22D3EE" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Users Section */}
            <div className="mb-12">
                <h2 className="text-xl lg:text-2xl font-semibold mb-4">Users Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={usersData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {usersData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Statistics;
