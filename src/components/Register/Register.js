import React from "react";


const Register = ({ onRouteChange }) => {
	return (
		<main className="login">
			<form className="login__form">
				<fieldset className="login__field">
					<legend className="login__legend fs--1">Register</legend>
				{ /* FORM INPUT FIELDS */ }
					<div className="login__box login__box--name">
						<input type="text" className="login__input fs--4" name="name" placeholder="Full name"/>
						<label className="login__label" htmlFor="name">Name</label>
						<hr className="login__inputExpand"/>

					</div>

					<div className="login__box login__box--email">
						<input type="email" className="login__input fs--4" name="email-address" placeholder="Email address"/>
						<label className="login__label" htmlFor="email-address">Email</label>
						<hr className="login__inputExpand"/>

					</div>

					<div className="login__box login__box--password">
						<input type="password" className="login__input fs--4" name="password" placeholder="Password"/>
						<label htmlFor="password" className="login__label">Password</label>
						<hr className="login__inputExpand"/>
						
					</div>	
				</fieldset>


				{ /* FORM OPTIONS */ }
				<div className="login__box login__box--button">
					<input 
						onClick={() => onRouteChange("home") } 
						type="submit" 
						className="login__submit btn btn__ghost fs--4" 
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

export default Register;