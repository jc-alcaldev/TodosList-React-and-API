import React from "react";
import { TodosList } from "./TodosList.jsx";

//create your first component
export function Home() {
	return (
		<div className="d-flex justify-content-center">
			<div className="bodyProject text-center">
				<h1>
					<strong>TODOS</strong>
				</h1>
				<TodosList />
			</div>
		</div>
	);
}
