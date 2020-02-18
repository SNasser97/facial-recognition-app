import React, { Component } from "react";


class Register extends Component  {

	constructor(props) {
		super(props);
		this.state = {
			registerName:"",
			registerEmail:"",
			registerPassword:""
		}
	}
	onNameChange = (event) => {
		this.setState({registerName: event.target.value});
	}
	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
	}
	onSubmitRegister = (e) => {
		const { registerName, registerEmail,  registerPassword} =  this.state;
		const { onRouteChange, loadUser } =  this.props;

		const server_url =  "http://localhost:3001/register";
			fetch(server_url, 
				{	
					method:"post",
					headers:{"Content-Type": "application/json"},
					body:  JSON.stringify({
						name: registerName,
						email: registerEmail,
						password: registerPassword
					})
				})
				.then(resp => resp.json())
				.then((user) => {
					// display error label if missing
					const error = document.querySelector(".login__label--error");
					if(user !== "Error, registration failed") {
						loadUser(user);
						onRouteChange("home");
					} else {
						error.style.display="flex";
					}
				})
		e.preventDefault();
	}

	render() {
		const { onRouteChange } = this.props;
		const { onNameChange, onEmailChange, onPasswordChange, onSubmitRegister } = this;

		return (
			<main className="login">
				<form className="login__form" method="POST">
					<fieldset className="login__field">
						<legend className="login__legend fs--1">Register</legend>
					{ /* FORM INPUT FIELDS */ }
						{ /* REG-NAME */ }
						<div className="login__box login__box--name">
							<input onChange={ onNameChange } type="text" className="login__input fs--4" name="name" placeholder="Full name" required/>
							<label className="login__label" htmlFor="name">Name</label>
							<hr className="login__inputExpand"/>

						</div>
						{ /* REG-EMAIL */ }
						<div className="login__box login__box--email">
							<input onChange={ onEmailChange } type="email" className="login__input fs--4" name="email-address" placeholder="Email address" required/>
							<label className="login__label" htmlFor="email-address">Email</label>
							<hr className="login__inputExpand"/>

						</div>
						{ /* REG-PASSWORD */ }
						<div className="login__box login__box--password">
							<input onChange={ onPasswordChange } type="password" className="login__input fs--4" name="password" placeholder="Password" required/>
							<label htmlFor="password" className="login__label">Password</label>
							<hr className="login__inputExpand"/>
							
						</div>	
					</fieldset>
					{ /* FORM OPTIONS */ }
					<div className="login__box login__box--button">
						<label className="login__label--error fs--4">Please fill the form in with your details</label>
						<input 
							onClick={ onSubmitRegister } 
							type="submit" 
							className="login__submit btn btn__full fs--4" 
							value="Register"
						/>
					</div>
					<div className="login__options">
						<p 
							onClick={() => onRouteChange("signin") } 
							className="login__link login__link--register fs--4">I already have an account
						</p>
					</div>
				</form>
			</main>
		)
	}

}

export default Register;