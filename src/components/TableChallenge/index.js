import React, { useEffect, useState } from 'react'
import { problemList } from '../../shared/data';
import { useParams } from 'react-router-dom';

const TableChallenge = () => {

    const [data, setData] = useState([]);
    const [rendredData, setRenderedData] = useState([]);

    const [search, setSearch] = useState('');
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

        getData();
    }, []);

    const getData = async () => {
        const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
        if (response.status === 200) {

            const data = await response.json();
            setData(data.data);
            setRenderedData(data.data);
        }
    }
    const handleChange = (e) => {
        const { value } = e.target;
        const searchTerm = value?.toUpperCase().trim() || '';
        setSearch(searchTerm);


        // if (searchTerm.length > 0) {
        setTimeout(() => {
            if (searchTerm.length > 0) {
                const filteredData = data.filter((item) => {
                    const year = item.Year?.toString().toUpperCase() || '';
                    const population = item.Population?.toString().toUpperCase() || '';
                    return year.includes(searchTerm) || population.includes(searchTerm);
                });
                setRenderedData(filteredData);

            } else {
                setRenderedData(data);
            }
        }, 1000);
        // } else {
        //     setRenderedData(data);
        // }
    };

    const handleReset = () => {
        setRenderedData(data);
        setSearch('');
    }

    const handleDelete = (Year) => {
        const deletedData = rendredData.filter((item) => item.Year !== Year);
        setRenderedData(deletedData);
    }
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
                    <div className='col-3 px-5 py-5'>
                        <label className='form-label'>Search</label>
                        <input className='form-controll outline-none w-100' value={search} onChange={handleChange} />
                    </div>
                    <div className='col-9 px-5 py-5 d-flex justify-content-end'>
                        <button className='btn btn-primary' onClick={handleReset}>Reset</button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Country</th>
                            <th scope="col">Year</th>
                            <th scope="col">Population</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rendredData && rendredData.length > 0 && rendredData.map((pop, index) =>
                            <tr key={pop.Year}>
                                <th scope="row">{pop['ID Nation']}</th>
                                <td>{pop.Nation}</td>
                                <td>{pop.Year}</td>
                                <td>{pop.Population}</td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(pop.Year)}>Delete</button></td>
                            </tr>
                        )}


                    </tbody>
                </table>

            </div>
            : <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '75vh' }}>
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
    )
}

export default TableChallenge
