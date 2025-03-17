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
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light gray
      borderColor: 'rgba(0, 0, 0, 1)', // Black
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
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light gray
      borderColor: 'rgba(0, 0, 0, 1)', // Black
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
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light gray
      borderColor: 'rgba(0, 0, 0, 1)', // Black
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-6 bg-white rounded-lg min-h-screen">
      {/* Header */}
      <div className="py-6 px-8 text-center rounded-lg mb-8">
        <h2 className="text-3xl font-bold text-black">Analytics Dashboard</h2>
        <p className="text-sm mt-1 text-gray-700">Get a quick overview of your platform’s performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
          <FaEye className="text-3xl text-black mr-4" />
          <div >
            <h3 className="text-xl font-semibold text-black ">Views</h3>
            <p className="text-2xl font-bold text-black">345</p>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center text-center justify-center">
          <FaChartLine className="text-3xl text-black mr-4" /> 
          <div >
            <h3 className="text-xl font-semibold text-black">Votes</h3>
            <p className="text-2xl font-bold text-black">87</p>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
          <FaComments className="text-3xl text-black mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-black">Comments</h3>
            <p className="text-2xl font-bold text-black">17</p>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
          <FaChartBar className="text-3xl text-black mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-black">Shares</h3>
            <p className="text-2xl font-bold text-black">8</p>
          </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Views Summary</h3>
          <Line data={readersData} />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Votes Summary</h3>
          <Bar data={reactionsData} />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg xl:h-[400px] lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Comments Summary</h3>
          <Bar data={commentsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
