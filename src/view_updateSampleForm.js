import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

function Title(props) {
    /**
     * Returns title and subtitle to the card with bootstrap.
     * @param {Array} title - With title and subtitle
     * @return reactjs html
     */
    return (
        <div className='mb-3'>
            <h4 className='card-title'>{props.title}</h4>
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

export default function view_UpdateSampleForm(access_token) {
    const sample_form = window.location.search.slice(1).split("?");
    const sample_form_id = sample_form[0];
    const sample_form_nickname = sample_form[1];
    const sample_form_age = parseInt(sample_form[2]);
    const sample_form_email = sample_form[3];
    const sample_form_note = sample_form[4];
    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");

    const inputNickname = useRef(null);
    const inputAge = useRef(null);
    const inputEmail = useRef(null);
    const inputNote = useRef(null);

    const handleSubmit = event => {
        const formInputs = [nickname, age, email, note, sample_form_id, access_token]
        event.preventDefault();
        navigate('/updated', {state: {updatedInputs: formInputs}});
    }

    if (sample_form_id === "") {
        window.location.assign("/get-all-sample-form");
    } else {
        return (
            <div
                className='container p-0 card bg-light position-absolute top-50 start-50 translate-middle shadow-lg'
                style={{"maxWidth": "40rem"}}>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>

                        <Title title={"Update data of: " + sample_form_nickname}/>

                        <InputForm for='nickname' label='Nickname'>
                            <input type='text' value={nickname} ref={inputNickname}
                                   onChange={() => setNickname(inputNickname.current.value)}
                                   className='form-control shadow-sm' name='nickname' id='nickname' placeholder={sample_form_nickname}/>
                        </InputForm>

                        <InputForm for='age' label='Age'>
                            <input type='number' value={age} ref={inputAge}
                                   onChange={() => setAge(inputAge.current.value)}
                                   className='form-control shadow-sm' name='age' id='age' placeholder={sample_form_age}/>
                        </InputForm>

                        <InputForm for='email' label='Email Address'>
                            <input type='email' value={email} ref={inputEmail}
                                   onChange={() => setEmail(inputEmail.current.value)}
                                   className='form-control shadow-sm'
                                   name='email' id='email' placeholder={sample_form_email}/>
                        </InputForm>

                        <InputForm for='note' label='Note'>
                        <textarea value={note} ref={inputNote} onChange={() => setNote(inputNote.current.value)}
                                  className='form-control shadow-sm' name='note' id='note' rows='2' placeholder={sample_form_note}></textarea>
                        </InputForm>

                        <div className='text-center'>
                            <input type='submit' value='Update' className='btn btn-warning shadow-sm'/>
                        </div>

                    </form>
                </div>
                <div className="card-footer text-center">
                    © 2022 - Christopher Mendes - Made with Bootstrap and React
                </div>
            </div>
        );
    }
}