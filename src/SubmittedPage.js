import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SubmittedPage() {
    const location = useLocation();

    const nickname = location.state.submittedInputs[0];
    const age = location.state.submittedInputs[1];
    const email = location.state.submittedInputs[2];
    const note = location.state.submittedInputs[3]

    return (
        <div className='container p-0 card bg-light position-absolute top-50 start-50 translate-middle shadow-lg' style={{ 'max-width': "40rem" }}>
            <div class='text-center'>
                <h4>Thank You!</h4>
                <h1 class="bi bi-check-circle-fill text-success"></h1>
                <h5 class="text-secondary">Your data has been sent.</h5>
                <h6 class="text-secondary">Checkout bellow what we received</h6>
            </div>

            <div class="card-footer text-muted m-0">
                <h6 class='text-center fw-semibold'>Received Data:</h6>
                <hr class="mt-0"></hr>
                <p class='fw-light'><strong class='fw-semibold'>Nickname:</strong> {nickname}</p>
                <p class='fw-light'><strong class='fw-semibold'>Age:</strong> {age}</p>
                <p class='fw-light'><strong class='fw-semibold'>Email:</strong> {email}</p>
                <p class='fw-light'><strong class='fw-semibold'>Note:</strong> {note}</p>
            </div>
            <div class="card-footer text-center">
                © 2022 - Christopher Mendes - Made with Bootstrap and React
            </div>
        </div>
    );
}
