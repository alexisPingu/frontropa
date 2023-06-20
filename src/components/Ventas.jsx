import React, { useEffect, useState } from 'react'
import { Navegacion } from './Navegacion'
import { API_URL } from '../assets/const'
import Swal from 'sweetalert2';

export const Ventas = () => {
    const rfc = document.cookie.split('rfc=')[1];
    const tipo = document.cookie.split('tipo=')[1];
    console.log(rfc)
    const [lista, setLista] = useState([])
    const [codigo, setCodigo] = useState('')
    const [sucursal, setSucursal] = useState([])
    const [eleccion, setEleccion] = useState(1)
    const [bloqueo, setBloqueo] = useState(false)
    const [ventas, setVentas] = useState([])
    const [pagos, setPagos] = useState([])
    const [eleccionTipo, setEleccionTipo] = useState(1)
    const [eleccionTipoPago, setEleccionTipoPago] = useState(1)
    const [variable, setVariable] = useState(false)
    const [idVenta,setIdVenta]=useState('')
    let suma=0
    console.log(variable)
    const obtnerSucursales = async () => {
        const datosRaw = await fetch(`${API_URL}/productos/sucursales`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const datos = await datosRaw.json()
        setSucursal(datos[0])
    }
    const obtnerVenta = async () => {
        const datosRaw = await fetch(`${API_URL}/ventas`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const datos = await datosRaw.json()
        setVentas(datos[0])
    }
    const obtnerPagos = async () => {
        const datosRaw = await fetch(`${API_URL}/pagos`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const datos = await datosRaw.json()
        setPagos(datos[0])
    }
    useEffect(() => {
        obtnerSucursales()
        obtnerVenta()
        obtnerPagos()
    }, [])
    const agregarLista = async (e) => {
        console.log(eleccion)
        setBloqueo(true)
        e.preventDefault()
        const datosRaw = await fetch(`${API_URL}/productos/datos`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'codigo': codigo,
                'sucursal': eleccion
            }
        })
        const datos = await datosRaw.json()
        console.log(datos)
        let existe = false
        let indice = 0
        lista.map((item, index) => {
            if (item.CODIGO == codigo) {
                existe = true;
                indice = index;
            }

        })

        if (existe) {
            if (datos[0].length != 0) {
                const updatedLista = [...lista];
                updatedLista[indice].cant = parseInt(updatedLista[indice].cant) + 1
                setLista(updatedLista);
            }
        } else {
            // El dato ya existe en la lista, puedes mostrar un mensaje de error o tomar alguna acción
            if (datos[0][0].PRECIO <= 5) {
                setLista([...lista, { ...datos[0][0], desc: 0, final: datos[0][0].PRECIO, cant: 1, tickets: 0, bloqueo: true }])
            } else {
                setLista([...lista, { ...datos[0][0], desc: 0, final: datos[0][0].PRECIO, cant: 1, tickets: 0, bloqueo: false }])
            }

        }


    }
    const eliminarElemento = (indice) => {
        const nuevoArr = [...lista]; // Obtenemos una copia del arreglo original
        nuevoArr.splice(indice, 1); // Eliminamos el elemento basado en el índice
        setLista(nuevoArr); // Actualizamos el estado con el nuevo arreglo
    };
    const handleCantidadChange = (index, event) => {
        const updatedLista = [...lista];
        updatedLista[index].cant = event.target.value;
        setLista(updatedLista);
    };
    const handleDescuentoChange = (index, event) => {
        const updatedLista = [...lista];
        updatedLista[index].desc = event.target.value;
        updatedLista[index].final = updatedLista[index].PRECIO - (updatedLista[index].PRECIO * event.target.value / 100) - (updatedLista[index].tickets * 5)
        setLista(updatedLista);
    };
    const handleti = (index, event) => {
        const updatedLista = [...lista];
        updatedLista[index].tickets = event.target.value;
        updatedLista[index].final = updatedLista[index].PRECIO - (event.target.value * 5) - (updatedLista[index].PRECIO * updatedLista[index].desc / 100)
        setLista(updatedLista);
    };
    const mandarBase = () => {
        console.log(lista) //productos
        console.log(eleccion) //sucursal
        console.log(eleccionTipoPago) //pago
        console.log(eleccionTipo) // venta
      
        if(lista.length!=0){
            nuevoVenta()
        }else{
            alert('no hay nada en la lista')
        }
        
    }
    const nuevoVenta = async () => {
        const body={
            'rfc': rfc.substring(0, 13),
            'sucursal':eleccion,
            'cliente':1,
            'venta':eleccionTipo,
            'pago':eleccionTipoPago,
            'status':1
        }
        try {
            const mensaje = await fetch(`${API_URL}/ventas/insertarventas`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',

                },body: JSON.stringify(body)
            })
            const aviso = await mensaje.json()
            //console.log(aviso.insertId)
            let data=''
            lista.map((item,index)=>{
                data=data+`(${aviso.insertId},'${item.CODIGO}',${item.cant},${item.PRECIO},${item.final}),`
            })
            const nuevaCadena = data.slice(0, data.length - 1);
            
            const mensaje2 = await fetch(`${API_URL}/ventas/insertardetalleventas`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'cadena':nuevaCadena

                }
            })
            const aviso2 = await mensaje2.json()
            window.location='/#/home'


        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
    }
                                
        lista.map((item,index)=>{
            suma=suma+(parseInt(item.cant)*parseFloat(item.final))
        })
    
    return (
        <div className='container-fluid cuerpo'>
            <Navegacion />
            <div className='container mt-5 pt-5 input-productos text-center'>
                <h1>Ventas</h1>

                <div className='mt-3'>
                    <select className="form-select mb-2" aria-label="Default select example mb-3" onChange={(e) => { setEleccionTipo(e.target.value) }} disabled={bloqueo}>
                        {
                            ventas.map((suc, index) => {
                                return <option value={suc.ID}>{suc.TIPO}</option>
                            })
                        }

                    </select>
                    <select class="form-select mb-2" aria-label="Default select example mt-3" onChange={(e) => { setEleccionTipoPago(e.target.value) }} disabled={bloqueo}>
                        {
                            pagos.map((suc, index) => {
                                return <option value={suc.ID}>{suc.PAGO}</option>
                            })
                        }

                    </select>
                    <form class="input-group mb-3" onSubmit={agregarLista}>
                        <select class="form-select" aria-label="Default select example mb-3" onChange={(e) => { setEleccion(e.target.value) }} disabled={bloqueo}>
                            {
                                sucursal.map((suc, index) => {
                                    return <option value={suc.ID}>{suc.NOMBRE}</option>
                                })
                            }

                        </select>
                        <span class="input-group-text" id="basic-addon1">Codigo</span>
                        <input type="text" class="form-control" placeholder="Codigo" aria-label="Username" aria-describedby="basic-addon1" maxLength={15} onChange={(e) => { setCodigo(e.target.value) }} required />
                        <button type="submit" class="btn btn-primary">Agregar</button>
                    </form>
                </div>
            </div>
            <form onSubmit={mandarBase}>
                <table class="table table-hover container">
                    <thead>
                        <tr>
                            <td scope="col">Codigo</td>
                            <td scope="col">Cantidad</td>
                            <td scope="col">Categoria</td>
                            <td scope="col">Talla</td>
                            <td scope="col">Precio</td>
                            <td scope="col">Descuento</td>
                            <td scope="col">Tikets</td>
                            <td scope="col">Final</td>
                            <td scope="col">Eliminar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((item, index) => {


                            return (
                                <tr>
                                    <td key={index}>{item.CODIGO}</td>
                                    <td className='col-1'><input type="number" className='form-control' value={item.cant}
                                        onChange={(event) => handleCantidadChange(index, event)} max={item.CANTIDAD} required min={1}
                                    /></td>
                                    <td>{item.CATEGORIA}</td>
                                    <td>{item.TALLA}</td>
                                    <td>$ {item.PRECIO}</td>
                                    <td className='col-1'><input type="number" className='form-control' value={item.desc} onChange={(event) => handleDescuentoChange(index, event)} max={50} min={0} required disabled={item.bloqueo} /></td>
                                    <td className='col-1'><input type="number" className='form-control' value={item.tickets}
                                        onChange={(event) => handleti(index, event)} required min={0} disabled={item.bloqueo}
                                    /></td>
                                    <td className='col-1'>${item.final}</td>
                                    <td className='col-1'><button className='btn btn-danger' onClick={() => { eliminarElemento(index) }}>Eliminar</button></td>
                                </tr>)
                        })}

                    </tbody>
                </table>
                <div className='container'>
                    <div class="card">
                        <div class="card-body">
                            <h1 className='text-center'>Total: $ {suma}</h1>
                        </div>
                    </div>
                </div>
                <div className='container'>

                    <button type="submit" class="btn btn-primary col-12 container text-center">Agregar</button>
                </div>


            </form>
        </div >
    )
}
