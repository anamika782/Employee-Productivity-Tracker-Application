import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AllTask = () => {
  const [userData] = useContext(AuthContext);

  // Calculate total task counts for the main pie chart
  const totalTasks = userData.reduce(
    (acc, curr) => ({
      newTask: acc.newTask + curr.taskCounts.newTask,
      active: acc.active + curr.taskCounts.active,
      completed: acc.completed + curr.taskCounts.completed,
      failed: acc.failed + curr.taskCounts.failed,
    }),
    { newTask: 0, active: 0, completed: 0, failed: 0 }
  );

  const pieData = {
    labels: ["New Task", "Active Task", "Completed", "Failed"],
    datasets: [
      {
        data: [
          totalTasks.newTask,
          totalTasks.active,
          totalTasks.completed,
          totalTasks.failed,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0", "#FFCE56"],
      },
    ],
  };

  // Identify low and high performers
  const employeePerformance = userData.map((user) => ({
    name: user.firstName,
    performanceRate:
      user.taskCounts.completed /
      (user.taskCounts.completed + user.taskCounts.failed || 1),
  }));

  const lowPerformers = employeePerformance.filter(
    (emp) => emp.performanceRate < 0.5
  );
  const highPerformers = employeePerformance.filter(
    (emp) => emp.performanceRate >= 0.5
  );

  const barData = {
    labels: userData.map((user) => user.firstName),
    datasets: [
      {
        label: "Performance Rate",
        data: employeePerformance.map((emp) => emp.performanceRate * 100),
        backgroundColor: employeePerformance.map((emp, index) =>
          emp.performanceRate >= 0.5 ? `hsl(${index * 40}, 100%, 60%)` : "#FF6384"
        ),
      },
    ],
  };

  return (
    <div className="bg-[white] rounded-xl shadow-md shadow-black/10 p-6 mt-6">
    
      {/* Charts Section */}
      
      <div className="flex flex-row gap-8 mt-8 ml-9">
        {/* Bar Chart for Employee Performance (Left side) */}
        <div className="w-1/2 mt-12"> {/* Added margin top here */}
        
          <h3 className="text-lg font-semibold text-black mb-4 ">
            Employee Performance
          </h3>
          <Bar data={barData} options={{ plugins: { legend: { display: false } } }} />
        </div>

        {/* Pie Chart for Task Distribution (Right side) */}
        <div className="w-1/3 ml-7" style={{ marginLeft: "100px" }}> {/* Added margin top here */}
          <h3 className="text-lg font-semibold text-black mb-4">
            Task Distribution
          </h3>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Low Performers Section */}
    {/* Low Performers Section */}
{lowPerformers.length > 0 && (
  <div className="mt-8 p-6 rounded-xl flash-warning">
    <h3 className="text-lg font-semibold text-gray-100 mb-4">
      Low Performers:
    </h3>
    <ul className="text-gray-300">
      {lowPerformers.map((emp) => (
        <li key={emp.name}>
          <span className="font-semibold text-red-500">{emp.name}</span> is not doing well
        </li>
      ))}
    </ul>
  </div>
)}

<h1 className="allemp">All Employers</h1>


<h2 className="text-xl font-bold text-gray-100 mb-6">Task Overview</h2>
      <div className="bg-black mb-4 py-3 px-6 flex justify-between rounded-lg">
        <h2 className="w-1/5 font-semibold text-gray-300">Employee Name</h2>
        <h3 className="w-1/5 font-semibold text-center text-gray-300">
          New Task
        </h3>
        <h5 className="w-1/5 font-semibold text-center text-gray-300">
          Active Task
        </h5>
        <h5 className="w-1/5 font-semibold text-center text-gray-300">
          Completed
        </h5>
        <h5 className="w-1/5 font-semibold text-center text-gray-300">
          Failed
        </h5>
      </div>
      <div className=" overflow-auto max-h-[300px]">
        {userData.map((element) => (
        <div
        key={element.id}
        className={`border border-gray-800 hover:bg-[#222222] mb-2 py-3 px-6 flex justify-between rounded-lg transition-all duration-200 ${
          lowPerformers.some((emp) => emp.name === element.firstName)
            ? "bg-red-700" // Apply red if condition matches
            : "bg-gradient-to-b from-[#020024] via-[#0ca2b5] to-[#0ca2b5]" // Apply the new gradient
        }`}
      >
            <h2 className="w-1/5 text-gray-100">{element.firstName}</h2>
            <h3 className="w-1/5 text-center text-gray-300">
              {element.taskCounts.newTask}
            </h3>
            <h5 className="w-1/5 text-center text-gray-300">
              {element.taskCounts.active}
            </h5>
            <h5 className="w-1/5 text-center text-gray-300">
              {element.taskCounts.completed}
            </h5>
            <h5 className="w-1/5 text-center text-gray-300">
              {element.taskCounts.failed}
            </h5>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default AllTask;
