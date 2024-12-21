import React, { useEffect, useState } from 'react'
import { problemList } from '../../shared/data';
import { useParams } from 'react-router-dom';

const Timer = () => {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [problems, setProblems] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      const getProblem = problemList.filter((item) => item.title === id)
      if (getProblem.length > 0) {
        setTimeout(() => {
            setProblems(getProblem[0])
        }, 3000);

    } else {
        setProblems(null)
    }
    }
  }, [id]);


  const handleClick = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    problems !== null ?
      <div>
        <h2 className='text-center my-5'>{problems.title}</h2>
        <div class="row d-flex justify-content-center mb-5">
          <div class="col-7">
            {problems && problems.description && problems.description.split('.').map((item) => (
              <p>{item}</p>
            ))}
          </div>

        </div>

        <div className='row'>
          <div className='col-12 d-flex justify-content-center text-center self-center'>
            <p
              style={{
                height: '100px',
                width: '100px',
                borderRadius: '50%',
                backgroundColor: 'Highlight',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: '#000',
              }}
            >
              {time}
            </p>
          </div>
          <div className='col-12 d-flex justify-content-center'>
            <button className='btn btn-primary' onClick={handleClick}>{isRunning ? 'Stop' : 'Start'} </button>

            <button className='btn btn-success mx-3' onClick={handleReset}>Reset</button>
          </div>'
        </div>
      </div>
      : <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '75vh' }}>
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
  )
}

export default Timer
