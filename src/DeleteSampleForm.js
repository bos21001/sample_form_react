import React, {useEffect, useState} from "react";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

export default function DeleteSampleForm(access_token) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sampleForm, setSampleForm] = useState([]);

    useEffect(() => {
        fetch("http://api.sample-form.local/v1/sample-forms/" + window.location.search.slice(1),
            {
                method: "DELETE",
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
        return(
            <div>
                <p>Deleted! {sampleForm}</p>
            </div>
        );

    }
}