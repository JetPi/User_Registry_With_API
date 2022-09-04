import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const UserRegister = () => {
	const { store, actions } = useContext(Context);
	let navigate = useNavigate()
	
	useEffect(() =>{
		if (store.token != ""){
			let result = actions.userRegister()
			if (result){
				console.log("User retrieval succesful")
			}
		} else{
			console.log("Failure")
		}
	}, [])

	return (
		<div className="container">
			<div className="col-12 my-1 fs-1 d-flex justify-content-center">
				User Register
			</div>
			<ul className="col-12 my-1 d-flex justify-content-center align-items-center flex-column">
				{store.users.map((element,index) => {
					return (
					<li className="col-8" key={index}>
						Username: {element.username} <br/>
						Email: {element.email} <br/>
						Salt: {element.salt} <br/> 
					</li>)
				})
				}
			</ul>
		</div>
	);
};