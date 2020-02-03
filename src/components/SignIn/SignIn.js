import React from "react";


const SignIn = ({ onRouteChange }) => {
	return (
		<main className="login">
			<form className="login__form">
				<fieldset className="login__field">
					<legend className="login__legend fs--1">Sign In</legend>
				{ /* FORM INPUT FIELDS */ }
				
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

export default SignIn;