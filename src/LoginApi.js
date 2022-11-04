import React, {useEffect, useState} from "react";

export default function LogInApi() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [access_token, setAccessToken] = useState([]);

    useEffect(() => {
        fetch("http://api.sample-form.local/v1/clients/web/login?email=admin@admin.com&password=admin",
            {method: "POST"},
            {headers: {"accept" : "application/json"}})
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAccessToken(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return "logging";
    } else {
        return(
            access_token.access_token.toString()
        );
    }
}