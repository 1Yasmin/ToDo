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
        console.log(state)
    })
    .then(() => {
        state.cargando = false,
            console.log(state)
    });

const render = lState => {

    const seleccion = document.createElement('div');
    seleccion.className = 'seleccion';

    const btnAll = document.createElement('button');
    btnAll.innerHTML = 'ALL';
    btnAll.className = 'btnSeleccion';

    const btnComplete = document.createElement('button');
    btnComplete.innerHTML = 'COMPLETE';
    btnComplete.className = 'btnSeleccion';

    const btnActive = document.createElement('button');
    btnActive.innerHTML = 'Active';
    btnActive.className = 'btnSeleccion';

    const tareas = document.createElement('div');
    tareas.className = 'tareas';

    const task = document.createElement('ul');
    task.className = 'task';

    for (let i = 0; i < lState.lenght; i += 1) {
        const lista = document.createElement('li')
    }

    const ingreso = document.createElement('div');
    ingreso.className = 'ingreso';

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


}

render(state);