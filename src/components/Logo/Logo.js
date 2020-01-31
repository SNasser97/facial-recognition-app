import React from "react";
import Tilt from "react-tilt";
import facelogo from "../../assets/img/face.png";

const Logo = () => {
	return (
		<div className="logo ">
			<Tilt className="Tilt" options={{ max : 15 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner logo__img">
 					<img src={facelogo} alt="logo"/>
 				</div>
			</Tilt>
		</div>
	);
}

export default Logo;