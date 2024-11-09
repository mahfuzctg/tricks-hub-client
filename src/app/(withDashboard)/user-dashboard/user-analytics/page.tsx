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
    <section className="max-w-[1300px] mx-auto px-4 my-4 lg:my-8">
      <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="py-6 px-8 bg-gradient-to-r from-black to-gray-800 text-white text-center">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-sm mt-1">Get a quick overview of your platform’s performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white">
          <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200 flex flex-col items-center">
            <FaEye className="text-3xl text-blue-600 mb-2" />
            <h3 className="text-lg font-medium text-gray-700">Views</h3>
            <p className="text-2xl font-bold text-gray-900">77</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200 flex flex-col items-center">
            <FaChartLine className="text-3xl text-green-600 mb-2" />
            <h3 className="text-lg font-medium text-gray-700">Votes</h3>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200 flex flex-col items-center">
            <FaComments className="text-3xl text-yellow-600 mb-2" />
            <h3 className="text-lg font-medium text-gray-700">Comments</h3>
            <p className="text-2xl font-bold text-gray-900">35</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200 flex flex-col items-center">
            <FaChartBar className="text-3xl text-purple-600 mb-2" />
            <h3 className="text-lg font-medium text-gray-700">Shares</h3>
            <p className="text-2xl font-bold text-gray-900">14</p>
          </div>
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-6 bg-white">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-medium text-gray-600 mb-4">Views Summary</h3>
            <Line data={readersData} options={{ maintainAspectRatio: false }} height={150} />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-medium text-gray-600 mb-4">Votes Summary</h3>
            <Bar data={reactionsData} options={{ maintainAspectRatio: false }} height={150} />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 xl:col-span-2">
            <h3 className="text-lg font-medium text-gray-600 mb-4">Comments Summary</h3>
            <Bar data={commentsData} options={{ maintainAspectRatio: false }} height={150} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
