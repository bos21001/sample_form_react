import React, {useRef, useState} from 'react';
import './style.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import SubmittedPage from './SubmittedPage';
import LogInApi from "./LoginApi";
import GetAllSampleForms from "./GetAllSampleForms";
import GetSampleForm from "./GetSampleForm";
import DeleteSampleForm from "./DeleteSampleForm";

function Title(props) {
    /**
     * Returns title and subtitle to the card with bootstrap.
     * @param {Array} title - With title and subtitle
     * @return reactjs html
     */
    return (
        <div className='mb-3'>
            <h4 className='card-title'>{props.title.title}</h4>
            <h6 className='card-subtitle mb-2 text-muted'>{props.title.subtitle}</h6>
        </div>
    )
}

function InputForm(props) {
    /**
     * Returns the frame an Input must follow.
     * @param {String} for - for: The reference to the input. label: The label to the input
     * @return {String} reactjs html
     */
    return (
        <div className='mb-3'>
            <label htmlFor={props.for} className='form-label fw-semibold'>{props.label}</label>
            {props.children}
        </div>
    );
}


function FetchGetAllSampleForms(props) {
    if (props.token !== "logging") {
        return (GetAllSampleForms(props.token));
    } else {
        return (<div className="spinner-border position-absolute top-50 start-50" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>);
    }
}

function FetchGetSampleForm(props) {
    if (props.token !== "logging") {
        return (GetSampleForm(props.token));
    } else {
        return (<div className="spinner-border position-absolute top-50 start-50" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>);
    }
}

function FetchDeleteSampleForm(props) {
    if (props.token !== "logging") {
        return (DeleteSampleForm(props.token));
    } else {
        return (<div className="spinner-border position-absolute top-50 start-50" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>);
    }
}

function Form(props) {
    /**
     * Returns the form within a bootstrap well-designed
     * @param {String} title - tile (array): The title and subtitle
     * @return {String} reactjs html form
     */
    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");

    const inputNickname = useRef(null);
    const inputAge = useRef(null);
    const inputEmail = useRef(null);
    const inputNote = useRef(null);

    const title = props.title;

    const handleSubmit = event => {
        const formInputs = [nickname, age, email, note]
        event.preventDefault();
        navigate('/submitted', {state: {submittedInputs: formInputs}});
    }

    return (
        <div className='container p-0 card bg-light position-absolute top-50 start-50 translate-middle shadow-lg'>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>

                    <Title title={title}/>

                    <InputForm for='nickname' label='Nickname'>
                        <input type='text' value={nickname} ref={inputNickname}
                               onChange={() => setNickname(inputNickname.current.value)}
                               className='form-control shadow-sm' name='nickname' id='nickname' placeholder='Tito'
                               required/>
                    </InputForm>

                    <InputForm for='age' label='Age'>
                        <input type='number' value={age} ref={inputAge} onChange={() => setAge(inputAge.current.value)}
                               className='form-control shadow-sm' name='age' id='age' placeholder='23' required/>
                    </InputForm>

                    <InputForm for='email' label='Email Address'>
                        <input type='email' value={email} ref={inputEmail}
                               onChange={() => setEmail(inputEmail.current.value)} className='form-control shadow-sm'
                               name='email' id='email' placeholder='name@example.com'/>
                    </InputForm>

                    <InputForm for='note' label='Note'>
                        <textarea value={note} ref={inputNote} onChange={() => setNote(inputNote.current.value)}
                                  className='form-control shadow-sm' name='note' id='note' rows='2'></textarea>
                    </InputForm>

                    <div className='text-center'>
                        <input type='submit' value='Submit' className='btn btn-dark shadow-sm'/>
                    </div>

                </form>
            </div>
            <div className="card-footer text-center">
                © 2022 - Christopher Mendes - Made with Bootstrap and React
            </div>
        </div>

    );
}

export default function App() {
    /**
     * @return {String} The main app
     */
    const title = {
        title: 'Sample Form React',
        subtitle: 'Let me "know" you 😉'
    }

    const access_token = LogInApi();
    return (
        <div>
            <div>
                <Routes>
                    <Route path="/submitted" element={<SubmittedPage access_token={access_token}/>}/>
                    <Route path="/get-all-sample-form" element={<FetchGetAllSampleForms token={access_token}/>}/>
                    <Route path="/get-sample-form" element={<FetchGetSampleForm token={access_token}/>}/>
                    <Route path="/delete-sample-form" element={<FetchDeleteSampleForm token={access_token}/>}/>
                    <Route path="/" element={<Form title={title}/>}/>
                </Routes>
            </div>
        </div>
    );
}
