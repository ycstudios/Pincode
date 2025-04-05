import React, { useState } from "react";
import "./fatch.css";

function Fetch() {
    const [pincode, setPincode] = useState("");
    const [postOffices, setPostOffices] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fetchPostOffices = async () => {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();
    
            if (data && data[0] && data[0].PostOffice) {
                console.log(data)
                setPostOffices(data[0].PostOffice);
                setIsSubmitted(true);
            } else {
                setPostOffices([]);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };
    
    // Filtered list based on filter input
    const filteredOffices = postOffices.filter((office) =>
        office.Name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div>
            {!isSubmitted ? (
                <>
                    <h2>Enter Pincode</h2>
                    <input
                        className="input"
                        type="text"
                        placeholder="Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                    <br />
                    <button onClick={fetchPostOffices}>Lookup</button>
                </>
            ) : (
                <>
                    <h2>Post Offices in {pincode}</h2>
                    <p>
                        <span className="message">Message:</span> {filteredOffices.length} Post Office(s) Found
                    </p>

                    <input
                        type="text"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        placeholder="Filter by Name"
                        className="filter"
                    />

                    <div className="postofiicebox">
                        {filteredOffices.map((office, index) => (
                            <div key={index} className="postoffice">
                                <strong>Name:</strong> {office.Name} <br />
                                <strong>Branch Type:</strong> {office.BranchType} <br />
                                <strong>Delivery Status:</strong> {office.DeliveryStatus} <br />
                                <strong>District:</strong> {office.District} <br />
                                <strong>Division:</strong> {office.Division} <br />
                            </div>
                        ))}
                    </div>

                    <button onClick={() => {
                        setIsSubmitted(false);
                        setPostOffices([]);
                        setPincode("");
                        setFilterText("");
                    }}>Back</button>
                </>
            )}
        </div>
    );
}

export default Fetch;
