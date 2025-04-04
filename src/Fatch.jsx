import React, { useState } from "react";
import "./fatch.css";

function Fetch() {
    const [pincode, setPincode] = useState("");
    const [postOffices, setPostOffices] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);     // for  rendering on the base of submited status



    const fetchPostOffices = () => {


        fetch(`https://api.postalpincode.in/pincode/${pincode}`) //fetch of input pincode
            .then((res) => res.json()) // convert to json
            .then((data) => {
              

                if (data ) { //if data is there than it will be added to the setpostOffices
                    setPostOffices(data[0].PostOffice); 
                    setIsSubmitted(true);//it will make is sumited true which will help to show data if it is fetched from api
                } else {
                    setPostOffices([]);// if not than it will keep it empty
                }
            })
            .catch((err) => {
       
                console.error("Error fetching data:", err); //handel api error if any
            });
    };

    return (
        <div>
            {!isSubmitted ? ( //it will help for conditional rederning based on if pincode is submited
                <>
                    <h2>Enter Pincode</h2>
                    <input
                        className="input"
                        type="text"
                        placeholder="Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)} //store data in the pincode state
                    />
                    <br />
                    <button onClick={fetchPostOffices}>Lookup</button>
                    
            
                </>
            ) : (
                <>
                    <h2>Post Offices in {pincode}</h2>
                    <p><span className="message">Message:</span> {postOffices.length} Post Office(s) Found</p>
                    
                    {
                        <ul>
                            {postOffices.map((office, index) => (
                                <li key={index}>
                                    <strong>Name:</strong> {office.Name} <br />
                                    <strong>Branch Type:</strong> {office.BranchType} <br />
                                    <strong>Delivery Status:</strong> {office.DeliveryStatus} <br />
                                    <strong>District:</strong> {office.District} <br />
                                    <strong>Division:</strong> {office.Division} <br />
                                    <hr />
                                </li>
                            ))}
                        </ul>}

                    <button onClick={() => setIsSubmitted(false)}>Back</button>
                </>
            )}
        </div>
    );
}

export default Fetch;
