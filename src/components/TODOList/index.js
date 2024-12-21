import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { problemList } from '../../shared/data';

const TODOList = () => {
    const [task, setTask] = useState('')
    const [taskList, setTaskList] = useState([]);
    const [totalTask, setTotalTask] = useState([]);
    const [problems, setProblems] = useState(null);

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            const getProblem = problemList.filter((item) => item.title === id)

            if (getProblem.length > 0) {
                setTimeout(() => {
                    setProblems(getProblem[0])
                }, 2000);

            } else {
                setProblems(null)
            }
        }
    }, [id]);


    const handleAdd = () => {
        const newTask = {
            id: taskList.length + 1,
            task: task,
            isCompleted: false
        }
        setTaskList([...taskList, newTask]);
        setTotalTask([...totalTask, newTask]);
        setTask('');
    }
    const handleCompleteTask = (e, id) => {
        const { value } = e.target;
        const checked = value === 'yes' ? true : false;

        const updatedTaskList = taskList.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    isCompleted: checked
                }
            }
            return item;
        });
        setTaskList(updatedTaskList);
        setTotalTask(updatedTaskList);
    }

    const handleFilter = (e) => {
        const { value } = e.target;

        if (value === 'All') {
            setTaskList(totalTask);
        } else if (value === 'Active') {
            const activeTask = totalTask.filter((item) => item.isCompleted === false);
            setTaskList(activeTask);
        } else {
            const completedTask = totalTask.filter((item) => item.isCompleted === true);
            if (completedTask.length > 0) {
                setTaskList(completedTask);
            } else {
                setTaskList(totalTask);
            }
        }
    }
    const handleDelete = (id) => {
        const updatedTaskList = taskList.filter((item) => item.id !== id);
        setTaskList(updatedTaskList);
        setTotalTask(updatedTaskList);
    }

    return (
        problems !== null ?
            <div>
                <h2 className="text-center my-5">{problems.title}</h2>
                <div class="row d-flex justify-content-center mb-5">
                    <div class="col-7">
                        {problems && problems.description && problems.description.split('.').map((item) => (
                            <p>{item}</p>
                        ))}
                    </div>

                </div>


                <div className="row mb-4">

                    <div className="col-12 d-flex justify-content-center">
                        <input
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Enter your task"
                            className="form-control w-50"
                        />
                        <button
                            className="btn btn-primary mx-3"
                            onClick={handleAdd}
                            disabled={task.length === 0}
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Task List */}
                <div className="row">
                    <div className="col-10 mx-auto">
                        {/* Task Header */}
                        <div className="row mb-3">
                            <div className="col-8">
                                <h5>Task List</h5>
                            </div>

                        </div>

                        <div className="row mb-3">
                            <div className="col-3">
                                <select class="form-select" aria-label="Default select example"
                                    onChange={handleFilter}
                                >
                                    <option value={''} disabled selected>Filter</option>
                                    <option value={'All'}>All</option>
                                    <option value={'Active'}>Active</option>
                                    <option value={'Completed'}>Completed</option>
                                </select>
                            </div>

                        </div>

                        {/* Task Items */}
                        <ul className="list-group">
                            {taskList.map((item) => (
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                    key={item.id}
                                >
                                    <div className="row w-100">
                                        {/* Task Text */}
                                        <div className="col-8 d-flex align-items-center">
                                            <input
                                                className="form-check-input me-2"
                                                type="checkbox"
                                                id={item.id}
                                                value={!item.isCompleted ? 'yes' : false}
                                                checked={item.isCompleted}
                                                onChange={(e) => handleCompleteTask(e, item.id)}
                                            />
                                            <span
                                                style={{
                                                    color: item.isCompleted ? "green" : "",
                                                }}
                                            >
                                                {item.task}
                                            </span>
                                        </div>
                                        {/* Delete Button */}
                                        <div className="col-4 d-flex justify-content-end">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            : <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '75vh' }}>
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
    )
}

export default TODOList
