import React from 'react';

const Valid = ({ isValidURL }) => {
		// if(isValidURL) {
		// 	return (
		// 		<React.Fragment>
					
		// 		</React.Fragment>
		// 	);
		// } else {
		// 	return (
		// 		<React.Fragment>
		// 			<p style={{display:"flex"}} className="login__label--error fs--4">Please provide a valid image url</p>
		// 		</React.Fragment>
		// 	);
		// }
		return (
			<React.Fragment>
					{isValidURL ? <p style={{display:"flex", color:"green"}} className="login__label--error fs--4">Check out your image below</p> : <p style={{display:"flex"}} className="login__label--error fs--4">Please provide a valid image url</p>}
			</React.Fragment>
		);
}

export default Valid;