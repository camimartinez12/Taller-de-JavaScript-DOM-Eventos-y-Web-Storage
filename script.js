const input1 = document.getElementById("task-input") 
const addButton = document.getElementById("add-task-btn") 
const taskList = document.getElementById("task-list")
const tareasKey = "tareas"; //clave para guardar las tareas en localStorage

loadTasks(); //cargar las tareas guardadas en localStorage al iniciar la pagina

console.log(input1, addButton, taskList);

//crear una tarea en la lista
function createTaskElement(taskText) {
    // crea un elemento de la lista
    const elemento = document.createElement("li");
    elemento.className = "task-item";
    elemento.textContent = taskText;

    taskList.appendChild(elemento);

    //crea el boton de eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "delete-btn";
    btnEliminar.textContent = "Eliminar";
    elemento.appendChild(btnEliminar);

    //configurar el evento click del boton de eliminar
    btnEliminar.addEventListener("click", () => { 
        elemento.remove();
        saveTasks();
    })

}
// hacer boton agregar tarea funcional
addButton.addEventListener("click", () => {
    const taskText = input1.value;

    //agrega la tera si esta no es vacia (trim elimina los espacios en blanco al inicio y al final de la cadena)
    if (taskText.trim() !== "") {
        createTaskElement(taskText);
        input1.value = "";
    // limpiar el campo de entrada después de agregar la tarea
    input1.value = "";

    // guardar tareas
    saveTasks();
    }
});

function saveTasks() {
    const tareas = [];
    const tareasLI = document.querySelectorAll(".task-item");

    tareasLI.forEach(item => {
        tareas.push(item.firstChild.textContent);   
    });
    console.log(JSON.stringify(tareas));

    //guardar tareas en localStorage (siempre que tengamos un objeto y lo queramos convertir a cadenas (strings), usamos JSON.stringify. basicamente guarda lo que se ponga en la lista en le localStorage)
    localStorage.setItem(tareasKey, JSON.stringify(tareas));
}
//cargar y mostrar las tareas guardadas en localStorage
function loadTasks() {
    // obtener la info de las tareas guardadas en localStorage. JSON.parse convierte la cadena de texto a un objeto (array)
    const tareasGuardadas = JSON.parse(localStorage.getItem(tareasKey)) || []; // lo del || si no hay tareas guardadas, devuelve un array vacio

    console.log(tareasGuardadas);

    //para cada tarea almacenada , se agrega en la pagina
    for (const tarea of tareasGuardadas) {
        createTaskElement(tarea);
    }
}
// get: para obtener set: para asignar 



//createTaskElement("Ir a cine");
//createTaskElement("Ordenar cuarto");