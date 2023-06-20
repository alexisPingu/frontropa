import React, { useEffect, useState } from 'react'
import { Navegacion } from './Navegacion'
import { API_URL } from '../assets/const'
import Swal from 'sweetalert2'

export const Egresos = () => {
    const [descripcion, setDescripcion] = useState('')
    const [dinero, setDinero] = useState(1)
    const [sucursal,setSucursal]=useState(1)
    const rfc = document.cookie.split('rfc=')[1];
    const [sucursales, setSucursales] = useState([])
    const enviarEgreso = async () => {
        const body = {
            "descripcion": descripcion,
            "rfcempleado": rfc.substring(0, 13),
            "cantidad": dinero,
            "sucursal": sucursal
        }
        const mensaje = await fetch(`${API_URL}/corte`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const aviso = await mensaje.json()
        Swal.fire('Se agrego correctamente el egreso','Exito','success')
        setDescripcion('')
    }
    const obtnerSucursales = async () => {
        const datosRaw = await fetch(`${API_URL}/productos/sucursales`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const datos = await datosRaw.json()
        setSucursales(datos[0])
    }

    useEffect(() => {
        obtnerSucursales()
    })
    return (
        <div className='container-fluid cuerpo'>
            <Navegacion />
            <div className='container mt-5 pt-5 input-productos text-center'>
                <h1>Egresos</h1>
                <select class="form-select" aria-label="Default select example" value={sucursal} onChange={(e)=>{setSucursal(e.target.value)}}>
                    {sucursales.map((item,index)=>{return <option value={item.ID}>{item.NOMBRE}</option>})}
                </select>
                <form onSubmit={enviarEgreso}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label" >Descripcion</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange={(e) => { setDescripcion(e.target.value)}} value={descripcion}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Concepto monetario</label>
                        <input type="number" class="form-control" id="exampleInputPassword1" min={1} required onChange={(e) => { setDinero(e.target.value)}} value={dinero}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Agregar egreso</button>
                </form>
            </div>
        </div>
    )
}
