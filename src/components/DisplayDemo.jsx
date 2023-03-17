import axios from "axios";
import { useState } from "react";
import React from "react";

const DisplayDemo = () => {
    const [feedings, setFeedings] = useState([]);

    const getAll = async () => {
        await axios.get("http://localhost:5000")
        .then((res) => console.log(res.data))
        .catch(err => console.log(err));
    }
    
    return (
        <div>
            Display data: 

            <div>
                <button onClick={() => getAll()}>Display all</button>
            </div>

            <div>
                {
                    feedings.map((item, index) => {
                        return (
                            <div key={index}>
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DisplayDemo;