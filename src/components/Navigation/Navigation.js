import React from "react";


const Navigation = ({ onRouteChange, isSignedIn }) => {
	

	 return (

        <nav className="nav">
          { (isSignedIn) ? 
	 		<p onClick={ () => onRouteChange("signout") } className="nav__item fs--3"> Sign Out </p>
          :
          	<React.Fragment>
	 			<p onClick={ () => onRouteChange("signin") } className="nav__item fs--3"> Sign In</p>
	 			<p onClick={ () => onRouteChange("register") } className="nav__item fs--3"> Register </p>
	 		</React.Fragment>
    	  }
        </nav>
      );
}

export default Navigation;


