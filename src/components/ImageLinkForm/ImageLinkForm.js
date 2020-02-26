import React from "react";


const ImageLinkForm = ({ onInputChange , onImageSubmit }) => {
	return (
		<div className="imageForm">
			<p className="imageForm__desc fs fs--3">
				{ "This will detect faces in your picture!" }
			</p>
			<div className="imageForm__inputContainer">
				<input  onChange={ onInputChange } className="imageForm__inputText fs fs--4" type="text" placeholder="paste your URL Here"/>
				<button onClick={ onImageSubmit } className="btn btn__full fs fs--4">Detect</button>
			</div>
		</div>
	)
}

export default ImageLinkForm;