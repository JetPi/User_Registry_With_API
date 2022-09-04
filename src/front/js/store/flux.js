const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || "",
			users: []
		},
		actions: {
			// Checks if user can signup
			signupValidityChecker: (user) =>{
				if (user.email == undefined || user.username == undefined || user.password == undefined){
					return false
				} else {
					if (user.email.trim() != "" && 
					(user.email.includes("@gmail.com") || user.email.includes("@outlook.com") || user.email.includes("@hotmail.com")) && 
					user.username.trim() != "" && 
					user.password.trim() != "" && 
					user.password.length >= 8){
						return true
					} 
					else {
						return false
					}
				}
			},

			// Checks if paramaters for login in exist
			loginValidityChecker: (user) =>{
				if (user.email.trim() != "" && user.password.trim() != ""){
					return true
				} 
				else {
					return false
				}
			},

			// Shows a register of all users, cannot be accessed without a token
			userRegister: async () => {
				let store = getStore();
				try {
					let response = await fetch(`http://172.16.0.7:3001/api/private`, {
						method: 'GET', 
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${store.token}`,
						},
						body: JSON.stringify(), 
					})
					if (response.ok) {
						let data = await response.json();
            			setStore({ users: data });
						return true
					} else{
						return false
					}
				} catch (error){
					console.log(`Error: ${error}`)
				}
			},

			test: ()=>{
				console.log("Hello")
			},

			// Adds a user to the database
			userSignup: async (user) =>{
				try {
					let response = await fetch(`http://172.16.0.7:3001/api/signup`, {
						method: 'POST', 
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user), 
					})
					if (response.ok) {
						return true
					} else {
						return false
					}
				} catch (error){
					console.log(`Error: ${error}`)
				}
			},

			//Recieves a user object and logs them in, generating a token for future authentication
			userLogin: async (user) => {
				try {
					let response = await fetch(`http://172.16.0.7:3001/api/login`, {
						method: 'POST', 
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user), 
					})
					if (response.ok) {
						let data = await response.json()
						setStore({token: data.token})
						localStorage.setItem("token", data.token)
						return true
					} else {
						return false
					}
				} catch (error){
					console.log(`Error: ${error}`)
				}
			},

			//Logouts the user
			userLogout: () => {
				localStorage.removeItem("token"),
				setStore({token: ""})
				alert("Succesfully logged out")
			}
		}
	};
};

export default getState;
