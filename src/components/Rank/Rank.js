import React from "react";


const Rank = ({name, entries}) => {
	return (
		<div className="user">
			<div className="user__entries">
			<h2 className="user__details fs--2">
				<span className="user__name">{ name }</span>
				{", your current rank is"}
				<span className="user__rankPosition fs--1">{"#8"}</span>
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

