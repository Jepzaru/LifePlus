import React, { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { LiaTasksSolid } from 'react-icons/lia';
import { BiTask } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { ImListNumbered } from 'react-icons/im';
import { AiOutlineFieldTime } from 'react-icons/ai';
import './App.css';

function App() {
  const [taskQueues, setTaskQueues] = useState([
    { name: 'High Priority Queue', tasks: [], timer: 10000 },
    { name: 'Regular Queue 1', tasks: [], timer: 10000 },
    { name: 'Regular Queue 2', tasks: [], timer: 10000 },
    { name: 'Regular Queue 3', tasks: [], timer: 10000 },
  ]);

  const [taskContainer, setTaskContainer] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const minTime = 4000; 
  const maxTime = 10000;

  const GenerateTask = () => {
    const GenerateTaskNumber = () => {
      return Math.floor(Math.random() * 200) + 1;
    };

    const isUniqueTask = (taskNumber) => {
      return !taskContainer.some((task) => task.number === taskNumber);
    };

    let randomNumber;
    do {
      randomNumber = GenerateTaskNumber();
    } while (!isUniqueTask(randomNumber));

    const HighPrio = randomNumber % 8 === 0 || Math.random() <= 0.2;
    const taskTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

    const newTask = {
      number: randomNumber,
      HighPrio: HighPrio,
      taskTime: taskTime,
    };

    setTaskContainer([...taskContainer, newTask]);
  };

  const admitTaskToQueue = () => {
    if (taskContainer.length === 0) return;
  
    const AdmitTask = taskContainer.shift();
    const HighPrio = AdmitTask.HighPrio;
  
    if (HighPrio) {
      setTaskQueues((prevTaskQueues) => [
        { ...prevTaskQueues[0], tasks: [...prevTaskQueues[0].tasks, AdmitTask] },
        ...prevTaskQueues.slice(1),
      ]);
      return;
    }
  
    let shortestQueueIndex = -1;
    let shortestQueueTime = Infinity;
  
    for (let i = 1; i < taskQueues.length; i++) {
      const queue = taskQueues[i];
      const totalTaskTimeInQueue = queue.tasks.reduce(
        (acc, task) => acc + task.taskTime,
        queue.timer
      );
  
      if (totalTaskTimeInQueue < shortestQueueTime) {
        shortestQueueTime = totalTaskTimeInQueue;
        shortestQueueIndex = i;
      }
    }
  
    if (shortestQueueIndex !== -1) {
      // Initialize the timer with the taskTime of the first task if the queue is empty
      if (taskQueues[shortestQueueIndex].tasks.length === 0) {
        taskQueues[shortestQueueIndex].timer = AdmitTask.taskTime;
      }
  
      // Add the task to the queue with the shortest expected total time
      taskQueues[shortestQueueIndex].tasks.push(AdmitTask);
      setTaskQueues([...taskQueues]);
    }
  };
  

  useEffect(() => {
    const Interval = setInterval(() => {
      setTaskQueues((prevTaskQueues) => {
        const currentTime = Date.now();
        const updatedTaskQueues = [...prevTaskQueues];
        const completedTasksBatch = [];

        for (let i = 0; i < updatedTaskQueues.length; i++) {
          const queue = updatedTaskQueues[i];

          if (queue.tasks.length > 0) {
            if (queue.timer <= 0) {
              // completed task will be added to recent completed tasks
              completedTasksBatch.push(queue.tasks[0]);
              queue.tasks.shift();

              if (queue.tasks.length > 0) {
                queue.timer = queue.tasks[0].taskTime;
              } else {
                queue.timer = 10000;
              }
            } else {
              // Calculate the time elapsed since the last update
              const timeElapsed = currentTime - queue.lastUpdateTime;
              queue.timer -= timeElapsed;
            }
          }

          // Update the queue
          queue.lastUpdateTime = currentTime;
        }

        // Update the completed tasks 
        setCompletedTasks((prevCompletedTasks) => [
          ...prevCompletedTasks,
          ...completedTasksBatch,
        ]);

        return updatedTaskQueues;
      });
    }, 1000);

    return () => {
      clearInterval(Interval);
    };
  }, []);

  //calculate progress percentage
  const calculateProgress = (timer, initialTime) => {
    const percentage = ((initialTime - timer) / initialTime) * 100;
    return Math.min(100, Math.floor(percentage));
  };

  const clearCompletedTasks = () => {
    setCompletedTasks([]);
  };

  return (
    <div className="App">
      <div className="grid">
        <div className="controls">
          <div className="button-container">
            <button onClick={GenerateTask} style={{ display: 'flex', alignItems: 'center' }}>
              <FiRefreshCw size="1.2em" color="white" /> <span style={{ marginLeft: '15px' }}>Generate Random Task</span>
            </button>
            <button onClick={admitTaskToQueue} style={{ display: 'flex', alignItems: 'center' }}>
              <AiOutlineAppstoreAdd size="1.2em" color="white" /> <span style={{ marginLeft: '15px' }}>Admit Task</span></button>
          </div>
        </div>
        <div className="content-container">
          <div className="task-list" style={{ width: '50%', float: 'right' }}>
            {taskQueues.map((queue, index) => (
              <div className="task-queue rounded-border" key={index} >
                <p style={{ fontSize: '1.5em' }}>{queue.name}</p>
                <p><ImListNumbered /> <span style={{ marginLeft: '15px', alignContent: 'center' }}>
                  Queue List:
                  {` (${queue.tasks.length} tasks)`}
                </span></p>
                <div className="task-queue-container">
                  <ul>
                    {queue.tasks.map((AdmitTask, taskIndex) => (
                      <li
                        key={taskIndex}
                        style={{ color: AdmitTask.HighPrio ? 'red' : 'inherit' }}
                      ><div className='lista'>
                        Task {AdmitTask.number}
                      </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <p><AiOutlineFieldTime /><span style={{ marginLeft: '15px', alignContent: 'center' }}></span>Duration:</p>
                <div className="progress-bar">
                  <div className={`progress-bar-fill progress-bar-fill-smooth`}
                    style={{
                      width: `${calculateProgress(queue.timer, 10000)}%`,
                    }}
                  >
                    <div className="progress-bar-text">
                      {`${calculateProgress(queue.timer, 10000)}%`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="notification-container rounded-border"
            style={{ width: '45%' }}>
            <h3 style={{ fontSize: '1.5em', display: 'flex', alignItems: 'center' }}>
              <LiaTasksSolid size="2em" style={{ marginRight: '10px' }} />
              <span>Task Queue:</span>
              <span style={{ marginLeft: '10px' }}>{taskContainer.length}</span>
            </h3>
            <div className="task-queue-container">
              <ul>
                {taskContainer.map((AdmitTask, taskIndex) => (
                  <li
                    key={taskIndex}
                    style={{ fontSize: '1em', color: AdmitTask.HighPrio ? 'red' : 'inherit' }}>
                    <div className='task-sudlanan'>
                      Task {AdmitTask.number}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="notification-container rounded-border"
            style={{ width: '45%' }}>
            <div className="completed-tasks">
              <h3 style={{ fontSize: '1.5em', display: 'flex', alignItems: 'center' }}>
                <BiTask size="2em" style={{ marginRight: '10px' }} />
                <span>Recent Completed Task:</span>
                <span style={{ marginLeft: '10px' }}>{completedTasks.length}</span>
              </h3>
              <div className="complete-queue-container">
                <ul>
                  {completedTasks.map((AdmitTask, taskIndex) => (
                    <li key={taskIndex}>
                      <div className='task-humana'>{`Task ${AdmitTask.number}`}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='clear'>
                <button onClick={() => clearCompletedTasks()}
                  style={{ backgroundColor: 'red', color: 'white', alignItems: 'center', display: 'flex' }}>
                  <FaTrashAlt /><span style={{ marginLeft: '15px' }}>Clear Completed Tasks</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
