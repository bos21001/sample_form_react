import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

export default function UpdateSampleForm() {
    const location = useLocation();

    const nickname = location.state.updatedInputs[0];
    const age = location.state.updatedInputs[1];
    const email = location.state.updatedInputs[2];
    const note = location.state.updatedInputs[3];
    const id = location.state.updatedInputs[4];
    const access_token = location.state.updatedInputs[5];

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [updateSampleForm, setUpdateSampleForm] = useState([]);

    var url = `http://api.sample-form.local/v1/sample-forms/${id}?`;

    if (nickname !== "") {
        url += `nickname=${nickname}`;
    }

    if (age !== "") {
        url += `&age=${age}`;
    }

    if (email !== "") {
        url += `&email=${email}`;
    }

    if (note !== "") {
        url += `&note=${note}`;
    }

    useEffect(() => {
        fetch(url,
            {
                method: "PATCH",
                headers: {
                    "accept": "application/json",
                    "authorization": `Bearer ${access_token}`
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setUpdateSampleForm(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        console.log(`Error: ${error.message}`);
    } else if (!isLoaded) {
        sleep(550)
        console.log("loading...");
    } else {
        console.log(updateSampleForm);
        return (window.location.assign("/get-all-sample-form"));
    }
}