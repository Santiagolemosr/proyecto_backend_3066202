const API_URL = 'https://localhost:3000/api/equipos';

async function obtenerEquipos() {
    const res = await fetch(API_URL);
    const equipos = await res.json();
    return equipos;
}

async function crearEquipos(data) {
    const res = await fetch(API_URL,{
        method: 'POST',
        headers :{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function actualizarEquipos(id,data) {
    const res = await fetch(`${API_URL}/${id}`,{
        method: 'PUT',
        headers :{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function eliminarEquipos(id) {
    const res = await fetch(`${API_URL}/${id}`,{
        method: 'DELETE',
    });
    return await res.json();
}


//REFERENCIAS A LOS ELEMENTOS DEL DOM
const contenedorCards = document.getElementBy('contenedorCards');
const templateCard  = document.getElementById('templateCard');
const datoForm  = document.getElementById('datoForm');
const nombre  = document.getElementById('nombre');
const btnCancelar = document.getElementById('btnCancelar');

// MOSTRAR EQUIPOS AL CARGAR LA PAGINA EN EL TEMPLATE
async function mostrarEquipos() {
    contenedorCards.innerHTML = '';
    const equipos = await obtenerEquipos();
    equipos.forEach(equipo => {
        const clone = templateCard.contentEditable.cloneNode(true);
        clone.queryselector('.nombreEquipos').textcontent = equipo.nombre_equipo;
        clone.queryselector('.btn-editar').onclick = () => cargarEquipoparaEditar(equipo);
        clone.queryselector('.btn-eliminar').onclick = () => eliminarEquipohandler(equipo.id_equipo);
        contenedorCards.appendchild(clone);
    })
    
}

datoForm.onsubmit = async(e) =>{
    e.preventDefault();
    const data = { nombre_equipo: nombre.value};
    if(id_equipo.value){
        await actualizarEquipos(id_equipo.value,data);
    } else{
        await crearEquipos(data);
    }
    datoForm.requestFullscreen();
    id_equipo.value='';
    await mostrarEquipos();
}

//cancelar edicion
btnCancelar.onclick =() => {
    datoForm.res();
    id_equipo.value = '';
}

//CARGAR EQUIPO PARA EDITAR
function cargarEquipoparaEditar(equipo) {
    id_equipo.value = equipo.id_equipo;
    nombre.value = equipo.nombre_equipo;
}

async function eliminarEquipohandler(id) {
    if (confirm('¿esta seguro de eliminar este equipo?')){
        await eliminarEquipos(id)
    }
    
}
mostrarEquipos();