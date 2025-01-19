import React, { useContext, useEffect } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import { AuthContext } from '../../context/AuthProvider'

const TaskList = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext)

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'))
    if (storedEmployees && JSON.stringify(storedEmployees) !== JSON.stringify(userData)) {
      setUserData(storedEmployees)
    }
  }, [userData, setUserData])

  const renderTask = (task, id) => {
    if (task.active) return <AcceptTask element={task} key={id} />
    if (task.newTask) return <NewTask element={task} key={id} />
    if (task.completed) return <CompleteTask element={task} key={id} />
    if (task.failed) return <FailedTask element={task} key={id} />
    return null
  }

  return (
    
    <div className='tasklistcolor22 p-6 rounded-xl shadow-md shadow-black/10 mt-6'>
      <h2 className='text-xl font-bold text-gray-100 mb-6'>Your Tasks</h2>
      <div id='tasklist' className=' flex items-center gap-6 overflow-x-auto pb-4'>
      {data?.tasks?.map((task, id) => (
          <div key={id} className="task-box">
            {renderTask(task, id)}
            <div className="w-full mt-4">
              {task.employeeMessage && (
                <p className="new65 text-sm text-gray-600">
                  <strong>Employee Message:</strong> {task.employeeMessage}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default TaskList