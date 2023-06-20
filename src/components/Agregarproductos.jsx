import Swal from 'sweetalert2'
import '../css/estilo.css'

import React, { useState } from 'react'
import { API_URL } from '../assets/const'
export const Agregarproductos = ({ categorias, colores, tallas, sucursales,obtCategorias,obtColores ,obtTallas}) => {
    const [producto, setProducto] = useState({ clave: '', cantidad: 1, precio: 1, categoria: -1, color: -1, talla: -1 })
    const [cantidad, setCantidad] = useState([])

    const agregarDato=(tipo)=>{
        let valor
        Swal.fire({
            title: 'Agregar:',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            confirmButtonText: 'Aceptar',
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
               if(tipo==='categoria') nuevaCategoria(value)
               if(tipo==='color') nuevoColor(value)
               if(tipo==='talla') nuevaTalla(value)
             
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
      
        
    }
    const nuevaCategoria=async(valor)=>{
        console.log(valor)
        const body={
            categoria:valor
        }
        try {
            const mensaje=await fetch(`${API_URL}/categoria`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(body)
            })
            const aviso=await mensaje.json()
            console.log(aviso[0][0].Mensaje)
            Swal.fire('Mensaje', aviso[0][0].Mensaje, 'info')
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
        
        setProducto({...producto,categoria:-1})
        obtCategorias()
    }
    const nuevoColor=async(valor)=>{
        const body={
            color:valor
        }
        try {
            const mensaje=await fetch(`${API_URL}/color`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(body)
            })
            const aviso=await mensaje.json()
            console.log(aviso[0][0].Mensaje)
            Swal.fire('Mensaje', aviso[0][0].Mensaje, 'info')
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
        setProducto({...producto,color:-1})
        obtColores()
    }
    const nuevaTalla=async(valor)=>{
        const body={
            talla:valor
        }
        try {
            const mensaje=await fetch(`${API_URL}/talla`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(body)
            })
            const aviso=await mensaje.json()
            console.log(aviso[0][0].Mensaje)
            Swal.fire('Mensaje', aviso[0][0].Mensaje, 'info')
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
        setProducto({...producto,talla:-1})
        obtTallas()
    }
    if(parseInt(producto.categoria)===0){
        agregarDato('categoria')
    }
    if(parseInt(producto.color)===0){
        agregarDato('color')
    }
    if(parseInt(producto.talla)===0){
        agregarDato('talla')
    }
    const agregarProducto = (e) => {
        e.preventDefault()
        let sum = 0
        cantidad.map((cant, index) => {
            sum = sum + parseInt(cant.cantidad)
        })

        if (producto.cantidad != sum) {
            Swal.fire('Los sentimos!', 'Las cantidades de la tiendas no coinciden con el stock principal', 'error')
        } else {
            if (parseInt(producto.categoria) > 0 && parseInt(producto.color) > 0 && parseInt(producto.talla) > 0) {
                if (parseFloat(producto.precio) < 0 || parseInt(producto.cantidad < 0)) {
                    Swal.fire('No puede haber numeros negativos', 'Vuelva a intentarlo', 'error')
                } else {
                    const body = {
                        id: producto.clave,
                        cantidad: producto.cantidad,
                        precio: producto.precio,
                        categoria: producto.categoria,
                        color: producto.color,
                        talla: producto.talla
                    }
                    let sum = ''
                    cantidad.map((cant, index) => {
                        const row = `('${producto.clave}',${cant.id},${cant.cantidad}),`
                        sum = sum + row
                    })
                    let cadena = sum.slice(0, -1);
                    const data = {
                        data: cadena
                    }
                    //console.log('todo listo')
                    insertarProducto(body, data)
                }
            } else {
                Swal.fire('Faltan datos por llenar!', 'Vuelva a intentralo', 'info')
            }
        }
    }
    
    const insertarProducto = async (body, data) => {
        try {
            const existe = await fetch(`${API_URL}/productos/existe`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "clave": producto.clave
                }

            })
            const bandera = await existe.json()
            console.log(bandera[0])
            if (bandera[0].length > 0) {
                Swal.fire(
                    'Cuidado!',
                    'Producto ya esta registrado!',
                    'info'
                )
                window.location=`/#/actualizar/${producto.clave}`
            } else {
                const respuestaRow = await fetch(`${API_URL}/productos/agregar`, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
                const bandera = await respuestaRow.json()
                console.log(bandera.affectedRows)
                if (bandera.affectedRows === 1) {
                    const body = data
                    const insertarSucPro = await fetch(`${API_URL}/sucpro/insertar`, {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(body)
                        
                    })
                    Swal.fire({
                        title: 'Producto registrado correctamente',
                        confirmButtonText: 'Ok'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload()
                        }
                      })

                }
            }
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
    }
    const arregloSuCantidad = (index, id, cantidadSucursal) => {
        const datos =
        {
            id: id,
            cantidad: cantidadSucursal
        }
        const nuevaCantidad = [...cantidad]
        nuevaCantidad[index] = datos
        setCantidad(nuevaCantidad)
    }
    return (
        <div className='container mt-5 pt-5 input-productos'>
            <h1 className='text-center'>Agregar productos</h1>
            <br />
            <form onSubmit={agregarProducto}>

                <div class="container text-center">
                    <div class="row align-items-start">
                        <div class="col-lg-6 col-md-12">
                            <div class="input-group mb-3">
                                <span class="input-group-text" >Codigo de barras</span>
                                <input class="form-control form-control-lg" type="text" placeholder="Codigo de barras" aria-label=".form-control-lg example" required maxLength={15} value={producto.clave} onChange={(e) => { setProducto({ ...producto, clave: e.target.value }) }} />
                            </div>

                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="input-group mb-3">
                                <span class="input-group-text" >Cantidad</span>
                                <input id='cantidad' class="form-control form-control-lg" type="number" placeholder="Cantidad de prendas" aria-label=".form-control-lg example" required value={producto.cantidad} onChange={(e) => { setProducto({ ...producto, cantidad: e.target.value }) }} min={1} />
                            </div>

                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="input-group mb-3">
                                <span class="input-group-text" >$</span>
                                <input class="form-control form-control-lg" type="number" placeholder="Precio" aria-label=".form-control-lg example" required value={producto.precio} onChange={(e) => { setProducto({ ...producto, precio: e.target.value }) }} min={1} />
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 d-flex justity-content-center align-items-center mb-3">
                            <select class="form-select p-2" aria-label="Default select example" value={producto.categoria} onChange={(e) => { setProducto({ ...producto, categoria: e.target.value }) }}>
                                <option  value={-1} selected>--Seleccione una categoria--</option>
                                <option value={0} >--Nueva categoria--</option>
                                {categorias.map((categoria, index) => {
                                    return <option value={categoria.ID}>{categoria.CATEGORIA}</option>
                                })}
                            </select>
                        </div>
                        <div class="col-lg-6 col-md-12 d-flex justity-content-center align-items-center mb-3">
                            <select class="form-select p-2" aria-label="Default select example" value={producto.color} onChange={(e) => { setProducto({ ...producto, color: e.target.value }) }}>
                                <option value={-1} selected>--Seleccione un color--</option>
                                <option value={0} >--Nuevo color--</option>
                                {colores.map((color, index) => {
                                    return <option value={color.ID}>{color.COLOR}</option>
                                })}
                            </select>
                        </div>
                        <div class="col-lg-6 col-md-12 d-flex justity-content-center align-items-center">
                            <select class="form-select p-2" aria-label="Default select example" value={producto.talla} onChange={(e) => { setProducto({ ...producto, talla: e.target.value }) }}>
                                <option value={-1} selected>--Seleccione una talla--</option>
                                <option value={0} >--Nueva talla--</option>
                                {tallas.map((talla, index) => {
                                    return <option value={talla.ID}>{talla.TALLA}</option>
                                })}
                            </select>
                        </div>
                        <table class="table table-hover fs-5 mt-2">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Direccion</th>
                                    <th scope="col">Cantidad</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sucursales.map((sucursal, index) => {
                                        return (<tr>
                                            <th scope="row">{sucursal.ID}</th>
                                            <td>{sucursal.NOMBRE}</td>
                                            <td>{sucursal.DIRECCION}</td>
                                            <td className='col-2 text-center'>
                                                <div class="col-12">
                                                    <input type="number" id="inputPassword6" class="form-control" aria-labelledby="passwordHelpInline" min={0}  onChange={(e) => { arregloSuCantidad(index, sucursal.ID, e.target.value)} }/>
                                                </div>
                                            </td>
                                        </tr>)

                                    })
                                }
                            </tbody>
                        </table>
                        <div class="col-lg-12 mt-3">
                            <button type="submit" class="btn btn-success btn-lg col-12">Registrar</button>
                        </div>



                    </div>
                </div>
            </form>
        </div>
    )
}
