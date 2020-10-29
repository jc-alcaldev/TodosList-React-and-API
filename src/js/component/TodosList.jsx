import React, { Fragment, useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete"; // Install -----> npm install  @material-ui/icons
import IconButton from "@material-ui/core/IconButton"; // Install -----> npm install  @material-ui/core

export const TodosList = () => {
	const [tasks, setTasks] = useState([]);

	let newTask = event => {
		let myInput = document.querySelector("#taskInput");
		let newTask = event.target.value;

		if (event.keyCode == 13) {
			event.preventDefault();
			if (newTask) {
				setTasks(tasks => [...tasks, { label: newTask, done: false }]);
				myInput.value = "";
			}
		}
	};
	//Funcion que elimina <li> marcado.
	let deleteLine = index => {
		const newTodos = [...tasks];
		newTodos.splice(index, 1);
		setTasks(newTodos);
	};
	// useEffect que hace Get al cargar la pagina, en la primera renderizacion.
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/juancarlos", {
			method: "GET"
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json(); //devuelve un objeto
			})
			.then(responseAsJson => {
				console.log(responseAsJson, "aaaaaaa");
				responseAsJson.map(task => {
					setTasks(tasks => [...tasks, task]);
				});
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	}, []);
	// useEffect que hace PUT cada vez que modificamos en el input.
	useEffect(
		() => {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/juancarlos",
				{
					method: "PUT",
					body: JSON.stringify(tasks),
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then(response => {
					return response.json(); //devuelve un objeto
				})
				.catch(error => {
					//manejo de errores
					console.log(error);
				});
		},
		[tasks]
	);

	return (
		<Fragment>
			<form>
				<input
					id="taskInput"
					type="text"
					placeholder="Add Task"
					onKeyPress={() => {
						newTask(event);
					}}
				/>
			</form>

			{tasks.map((task, index) => {
				return (
					<li key={index}>
						{task.label}
						<IconButton //Sacado con material-ui
							aria-label="Delete"
							onClick={() => {
								deleteLine(index);
							}}>
							<DeleteIcon />
						</IconButton>
					</li>
				);
			})}
		</Fragment>
	);
};
