'use client';

import { FaChartBar, FaChartLine, FaComments, FaEye } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Dummy data for the charts
const readersData = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  datasets: [
    {
      label: 'Views',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 200)),
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 2,
    },
  ],
};

const reactionsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Votes',
      data: [120, 150, 180, 70, 110, 90],
      backgroundColor: 'rgba(40, 167, 69, 0.3)',
      borderColor: 'rgba(40, 167, 69, 1)',
      borderWidth: 2,
    },
  ],
};

const commentsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Comments',
      data: [30, 45, 22, 33, 19, 27],
      backgroundColor: 'rgba(255, 193, 7, 0.3)',
      borderColor: 'rgba(255, 193, 7, 1)',
      borderWidth: 2,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-500 mt-4">Get a quick overview of your platform’s performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-lg text-white text-center flex flex-col items-center">
          <FaEye className="text-4xl mb-4" />
          <h3 className="text-xl font-semibold">Views</h3>
          <p className="text-3xl font-bold">77</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow-lg text-white text-center flex flex-col items-center">
          <FaChartLine className="text-4xl mb-4" />
          <h3 className="text-xl font-semibold">Votes</h3>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-6 rounded-lg shadow-lg text-white text-center flex flex-col items-center">
          <FaComments className="text-4xl mb-4" />
          <h3 className="text-xl font-semibold">Comments</h3>
          <p className="text-3xl font-bold">35</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-lg shadow-lg text-white text-center flex flex-col items-center">
          <FaChartBar className="text-4xl mb-4" />
          <h3 className="text-xl font-semibold">Shares</h3>
          <p className="text-3xl font-bold">14</p>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">Views Summary</h3>
          <Line data={readersData} options={{ maintainAspectRatio: false }} />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">Votes Summary</h3>
          <Bar data={reactionsData} options={{ maintainAspectRatio: false }} />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md xl:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">Comments Summary</h3>
          <Bar data={commentsData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
