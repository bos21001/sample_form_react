import React from 'react';
import {useLocation} from 'react-router-dom';
import CreateSampleForm from "./CreateSampleForm";

function FetchGetAllSampleForms(props) {
    if (props.token !== "logging") {
        return (CreateSampleForm(props.token, props.data));
    } else {
        return (<div className="spinner-border position-absolute top-50 start-50" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>);
    }
}

export default function SubmittedPage(props) {
    /**
     * @return {React} The submmited page with the variables from app()
     */
    const location = useLocation();

    const nickname = location.state.submittedInputs[0];
    const age = location.state.submittedInputs[1];
    const email = location.state.submittedInputs[2];
    const note = location.state.submittedInputs[3]


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active"><a href="/" className={"text-warning"}>Home</a></li>
                    <li className="breadcrumb-item active"><a href="/get-all-sample-form" className={"text-warning"}>Get All</a></li>
                    <li className="breadcrumb-item" aria-current="page">Submitted</li>
                </ol>
            </nav>
            <div className='container p-0 card bg-light position-absolute top-50 start-50 translate-middle shadow-lg'
                 style={{"maxWidth": "40rem"}}>
                <FetchGetAllSampleForms token={props.access_token} data={location}/>
                <div className='text-center'>
                    <h4>Thank You!</h4>
                    <span className="bi bi-check-circle-fill text-success h1"/>
                    <h5 className="text-secondary">Your data has been sent.</h5>
                    <h6 className="text-secondary">Checkout bellow what we received</h6>
                </div>

                <div className="card-footer text-muted m-0">
                    <h6 className='text-center fw-semibold'>Received Data:</h6>
                    <hr className="mt-0"></hr>
                    <p className='fw-light'><strong className='fw-semibold'>Nickname:</strong> {nickname}</p>
                    <p className='fw-light'><strong className='fw-semibold'>Age:</strong> {age}</p>
                    <p className='fw-light'><strong className='fw-semibold'>Email:</strong> {email}</p>
                    <p className='fw-light'><strong className='fw-semibold'>Note:</strong> {note}</p>
                </div>
                <div className="card-footer text-center">
                    © 2022 - Christopher Mendes - Made with Bootstrap and React
                </div>
            </div>
        </div>
    );
}
