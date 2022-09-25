import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

function Title(props) {
    return (
        <div className='mb-3'>
            <h4 class='card-title'>{props.title.title}</h4>
            <h6 class='card-subtitle mb-2 text-muted'>{props.title.subtitle}</h6>
        </div>
    )
}

function NicknameInput() {
    return (
        <div className='mb-3'>
            <label for='nicknameInput' className='form-label fw-semibold'>Nickname</label>
            <input type='text' className='form-control shadow-sm' name='nickname' id='nicknameInput' placeholder='Tito' required />
        </div>
    );
}

function AgeInput() {
    return (
        <div className='mb-3'>
            <label for='ageInput' className='form-label fw-semibold'>Age</label>
            <input type='number' className='form-control shadow-sm' name='age' id='ageInput' placeholder='23' required />
        </div>
    );
}

function EmailInput() {
    return (
        <div className='mb-3'>
            <label for='emailInput' className='form-label fw-semibold'>Email address</label>
            <input type='email' className='form-control shadow-sm' name='email' id='emailInput' placeholder='name@example.com' />
        </div>
    );
}

function NoteInput() {
    return (
        <div className='mb-3'>
            <label for='noteTextarea' className='form-label fw-semibold'>Note</label>
            <textarea className='form-control shadow-sm' name='note' id='noteTextarea' rows='2'></textarea>
        </div>
    );
}

function App(props) {
    return (
        <div className='container p-0 card bg-light position-absolute top-50 start-50 translate-middle shadow-lg'>
            <div className='card-body'>
                <form action='post'>
                    <Title title={props.title} />
                    <NicknameInput />
                    <AgeInput />
                    <EmailInput />
                    <NoteInput />
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

const title = {
    title: 'Sample Form React',
    subtitle: 'Let me "know" you 😉'
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App
        title={title}
    />
);
