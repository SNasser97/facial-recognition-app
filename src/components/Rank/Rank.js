import React from "react";


const Rank = () => {
	return (
		<div className="user">
			<h2 className="user__details fs--2">
				<span className="user__name">{'Nasser'}</span>
				{", your current rank is"}
				<span className="user__rankPosition fs--1">{"#8"}</span>
			</h2>
		</div>
	)
}

export default Rank;