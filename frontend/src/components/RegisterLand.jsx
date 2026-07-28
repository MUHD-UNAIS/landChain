import { useState } from "react";
import axios from "axios";

function RegisterLand() {
    const [formData, setFormData] = useState({
        landId: "",
        ownerName: "",
        surveyNumber: "",
        location: "",
        area: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const registerLand = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/register-land",
                formData
            );

            alert(response.data.message);

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <form onSubmit={registerLand}>
            <input
                name="landId"
                placeholder="Land ID"
                onChange={handleChange}
            />

            <input
                name="ownerName"
                placeholder="Owner Name"
                onChange={handleChange}
            />

            <input
                name="surveyNumber"
                placeholder="Survey Number"
                onChange={handleChange}
            />

            <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
            />

            <input
                name="area"
                placeholder="Area"
                onChange={handleChange}
            />

            <button type="submit">
                Register Land
            </button>
        </form>
    );
}

export default RegisterLand;