import React, {useEffect, useState} from "react";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

export default function setCreateSampleForm(access_token, data) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [createSampleForm, setCreateSampleForm] = useState([]);

    useEffect(() => {
        fetch("http://api.sample-form.local/v1/sample-forms?nickname=" + data.state.submittedInputs[0] + "&age=" + data.state.submittedInputs[1] + "&email=" + data.state.submittedInputs[2] + "&note=" + data.state.submittedInputs[3],
            {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "authorization": `Bearer ${access_token}`
                },
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCreateSampleForm(result);
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
        console.log("Data successfully sent to the database!!");
        console.log(createSampleForm);
    }
}