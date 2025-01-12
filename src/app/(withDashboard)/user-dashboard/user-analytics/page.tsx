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
      backgroundColor: 'rgba(248, 113, 113, 0.2)', // Light red
      borderColor: 'rgba(248, 113, 113, 1)', // Red
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
      backgroundColor: 'rgba(52, 211, 153, 0.2)', // Light green
      borderColor: 'rgba(52, 211, 153, 1)', // Green
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
      backgroundColor: 'rgba(59, 130, 246, 0.2)', // Light blue
      borderColor: 'rgba(59, 130, 246, 1)', // Blue
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg min-h-screen">
      {/* Header */}
      <div className="py-6 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-lg mb-8">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <p className="text-sm mt-1">Get a quick overview of your platform’s performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-4 rounded-lg flex items-center">
          <FaEye className="text-3xl text-white mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-white">Views</h3>
            <p className="text-2xl font-bold text-white">345</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 rounded-lg flex items-center">
          <FaChartLine className="text-3xl text-white mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-white">Votes</h3>
            <p className="text-2xl font-bold text-white">87</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 via-red-500 to-orange-500 p-4 rounded-lg flex items-center">
          <FaComments className="text-3xl text-white mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-white">Comments</h3>
            <p className="text-2xl font-bold text-white">17</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-lg flex items-center">
          <FaChartBar className="text-3xl text-white mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-white">Shares</h3>
            <p className="text-2xl font-bold text-white">8</p>
          </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-pink-200 to-yellow-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Views Summary</h3>
          <Line data={readersData} />
        </div>

        <div className="bg-gradient-to-r from-green-200 to-teal-200 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Votes Summary</h3>
          <Bar data={reactionsData} />
        </div>

        <div className="bg-gradient-to-r from-blue-200 to-indigo-200 p-6 rounded-lg xl:h-[400px] lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Comments Summary</h3>
          <Bar data={commentsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
