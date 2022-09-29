import React, { useState, useRef } from 'react';
import './style.css';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

function Title(props) {
    return (
        <div className='mb-3'>
            <h4 class='card-title'>{props.title.title}</h4>
            <h6 class='card-subtitle mb-2 text-muted'>{props.title.subtitle}</h6>
        </div>
    )
}

function InputForm(props) {
    return (
        <div className='mb-3'>
            <label for={props.for} className='form-label fw-semibold'>{props.label}</label>
            {props.children}
        </div>
    );
}

function Form(props) {
    const navigate = useNavigate();

    const state = {
        nickname: '',
        age: '',
        email: '',
        note: ''
    };
    
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
        alert(nickname + " " + age + " " + email + " " + note);
        event.preventDefault();
        navigate('/submitted');
    }

    return (
        <div className='container p-0 card bg-light position-absolute top-50 start-50 translate-middle shadow-lg'>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>

                    <Title title={title} />

                    <InputForm for='nickname' label='Nickname'>
                        <input type='text' value={nickname} ref={inputNickname} onChange={() => setNickname(inputNickname.current.value)} className='form-control shadow-sm' name='nickname' id='nickname' placeholder='Tito' required />
                    </InputForm>

                    <InputForm for='age' label='Age'>
                        <input type='number' value={age} ref={inputAge} onChange={() => setAge(inputAge.current.value)} className='form-control shadow-sm' name='age' id='age' placeholder='23' required />
                    </InputForm>

                    <InputForm for='email' label='Email Adress'>
                        <input type='email' value={email} ref={inputEmail} onChange={() => inputEmail.current.value} className='form-control shadow-sm' name='email' id='email' placeholder='name@example.com' />
                    </InputForm>

                    <InputForm for='note' label='Note'>
                        <textarea value={note} ref={inputNote} onChange={() => inputNote.current.value} className='form-control shadow-sm' name='note' id='note' rows='2'></textarea>
                    </InputForm>

                    <div className='text-center'>
                        <input type='submit' value='Submit' className='btn btn-dark shadow-sm' />
                    </div>

                </form>
            </div>
            <div class="card-footer text-center">
                © 2022 - Christopher Mendes - Made with Bootstrap and React
            </div>
        </div>

    );
}

export default function App() {
    const title = {
        title: 'Sample Form React',
        subtitle: 'Let me "know" you 😉'
    }
    return (
        <div>
            <div>
                <Routes>
                    <Route path="/submitted" element={<SubmittedPage />} />
                    <Route path="/" element={<Form title={title} />} />
                </Routes>
            </div>
        </div>
    );
}

function SubmittedPage() {
    return <h2>Submitted!</h2>;
}