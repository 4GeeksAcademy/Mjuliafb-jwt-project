import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();


	useEffect(() => {
		actions.syncToken()
		if (store.token === "" || store.token === null) {
			navigate("/");
		} else {
			actions.getUser();
		}
	}, []);

	useEffect(() => {
		if (store.token === "" || store.token === null) {
			navigate("/");
		} else {
			actions.getUser();
		}
	}, [store.token]);



	return (
		<div className="container">
			<div className="alert alert-info">
				{store.message}
			</div>
			<ul className="list-group">
				{store.demo.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link>
							{// Conditional render example
								// Check to see if the background is orange, if so, display the message
								item.background === "orange" ? (
									<p style={{ color: item.initial }}>
										Check store/flux.js scroll to the actions to see the code
									</p>
								) : null}
							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
								Change Color
							</button>
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
