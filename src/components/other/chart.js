import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../../context/AuthProvider";

const TaskListNumbers = ({ data }) => {
  const [userData] = useContext(AuthContext);
  const [counts, setCounts] = useState(data.taskCounts);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (userData) {
      const currentEmployee = userData.find((emp) => emp.id === data.id);
      if (currentEmployee) {
        const { newTask, completed, active, failed } = currentEmployee.taskCounts;
        setCounts(currentEmployee.taskCounts);

        // Prepare data for the chart
        setChartData({
          labels: ["New Tasks", "Completed Tasks", "Active Tasks", "Failed Tasks"],
          datasets: [
            {
              label: "Task Distribution",
              data: [newTask, completed, active, failed],
              backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c"],
              borderColor: ["#2980b9", "#27ae60", "#f39c12", "#c0392b"],
              borderWidth: 1,
            },
          ],
        });
      }
    }
  }, [userData, data.id]);

  return (
    <div>
      <div className="flex screen mt-10 justify-between overflow-x-auto gap-5">
        <div className="rounded-xl py-6 px-9 p-10 w-[45%] bg-blue-400">
          <h2 className="text-2xl font-semibold">{counts.newTask}</h2>
          <h3 className="text-xl font-medium">New Task</h3>
        </div>
        <div className="rounded-xl py-6 px-9 p-10 w-[45%] bg-green-400">
          <h2 className="text-2xl font-semibold">{counts.completed}</h2>
          <h3 className="text-xl font-medium">Completed Task</h3>
        </div>
        <div className="rounded-xl py-6 px-9 p-10 w-[45%] bg-yellow-300">
          <h2 className="text-2xl text-black font-semibold">{counts.active}</h2>
          <h3 className="text-xl font-medium text-black">Active Task</h3>
        </div>
        <div className="rounded-xl py-6 px-9 p-10 w-[45%] bg-red-400">
          <h2 className="text-2xl font-semibold">{counts.failed}</h2>
          <h3 className="text-xl font-medium">Failed Task</h3>
        </div>
      </div>

      {chartData && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-center mb-5">Task Analytics</h3>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TaskListNumbers;
