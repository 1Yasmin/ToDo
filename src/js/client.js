const state = {
    // All -> 0, complete -> 1 active ->2
    filtro: 0,
    cargando: true,
    tareas: []
};

const solicitud = fetch('https://raw.githubusercontent.com/samuelchvez/todos-fake-json-api/master/db.json');
solicitud
    .then(resultado => resultado.json())
    .then(resultadoJson => {
        state.tareas = resultadoJson;
    })
    .then(() => {
        state.cargando = false;
        render(state);
    });

const paint = (value, boton) => {
    if (value === true) {
        boton.classList.add('add-change');
    } else {
        boton.classList.remove('add-change');
    }
}

const addTareas = (estado,
    task, filtro) => {
    if (task.hasChildNodes()) {
        task.innerHTML = null;
    }

    for (let i = 0; i < estado.tareas.length; i += 1) {
        if (filtro === 0) {
            const lista = document.createElement('li');
            lista.className = 'tarea';
            task.appendChild(lista);
            const boton = document.createElement('button');
            let name = estado.tareas[i].title;
            boton.innerHTML = name;
            boton.className = 'add';
            boton.onclick = () => {
                if (estado.tareas[i].isCompleted === true) {
                    estado.tareas[i].isCompleted = false;
                    //paint(estado.tareas[i].isCompleted, boton);
                } else {
                    estado.tareas[i].isCompleted = true;
                    //paint(estado.tareas[i].isCompleted, boton);
                }
                render(estado);
                console.log(estado.tareas[i])
            }
            lista.appendChild(boton);
            paint(estado.tareas[i].isCompleted, boton);
        }
        if (filtro === 1 && estado.tareas[i].isCompleted === true) {
            const lista = document.createElement('li');
            lista.className = 'tarea';
            task.appendChild(lista);
            const boton = document.createElement('button');
            let name = estado.tareas[i].title;
            boton.innerHTML = name;
            boton.className = 'add';
            boton.onclick = () => {
                if (estado.tareas[i].isCompleted === true) {
                    estado.tareas[i].isCompleted = false;
                    //paint(estado.tareas[i].isCompleted, boton);
                } else {
                    estado.tareas[i].isCompleted = true;
                    //paint(estado.tareas[i].isCompleted, boton);
                }
                render(estado);
                console.log(estado.tareas[i])
            }
            lista.appendChild(boton);
            paint(estado.tareas[i].isCompleted, boton);
        }
        if (filtro === 2 && estado.tareas[i].isCompleted === false) {
            const lista = document.createElement('li');
            lista.className = 'tarea';
            task.appendChild(lista);
            const boton = document.createElement('button');
            let name = estado.tareas[i].title;
            boton.innerHTML = name;
            boton.className = 'add';
            boton.onclick = () => {
                if (estado.tareas[i].isCompleted === true) {
                    estado.tareas[i].isCompleted = false;
                    //paint(estado.tareas[i].isCompleted, boton);
                } else {
                    estado.tareas[i].isCompleted = true;
                    //paint(estado.tareas[i].isCompleted, boton);
                }
                render(estado);
                console.log(estado.tareas[i])
            }
            lista.appendChild(boton);
            paint(estado.tareas[i].isCompleted, boton);
        }


    }
}

const render = lState => {
    console.log(lState.tareas);
    console.log("time");
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

    if (!lState.cargando) {
        const carga = document.createElement('div');
        carga.innerHTML = 'cargando';
        root.appendChild(carga);
        console.log('cargando')

    }

    addTareas(lState, task, lState.filtro);

    const ingreso = document.createElement('div');
    ingreso.className = 'ingreso';

    const ingresobar = document.createElement('input');
    ingresobar.className = 'ingresobar';

    const btnIngreso = document.createElement('button');
    btnIngreso.innerHTML = 'ADD';
    btnIngreso.className = 'btn-ingreso';

    // Clear previous root content
    if (root.hasChildNodes()) {
        root.innerHTML = null;
    }

    root.appendChild(seleccion);
    root.appendChild(tareas);
    root.appendChild(ingreso);
    seleccion.appendChild(btnAll);
    seleccion.appendChild(btnComplete);
    seleccion.appendChild(btnActive);
    tareas.appendChild(task);
    ingreso.appendChild(ingresobar);
    ingreso.appendChild(btnIngreso);

    btnIngreso.onclick = () => {
        /*const fake = () => new Promise((resolve, reject) => );*/
        lState.tareas.push({ title: ingresobar.value, isCompleted: false });
        addTareas(lState, task, lState.filtro);
        render(lState);
    }

    btnAll.onclick = () => {
        lState.filtro = 0;
        addTareas(lState, task, lState.filtro);
        render(lState);
    }

    btnComplete.onclick = () => {
        lState.filtro = 1;
        addTareas(lState, task, lState.filtro);
        render(lState);
    }

    btnActive.onclick = () => {
        lState.filtro = 2;
        addTareas(lState, task, lState.filtro);
        render(lState);
    }


}