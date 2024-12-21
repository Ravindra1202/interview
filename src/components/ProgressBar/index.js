import React, { useState } from 'react'
import { useEffect } from 'react';
import { problemList } from '../../shared/data';
import { useParams } from 'react-router-dom';

const ProgressBar = () => {

    const interval = 5;
    const [progress, setProgress] = useState(0);
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


    useEffect(() => {
        const timer = setInterval(() => {

            setProgress(oldProgress => {
                if (oldProgress >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return oldProgress + interval;

            });

        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [interval]);

    return (
        problems !== null ?
            <div>
                <h2 className='text-center my-5'>{problems?.title}</h2>
                <div class="row d-flex justify-content-center mb-5">
                    <div class="col-7">
                        {problems && problems.description && problems.description.split('.').map((item) => (
                            <p>{item}</p>
                        ))}
                    </div>

                </div>
                <div className="progress mt-5">
                    <div className="progress-bar" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ width: `${progress}%` }}>
                        {progress}%
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

export default ProgressBar
