import React, { useState } from "react";
import { useNavigate } from "react-router";
import { servers } from "./components/statics";


export default function BoostForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        region: "",
        queueType: "",
        boostType: "",
        currentTier: "",
        currentDivision: "",
        desiredTier: "",
        desiredDivision: "",
        additionalNotes: "",
    });

    const handleFormChange = (e) => {
        const inputName = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    const [alert, setAlert] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const url = `${process.env.REACT_APP_API_HOST}/boost`;
        const response = await fetch(url, fetchConfig);
        let responseMessage = await response.json();

        if (response.status === 400) {
            setAlert(responseMessage);
        } else if (response.ok) {
            setFormData({
                region: "",
                queueType: "",
                boostType: "",
                currentTier: "",
                currentDivision: "",
                desiredTier: "",
                desiredDivision: "",
                additionalNotes: "",
            });
            navigate("/home");
        }
    };

    return (
        <div className="flex py-10 justify-center">
            <form onSubmit={handleSubmit} id="boostForm">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="queueType"
                        >
                            Region
                        </label>
                    <select onChange={handleFormChange} value={formData.region} required id="region" name= "region" className="form-select">
                            <option value=""></option>
                            {servers.map(server => {
                                return(
                                    <option key={server.id} value={server.name}>{server.name}</option>
                                )
                        })}
                        </select>
                    </div>
                    {/* <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="queueType"
                        >
                            Queue Type
                        </label>
                        <input
                            onChange={handleFormChange}
                            required
                            type="text"
                            id="queueType"
                            name="queueType"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={queueType}
                            placeholder="Queue Type"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="boostType"
                        >
                            Boost Type
                        </label>
                        <input
                            onChange={handleFormChange}
                            required
                            type="text"
                            id="boostType"
                            name="boostType"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={boostType}
                            placeholder="Boost Type"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="currentTier"
                        >
                            Current Tier
                        </label>
                        <input
                            onChange={handleCurrentTierChange}
                            required
                            type="text"
                            id="currentTier"
                            name="currentTier"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={currentTier}
                            placeholder="Current Tier"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="currentDivision"
                        >
                            Current Division
                        </label>
                        <input
                            onChange={handleCurrentDivisionChange}
                            required
                            type="text"
                            id="currentDivision"
                            name="currentDivision"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={currentDivision}
                            placeholder="Current Division"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="desiredTier"
                        >
                            Desired Tier
                        </label>
                        <input
                            onChange={handleDesiredTierChange}
                            required
                            type="text"
                            id="desiredTier"
                            name="desiredTier"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={desiredTier}
                            placeholder="Desired Tier"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="desiredDivision"
                        >
                            Desired Division
                        </label>
                        <input
                            onChange={handleDesiredDivisionChange}
                            required
                            type="text"
                            id="desiredDivision"
                            name="desiredDivision"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={desiredDivision}
                            placeholder="Desired Division"
                        />
                    </div> */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="additionalNotes"
                        >
                            Additional Notes
                        </label>
                        <textarea
                            onChange={handleFormChange}
                            id="additionalNotes"
                            name="additionalNotes"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.additionalNotes}
                            placeholder="Additional Notes"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                    {alert ? (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">Yikes!</strong>
                            <span className="block sm:inline"> {alert.detail}.</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg
                                    className="fill-current h-6 w-6 text-red-500"
                                    role="button"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <title>Close</title>
                                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                </svg>
                            </span>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </form>
        </div>
    );
}
