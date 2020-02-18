import React, { Component } from "react";
// import 
class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail:"",
			signInPassword:""
		}
	}
	onEmailChange = (event) => {
		// console.log(event.target.value);
		this.setState({signInEmail: event.target.value});
	}
	onPasswordChange = (event) => {
		// console.log(event.target.value);
		this.setState({signInPassword: event.target.value});
	}
	onSubmitSignIn =  (e) => {
		const { signInEmail, signInPassword } =  this.state;
		const { onRouteChange, loadUser } =  this.props;

		const server_url =  "http://localhost:3001/signin";
			fetch(server_url, 
				{	
					method:"post",
					headers:{"Content-Type": "application/json"},
					body:  JSON.stringify({
						email: signInEmail,
						password: signInPassword
					})
				})
				.then(resp => resp.json())
				.then((user) => {
					// display error label if data incorrect/missing
					const error = document.querySelector(".login__label--error");
					if(user.id) {
						loadUser(user);
						onRouteChange("home");
					} else {
						error.style.display="flex";
					}
					// user.id ? onRouteChange("home") : error.style.display="flex";
				})
		e.preventDefault();
	}

	render() {
		const { onRouteChange } = this.props;
		const { onSubmitSignIn, onPasswordChange, onEmailChange } = this;
		return (
			<main className="login">
				<form className="login__form" method="POST">
					<fieldset className="login__field">
						<legend className="login__legend fs--1">Sign In</legend>
					{ /* FORM INPUT FIELDS */ }
						<div className="login__box login__box--email">
						
							
							<input onChange={ onEmailChange } type="email" className="login__input fs--4" name="email-address" placeholder="Email address" required/>
							<label className="login__label" htmlFor="email-address">Email</label>
							<hr className="login__inputExpand"/>
						</div>

						<div className="login__box login__box--password">
							<input onChange={ onPasswordChange } type="password" className="login__input fs--4" name="password" placeholder="Password" required/>
							<label htmlFor="password" className="login__label">Password</label>
							<hr className="login__inputExpand"/>
						</div>	
					</fieldset>
					{ /* FORM OPTIONS */ }
					<div className="login__box login__box--button">
						<label className="login__label--error fs--4">Incorrect email or password</label>
						<input 
							onClick={ onSubmitSignIn } 
							type="submit" 
							className="login__submit btn btn__ghost fs--4" 
							value="Sign In"
						/>
					</div>
					<div className="login__options">
						<p 
							onClick={() => onRouteChange("register") } 
							className="login__link login__link--register fs--4">New user? Register!
						</p>
					</div>
				</form>
			</main>
		)
	}
}
// const SignIn = ({ onRouteChange }) => {
	
// }

export default SignIn;