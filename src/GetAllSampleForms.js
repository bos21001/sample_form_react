import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

export default function GetAllSampleForms(access_token) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [allSampleForms, setAllSampleForms] = useState([]);

    useEffect(() => {
        fetch("http://api.sample-form.local/v1/sample-forms",
            {
                headers: {
                    "accept": "application/json",
                    "authorization": `Bearer ${access_token}`
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAllSampleForms(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return (`Error: ${error.message}`);
    } else if (!isLoaded) {
        sleep(550)
        return (<div className="spinner-border position-absolute top-50 start-50" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>);
    } else {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active"><a href="/" className={"text-warning"}>Home</a></li>
                        <li className="breadcrumb-item" aria-current="page">Get All</li>
                    </ol>
                </nav>
                <div
                    className='container p-0 card bg-light shadow-lg position-absolute top-50 start-50 translate-middle '>
                    <div className="card-body mt-1" style={{'maxHeight': "500px", 'overflowY': 'auto'}}>
                        <blockquote className="blockquote mb-0">
                            {allSampleForms.data.map((data) => {
                                return (
                                    <div className='list-group mt-1 ms-1 me-1' key={data.id}>
                                        <Link to={{pathname: "/get-sample-form", search: data.id}}
                                              className='list-group-item list-group-item-action'
                                              aria-current='true'>
                                            <div className='d-flex w-100 justify-content-between'>
                                                <h5 className='mb-1'>{data.nickname}, {data.age}</h5>
                                                <small>{data.created_at}</small>
                                            </div>
                                            <p className='mb-1'>{data.note}</p>
                                            <small>{data.email}</small>
                                        </Link>
                                        <div className={"text-end"}>
                                            <Link className={"text-dark pe-2"}
                                                  to={{
                                                      pathname: "/update-sample-form",
                                                      search: `${data.id}?${data.nickname}?${data.age}?${data.email}?${data.note}`
                                                  }}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Link>
                                            <Link className={"text-danger"}
                                                  to={{pathname: "/delete-sample-form", search: data.id}}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </blockquote>
                    </div>
                    <div className="card-footer text-center">
                        ?? 2022 - Christopher Mendes - Made with Bootstrap and React
                    </div>
                </div>
            </div>
        );
    }
}