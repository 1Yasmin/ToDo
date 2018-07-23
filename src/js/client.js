const state = {
    // All -> 0, complete -> 1 active ->2
    filtro: 0,
    //Cargando la llamada del json
    cargando: true,
    //Tareas que el usuario ingrese y las del json
    tareas: []
};

//Promise hace un request al url
const solicitud = fetch('https://raw.githubusercontent.com/samuelchvez/todos-fake-json-api/master/db.json');
solicitud
//el resultado pasarlo a json
    .then(resultado => resultado.json())
    //guardar el json en tareas
    .then(resultadoJson => {
        state.tareas = resultadoJson;
        setTimeout(10000);
    })
    //cambiar el estado de cargando a false
    .then(() => {
        state.cargando = false;
        render(state);
    }).catch(error => alert('Ha ocurrido un error'));

//pinta cada tarea segun su estado de completado
const paint = (value, boton) => {
    if (value === true) {
        boton.classList.add('add-change');
    } else {
        boton.classList.remove('add-change');
    }
}

//renderiza las tareas
const addTareas = (estado,
    task, filtro, tareas) => {
    //elimina la lista de tareas en pantalla
    if (task.hasChildNodes()) {
        task.innerHTML = null;
    }
    for (let i = 0; i < estado.tareas.length; i += 1) {
        //renderiza todas las tareas
        if (filtro === 0) {
            //crear el elemento li para la tarea
            const lista = document.createElement('li');
            lista.className = 'tarea';
            task.appendChild(lista);
            //crea el boton para la tarea
            const boton = document.createElement('button');
            let name = estado.tareas[i].title;
            boton.innerHTML = name;
            boton.className = 'add';
            //al presionar las tareas cambia su estado de completada 
            boton.onclick = () => {
                if (estado.tareas[i].isCompleted === true) {
                    estado.tareas[i].isCompleted = false;
                } else {
                    estado.tareas[i].isCompleted = true;
                }
                render(estado);
                console.log(estado.tareas[i])
            }
            lista.appendChild(boton);
            //cambia el color correspondiente al estado
            paint(estado.tareas[i].isCompleted, boton);
            //Se muestra si no hay tareas 
            if (!task.hasChildNodes()) {
                const nada = document.createElement('div');
                nada.innerHTML = 'No hay resultados que mostrar';
                task.appendChild(nada);
            }
        }
        //renderiza las tareas completadas
        if (filtro === 1 && estado.tareas[i].isCompleted === true) {
            //crear el elemento li para la tarea
            const lista = document.createElement('li');
            lista.className = 'tarea';
            task.appendChild(lista);
            //crea el boton para la tarea
            const boton = document.createElement('button');
            let name = estado.tareas[i].title;
            boton.innerHTML = name;
            boton.className = 'add';
            //al presionar las tareas cambia su estado de completada 
            boton.onclick = () => {
                if (estado.tareas[i].isCompleted === true) {
                    estado.tareas[i].isCompleted = false;
                } else {
                    estado.tareas[i].isCompleted = true;
                }
                render(estado);
                console.log(estado.tareas[i])
            }
            lista.appendChild(boton);
            //cambia el color correspondiente al estado
            paint(estado.tareas[i].isCompleted, boton);
            //se muestra si no hay tareas
            if (!task.hasChildNodes()) {
                const nada = document.createElement('div');
                nada.innerHTML = 'No hay resultados que mostrar';
                task.appendChild(nada);
            }
        }
        //renderiza las tareas activas
        if (filtro === 2 && estado.tareas[i].isCompleted === false) {
            //crear el elemento li para la tarea
            const lista = document.createElement('li');
            lista.className = 'tarea';
            task.appendChild(lista);
            //crea el boton para la tarea
            const boton = document.createElement('button');
            let name = estado.tareas[i].title;
            boton.innerHTML = name;
            boton.className = 'add';
            //al presionar las tareas cambia su estado de completada 
            boton.onclick = () => {
                if (estado.tareas[i].isCompleted === true) {
                    estado.tareas[i].isCompleted = false;
                } else {
                    estado.tareas[i].isCompleted = true;
                }
                render(estado);
                console.log(estado.tareas[i])
            }
            lista.appendChild(boton);
            //cambia el color correspondiente al estado
            paint(estado.tareas[i].isCompleted, boton);
            //Se muestra si no hay tareas
            if (!task.hasChildNodes()) {
                const nada = document.createElement('div');
                nada.innerHTML = 'No hay resultados que mostrar';
                task.appendChild(nada);
            }
        }


    }
}

const render = lState => {
    //declaracion y creacion de elementos
    const seleccion = document.createElement('div');
    seleccion.className = 'seleccion';

    const btnAll = document.createElement('button');
    btnAll.innerHTML = 'ALL';
    btnAll.className = 'btnseleccion';

    const btnComplete = document.createElement('button');
    btnComplete.innerHTML = 'COMPLETE';
    btnComplete.className = 'btnseleccion';

    const btnActive = document.createElement('button');
    btnActive.innerHTML = 'Active';
    btnActive.className = 'btnseleccion';

    const tareas = document.createElement('div');
    tareas.className = 'tareas';

    const task = document.createElement('ul');
    task.className = 'tasks';

    //se ejecuta cuando esta cargando 
    if (!lState.cargando) {
        const carga = document.createElement('div');
        carga.innerHTML = 'cargando...';
        root.appendChild(carga);

    };

    //renderiza las tareas
    addTareas(lState, task, lState.filtro);

    //Declaracion de elementos
    const ingreso = document.createElement('div');
    ingreso.className = 'ingreso';

    const ingresobar = document.createElement('input');
    ingresobar.placeholder = 'Agregar nueva tarea';
    ingresobar.className = 'ingresobar';

    const btnIngreso = document.createElement('button');
    btnIngreso.innerHTML = 'ADD';
    btnIngreso.className = 'btn-ingreso';

    // limpiar la página
    if (root.hasChildNodes()) {
        root.innerHTML = null;
    }

    //añadir elementos en la pantalla
    root.appendChild(seleccion);
    root.appendChild(tareas);
    root.appendChild(ingreso);
    seleccion.appendChild(btnAll);
    seleccion.appendChild(btnComplete);
    seleccion.appendChild(btnActive);
    tareas.appendChild(task);
    ingreso.appendChild(ingresobar);
    ingreso.appendChild(btnIngreso);

    // añade la tarea nueva 
    btnIngreso.onclick = () => {
        /*const fake = () => new Promise((resolve, reject) => );*/
        lState.tareas.push({ title: ingresobar.value, isCompleted: false });
        addTareas(lState, task, lState.filtro);
        render(lState);
    }

    //Muestra todas las tareas
    btnAll.onclick = () => {
        lState.filtro = 0;
        addTareas(lState, task, lState.filtro);
        render(lState);
    }

    //Muestra las tareas terminadas
    btnComplete.onclick = () => {
        lState.filtro = 1;
        addTareas(lState, task, lState.filtro);
        render(lState);
    }

    //Muestra las tareas pendientes
    btnActive.onclick = () => {
        lState.filtro = 2;
        addTareas(lState, task, lState.filtro);
        render(lState);
    }


}

render(state);