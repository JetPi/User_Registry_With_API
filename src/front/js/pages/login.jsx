import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);

    const [userData, setUserData] = useState(initialState)

    let initialState = {
        email: "",
        password: "",
    }

    let handleSubmit = async (event) =>{
        event.preventDefault()
        if (actions.loginValidityChecker(userData))
        {
            await actions.userLogin(userData)
        } 
    }

    let handleChange = ({ target }) =>{
		setUserData({
            ...userData,
            [target.name]: target.value,
        })
    };

	return (
		<div>
            <div className="container d-flex justify-content-center">
                <form className="col-8" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            name="email"
                            onChange={handleChange}
                            className="form-control"
                            id="email" 
                            aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password"
                            name="password"
                            onChange={handleChange} 
                            className="form-control" 
                            id="password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
		</div>
	);
};