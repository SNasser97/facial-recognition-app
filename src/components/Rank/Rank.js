import React from "react";


const Rank = ({name, entries}) => {
	// if name of this user is empty then provide the stored user session name
	return (
		<div className="user">
			<div className="user__entries">
			<h2 className="user__details fs--2">
				Hey there,
				<span className="user__name"> { name }</span>
			</h2>
				<p className="user__currentEntries fs--3">
					Your current number of entries are
					<span className="user__rankPosition fs--4"> { entries }</span>

				</p>	
			</div>
		</div>
	);
}

export default Rank;

// {", your current rank is"}
// 				<span className="user__rankPosition fs--1">{"#8"}</span>