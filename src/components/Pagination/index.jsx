import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { problemList } from '../../shared/data';

const Pagination = () => {

    const DATA_PER_PAGE =5;
    const [problems, setProblems] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [totalData, setTotalData] = useState(
        Array.from({ length: 30 }, () => ({ index: Math.floor(Math.random() * 1000) + 1 }))
    );
    const [data , setData] = useState([]);

    const totalPages = Math.ceil(totalData.length / DATA_PER_PAGE);
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

    useEffect(()=>{
        const newData = totalData.slice(0,DATA_PER_PAGE);
        setData(newData);

    } ,[ ]);
 
    const handlePageChange = (page, type) => {
        
        if (type === 'prev') {
            if (currentPage === 1) {
                return
            }
            setCurrentPage(currentPage - 1);
            const newData = totalData.splice(currentPage,DATA_PER_PAGE);
        setData(newData);
        } else if (type === 'next') {
            if (page === totalPages) {
                return
            }
            setCurrentPage(currentPage + 1)
            const newData = totalData.splice(currentPage,DATA_PER_PAGE);
            setData(newData);
        } else {
            setCurrentPage(page);
            const newData = totalData.splice(currentPage,DATA_PER_PAGE);
            setData(newData);
        }
    }
    console.log(currentPage , totalData);


    return (
        <>

            {problems !== null ?
                <div>
                    <div className="container">
                        <h2 className="text-center my-5">{problems?.title}</h2>
                        <div className="row d-flex justify-content-center mb-2">
                            <div className="col-12">
                                {problems?.description &&
                                    problems.description
                                        .split('.')
                                        .filter((item) => item.trim())
                                        .map((item, index) => (
                                            <p key={index}>{item.trim()}.</p>
                                        ))}
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mb-2">
                            <div className="col-12">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index + 1}>
                                                <th scope="row">{item.index}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mb-2">
                        <div className="col-12">
                            <div className="d-flex justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(1, 'prev')}>Previous</button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => {
                                                    // setCurrentPage(index + 1)
                                                    handlePageChange(index + 1, 'page')
                                                }
                                                }
                                                >{index + 1}</button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => {
                                                handlePageChange(1, 'next')
                                            }}>Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    </div>

                </div>
                : <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '75vh' }}>
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Pagination
