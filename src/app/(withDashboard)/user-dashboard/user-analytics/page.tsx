'use client'

import { FaChartBar, FaChartLine, FaComments, FaEye } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Dummy data for the charts
const readersData = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  datasets: [
    {
      label: 'Views',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 200)),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const reactionsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Votes',
      data: [120, 150, 180, 70, 110, 90],
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    },
  ],
};

const commentsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Comments',
      data: [30, 45, 22, 33, 19, 27],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl xl:text-3xl font-bold">Analytics</h1>
        {/* <div className="space-x-4">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Week</button>
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Month</button>
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Year</button>
        </div> */}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-100/70 p-4 rounded-lg  flex items-center">
          <FaEye className="text-2xl text-blue-500 mr-4" />
          <div>
            <h3 className=" md:text-xl font-semibold text-gray-500">Views</h3>
            <p className="text-lg md:text-xl xl:text-2xl font-bold text-gray-600">52</p>
          </div>
        </div>
        <div className="bg-gray-100/70 p-4 rounded-lg  flex items-center">
          <FaChartLine className="text-2xl text-green-500 mr-4" />
          <div>
            <h3 className=" md:text-xl font-semibold text-gray-500">Votes</h3>
            <p className="text-lg md:text-xl xl:text-2xl font-bold text-gray-600">35</p>
          </div>
        </div>
        <div className="bg-gray-100/70 p-4 rounded-lg  flex items-center">
          <FaComments className="text-2xl text-yellow-500 mr-4" />
          <div>
            <h3 className=" md:text-xl font-semibold text-gray-500">Comments</h3>
            <p className="text-lg md:text-xl xl:text-2xl font-bold text-gray-600">35</p>
          </div>
        </div>
        <div className="bg-gray-100/70 p-4 rounded-lg  flex items-center">
          <FaChartBar className="text-2xl text-purple-500 mr-4" />
          <div>
            <h3 className=" md:text-xl font-semibold text-gray-500">Shares</h3>
            <p className="text-lg md:text-xl xl:text-2xl font-bold text-gray-600">14</p>
          </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg ">
          <h3 className="text-lg font-semibold mb-4">Views Summary</h3>
          <Line data={readersData} />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg ">
          <h3 className="text-lg font-semibold mb-4">Votes Summary</h3>
          <Bar data={reactionsData} />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg xl:h-[400px]  lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Comments Summary</h3>
          <Bar data={commentsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
