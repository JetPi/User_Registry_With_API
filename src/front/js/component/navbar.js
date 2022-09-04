import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div className="d-flex justify-content-center col-sm-12">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">React Boilerplate</span>
					</Link>
				</div>
				<div className="mx-auto col-md-3 col-sm-6 d-flex justify-content-center my1">
					<Link to="/users">
						<button className="btn btn-primary">Register of users</button>
					</Link>
				</div>
				<div className="mx-auto col-md-3 col-sm-6 d-flex justify-content-center my-1">
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
				</div>
				<div className="mx-auto col-md-3 col-sm-6 d-flex justify-content-center my-1">
					<Link to="/signup">
						<button className="btn btn-primary">Signup</button>
					</Link>
				</div>
				<div className="mx-auto col-md-3 col-sm-6 d-flex justify-content-center my-1">
					<button className="btn btn-primary" onClick={actions.userLogout}>Logout</button>
				</div>
			</div>
		</nav>
	);
};
