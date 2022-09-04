import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Signup = () => {
	const { actions } = useContext(Context);

    const [userData, setUserData] = useState(initialState)
    let initialState = {
        email: "",
        username: "",
        password: "",
    }

    let handleSubmit = async (event) =>{
        event.preventDefault()
        if (actions.signupValidityChecker(userData))
        {
            await actions.userSignup(userData)
        } else{
            alert("Invalid Parameters")
        }
    }

    let handleChange = ({ target }) =>{
		setUserData({
            ...userData,
            [target.name]: target.value,
        })
    };

	return (
		<div className="container d-flex flex-column justify-content-center align-items-center">
            <div className="col-8 my-2">
                <p>
                    Remember to input a valid Gmail, Hotmail or Outlook address <br/>
                    The password must be atleast 8 characters long
                </p>
            </div>
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

                <div className="mb-3 ">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input  
                        name="username"
                        onChange={handleChange}
                        className="form-control" 
                        id="username"
                    />
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
	);
};

export default Signup;