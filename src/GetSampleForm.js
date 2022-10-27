import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

export default function GetSampleForm(access_token) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sampleForm, setSampleForm] = useState([]);

    useEffect(() => {
        fetch("http://api.sample-form.local/v1/sample-forms/" + window.location.search.slice(1),
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
                    setSampleForm(result);
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
                <div
                    className='container p-0 card bg-light position-absolute top-50 start-50 translate-middle shadow-lg'
                    style={{"maxWidth": "40rem"}}>
                    <div className="card-body mt-1" style={{'maxHeight': "500px", 'overflowY': 'auto'}}>
                        <h6 className='text-center text-muted'><span
                            className='fw-bold'>Created at:</span> {sampleForm.data.created_at}</h6>
                        <hr className="mt-0"></hr>
                        <p className='fw-light'><strong
                            className='fw-semibold'>Nickname:</strong> {sampleForm.data.nickname}</p>
                        <p className='fw-light'><strong className='fw-semibold'>Age:</strong> {sampleForm.data.age}</p>
                        <p className='fw-light'><strong className='fw-semibold'>Email:</strong> {sampleForm.data.email}
                        </p>
                        <p className='fw-light'><strong className='fw-semibold'>Note:</strong> {sampleForm.data.note}
                        </p>
                        <p className='text-muted'>Updated at: {sampleForm.data.updated_at}</p>
                    </div>
                    <div className={"text-end me-2"}>
                        <Link className={"text-danger"} to={{pathname: "/delete-sample-form", search: sampleForm.data.id}}>
                            <i className="bi bi-trash-fill"></i>
                        </Link>
                    </div>

                    <div className="card-footer text-center">
                        © 2022 - Christopher Mendes - Made with Bootstrap and React
                    </div>
                </div>
            </div>
        );

    }
}