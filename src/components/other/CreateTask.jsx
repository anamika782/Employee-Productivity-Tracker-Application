import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { showErrorToast, showSuccessToast } from "../../utils/toastConfig";

const CreateTask = () => {
  const initialState = {
    taskTitle: "",
    taskDescription: "",
    taskDate: "",
    assignTo: "",
    category: "",
    priority: "Low", // Default value for priority
    employeeMessage: "", // New state for employee message
  };

  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createNewTask = () => ({
    taskTitle: formData.taskTitle,
    taskDate: formData.taskDate,
    category: formData.category,
    priority: formData.priority, // Include priority in task creation
    taskDescription: formData.taskDescription,
    employeeMessage: formData.employeeMessage, // Include employee message
    active: false,
    newTask: true,
    failed: false,
    completed: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    try {
      const employee = userData.find(
        (emp) => emp.firstName === formData.assignTo
      );
      if (!employee) {
        showErrorToast("Employee not found!");
        return;
      }

      const updatedData = userData.map((emp) => {
        if (emp.firstName === formData.assignTo) {
          return {
            ...emp,
            tasks: [...emp.tasks, createNewTask()],
            taskCounts: {
              ...emp.taskCounts,
              newTask: emp.taskCounts.newTask + 1,
            },
          };
        }
        return emp;
      });

      setUserData(updatedData);
      showSuccessToast("Task created successfully!");
      setFormData(initialState);
    } catch (error) {
      showErrorToast("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="tasklistcolor p-6 rounded-xl shadow-md shadow-black/10 mt-6">
      <h2 className="text-xl font-bold text-gray-100 mb-6">Create New Task</h2>
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Task Title
            </label>
            <input
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleInputChange}
              className="inputboxfortask w-4/5 px-4 py-2 rounded-lg border "
              type="text"
              placeholder="write title ..."
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Date
            </label>
            <input
              name="taskDate"
              value={formData.taskDate}
              onChange={handleInputChange}
              className="inputboxfortask w-4/5 px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              type="date"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Assign To
            </label>
            <input
              name="assignTo"
              value={formData.assignTo}
              onChange={handleInputChange}
              className="inputboxfortask w-4/5 px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              type="text"
              placeholder="Employee name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="inputboxfortask w-4/5 px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              required
            >
              <option value="">Select Category</option>
              <option value="BAU">BAU</option>
              <option value="Ad Hoc">Ad Hoc</option>
              <option value="Project-Based">Project-Based</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="inputboxfortask w-4/5 px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              required
            >
              <option value="Low">Low</option>
              <option value="Mid">Mid</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="w-2/5">
          <label className="block text-sm font-medium text-white mb-1">
            Description
          </label>
          <textarea
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleInputChange}
            className="inputboxfortask w-full px-4 py-2 h-44 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
            required
            placeholder="Write description of task..."
          />
          
          <label className="block text-sm font-medium text-white mb-1 mt-4">
            Employee Message (Regarding Previous Performance)
          </label>
          <textarea
            name="employeeMessage"
            value={formData.employeeMessage}
            onChange={handleInputChange}
            className="inputboxfortask w-full px-4 py-2 h-44 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
            placeholder="Write a message about employee's performance..."
          />
          
          <button
            type="submit"
            className="itscreatetask w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
