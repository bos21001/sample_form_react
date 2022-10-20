import React, {useEffect, useState} from "react";

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
                <div className='container p-0 card bg-light shadow-lg position-absolute top-50 start-50 translate-middle '>
                    <div className="card-body mt-1" style={{'maxHeight': "500px", 'overflowY': 'auto'}}>
                        <blockquote className="blockquote mb-0">
                            {allSampleForms.data.map((data) => {
                                return (
                                    <div className='list-group mt-1 ms-1 me-1'>
                                        <a href='#' className='list-group-item list-group-item-action'
                                           aria-current='true'>
                                            <div className='d-flex w-100 justify-content-between'>
                                                <h5 className='mb-1'>{data.nickname}, {data.age}</h5>
                                                <small>{data.created_at}</small>
                                            </div>
                                            <p className='mb-1'>{data.note}</p>
                                            <small>{data.email}</small>
                                        </a>
                                    </div>
                                );
                            })}
                        </blockquote>
                    </div>
                        <div className="card-footer text-center">
                            © 2022 - Christopher Mendes - Made with Bootstrap and React
                        </div>
                </div>
            </div>
        );
    }
}