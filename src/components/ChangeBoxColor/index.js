import React, { useEffect, useState } from 'react'
import './changebox.css'
import { useParams } from 'react-router-dom';
import { problemList } from '../../shared/data';

const ChangeBoxColor = () => {
  const [boxStates, setBoxStates] = useState(Array(7).fill('yellow'));
  const [orderClickBox, setOrderClickBox] = useState([])
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


  const handleBoxClick = (index) => {
    const newBoxStates = [...boxStates];
    newBoxStates[index] = newBoxStates[index] === 'yellow' ? 'green' : 'yellow';
    setBoxStates(newBoxStates);
    setOrderClickBox([...orderClickBox, index]);
  }

  const resetBoxState = async () => {
    for (let index of orderClickBox) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      boxStates[index] = 'yellow';
      setBoxStates([...boxStates]);
    }
    setOrderClickBox([])
  }

  useEffect(() => {
    const isAllGreen = boxStates.every((color) => color === 'green');
    if (isAllGreen) {
      resetBoxState();
    }

  }, [boxStates])


  return (
    problems !== null ?
      <div>
        <h2 className='text-center pt-4'>Change Box Color</h2>
        <p className='text-center'>Click on the box </p>
        <div className="containerr" style={{ display: 'flex', justifyContent: 'space-around' }}>
          {boxStates.map((color, index) => (
            <div
              key={index}
              // className={`box ${color}`}
              style={{
                backgroundColor: color,
                width: '100px',
                height: '100px',
                margin: '10px',
                cursor: 'pointer',
              }}
              onClick={() => handleBoxClick(index)}
            ></div>
          ))}
        </div>
      </div>
      : <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
  )
}

export default ChangeBoxColor