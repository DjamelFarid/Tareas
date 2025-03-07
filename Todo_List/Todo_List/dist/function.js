import { TodoItem } from "/dist/todoItem.js";
import { TodoCollection } from "/dist/todoCollection.js";

let todos = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"),
    new TodoItem(4, "Call Joe", true)
];

let collection = new TodoCollection("Usuario", todos);

document.getElementById("btn-agregar").addEventListener("click", () => {
    const input = document.getElementById("nueva-tarea");
    if (input.value.trim() !== "") {
        collection.addTodo(input.value);
        mostrarTareas();
        input.value = "";
    }
});

document.getElementById("btn-eliminar").addEventListener("click", () => {
    collection.removeComplete();
    mostrarTareas();
});

function mostrarTareas() {
    const listaTareas = document.getElementById("lista-tareas");
    listaTareas.innerHTML = "";
    collection.getTodoItems(true).forEach(item => {
        const li = document.createElement("li");
        li.classList.add("tarea");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.complete;
        checkbox.addEventListener("change", () => {
            collection.markComplete(item.id, checkbox.checked);
            mostrarTareas();
        });

        const span = document.createElement("span");
        span.textContent = item.task;

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => {
            const nuevoTexto = prompt("Editar tarea:", item.task);
            if (nuevoTexto) {
                collection.getTodoById(item.id).task = nuevoTexto;
                mostrarTareas();
            }
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            collection.itemMap.delete(item.id);
            mostrarTareas();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
        listaTareas.appendChild(li);
    });
}

mostrarTareas();