import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";

// Inicialización de la colección de tareas
const todos = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"),
    new TodoItem(4, "Call Joe", true)
];

const collection = new TodoCollection("Usuario", todos);

// Función para mostrar las tareas en la interfaz
function mostrarTareas() {
    const listaTareas = document.getElementById("lista-tareas");
    // Limpia el contenido actual de la lista
    listaTareas.innerHTML = "";
    
    // Actualiza el título mostrando el número de tareas pendientes
    const titulo = document.getElementById("titulo");
    titulo.textContent = `${collection.userName}'s Todo List (${collection.getItemCounts().incomplete} items to do)`;

    // Itera sobre todas las tareas (true indica que incluya las completadas)
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
        span.textContent = `${item.id}\t${item.task}`;
        // Aplica tachado visual si la tarea está completada
        if (item.complete) span.style.textDecoration = "line-through";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => editarTarea(item));

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => eliminarTarea(item.id));

        // Agrega todos los elementos al li en orden
        li.append(checkbox, span, btnEditar, btnEliminar);
        listaTareas.appendChild(li);
    });
}

// Funciones auxiliares
function editarTarea(item) {
    const nuevoTexto = prompt("Editar tarea:", item.task);
    // El operador ?. verifica si nuevoTexto existe antes de llamar a trim()
    // Esto evita errores si el usuario cancela el prompt (devuelve null)
    if (nuevoTexto?.trim()) {
        collection.getTodoById(item.id).task = nuevoTexto;
        mostrarTareas();
    }
}

function eliminarTarea(id) {
    collection.itemMap.delete(id);
    mostrarTareas();
}

// Event Listeners para los botones principales
document.getElementById("btn-agregar").addEventListener("click", () => {
    const input = document.getElementById("nueva-tarea");
    // trim() elimina espacios en blanco al inicio y final del texto
    const valor = input.value.trim();
    
    // Verifica que el valor no esté vacío después de eliminar espacios
    if (valor !== "") {
        collection.addTodo(valor);
        input.value = "";
        mostrarTareas();
    }
});

document.getElementById("btn-eliminar").addEventListener("click", () => {
    collection.removeComplete();
    mostrarTareas();
});

// Asegura que el DOM esté completamente cargado antes de mostrar las tareas
document.addEventListener("DOMContentLoaded", mostrarTareas);