import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navegacion } from './Navegacion'
import { API_URL } from '../assets/const'
import Swal from 'sweetalert2'

export const ActualizarProducto = () => {
    const { codigo } = useParams()
    const [datos, setDatos] = useState([])
    const [dataSucursal, setDataSucursal] = useState([])
    //console.log(dataSucursal)
    const tipo = document.cookie.split('tipo=')[1];
    let bloqueo = true
    if (parseInt(tipo) == 2) bloqueo = false

   // console.log(dataSucursal)
    const obteberDatos = async () => {
        const datosRow = await fetch(`${API_URL}/productos/obtneract`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'codigo': codigo
            }
        })
        const datos = await datosRow.json()
        setDatos(datos[0][0])

    }
    const obteberDatosPorsucursal = async () => {
        const datosRow = await fetch(`${API_URL}/productos/obtnerdatossucursal`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'codigo': codigo
            }
        })
        const datos = await datosRow.json()
        setDataSucursal(datos[0])
    }
    const handleCantidadChange = (index, event) => {
        const newDataSucursal = [...dataSucursal];
        newDataSucursal[index].CANTIDAD = event.target.value;
        setDataSucursal(newDataSucursal);
      };
      
    useEffect(() => {
        obteberDatos()
        obteberDatosPorsucursal()
    }, [])
    const actualizarProductoGeneral = async () => {
        console.log(datos)
        const datosRow = await fetch(`${API_URL}/productos/actualizarProducto`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'codigo': codigo,
                'cantidad':parseInt(datos.CANTIDAD),
                'precio':parseFloat(datos.PRECIO)
            }
        })
        const datosACT = await datosRow.json()
        if(datosACT.affectedRows==1){
            Swal.fire(
                'Exito',
                'Datos actualizados',
                'success'
            )
        }else{
            Swal.fire(
                'Error',
                'Ocurrio un error,vuelva a intentarlo',
                'danger'
            )
        }

        
    }
    const actualizar=()=>{
      /*  console.log(datos)
        console.log(dataSucursal)*/

        let suma=0
        dataSucursal.map((item,index)=>{
            suma=suma+parseInt(item.CANTIDAD)
        })
        if(suma==datos.CANTIDAD){
            actualizarProductoGeneral()
        }else{
            Swal.fire(
                'Upsss',
                'La suma de las sucursale no coincide con la suma total',
                'warning'
            )
        }
    }
    const regresar=()=>{
        window.location='/#/busqueda'
    }
    return (
        <div className='container-fluid cuerpo'>
            <Navegacion />
            <div className='container mt-5 pt-5 input-productos'>
                <h1 className='text-center'>Actualizar productos</h1>
                <br />
                <form onSubmit={actualizar}>

                    <div class="container text-center">
                        <div class="row align-items-start">
                            <div class="col-lg-6 col-md-12">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" >Codigo de barras</span>
                                    <input class="form-control form-control-lg" type="text" placeholder="Codigo de barras" aria-label=".form-control-lg example" required maxLength={15} value={datos.CODIGO} disabled />
                                </div>

                            </div>
                            <div class="col-lg-6 col-md-12">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" >Cantidad</span>
                                    <input id='cantidad' class="form-control form-control-lg" type="number" placeholder="Cantidad de prendas" min={0} aria-label=".form-control-lg example" required value={datos.CANTIDAD} disabled={bloqueo}
                                        onChange={(e) => {
                                            setDatos({ ...datos, CANTIDAD: e.target.value })
                                        }}
                                    />
                                </div>

                            </div>
                            <div class="col-lg-6 col-md-12">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" >$</span>
                                    <input class="form-control form-control-lg" type="number" min={0} placeholder="Precio" aria-label=".form-control-lg example" required value={datos.PRECIO} disabled={bloqueo} onChange={(e) => {
                                        setDatos({ ...datos, PRECIO: e.target.value })
                                    }} />
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 d-flex justity-content-center align-items-center mb-3">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" >Categoria</span>
                                    <input class="form-control form-control-lg" type="text" aria-label=".form-control-lg example" required maxLength={15} value={datos.CATEGORIA} disabled />
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 d-flex justity-content-center align-items-center mb-3">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" >Color</span>
                                    <input class="form-control form-control-lg" type="text" aria-label=".form-control-lg example" required maxLength={15} value={datos.COLOR} disabled />
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 d-flex justity-content-center align-items-center">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" >Talla</span>
                                    <input class="form-control form-control-lg" type="text" aria-label=".form-control-lg example" required maxLength={15} value={datos.TALLA} disabled />
                                </div>
                            </div>
                            <table class="table table-hover fs-5 mt-2">
                                <thead>
                                    <tr>
                                        <th scope="col">Codigo</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataSucursal.map((data, index) => {
                                            return (
                                                <tr>
                                                    <td className='col-2 text-center'>{data.CODIGO}</td>
                                                    <td className='col-2 text-center'>{data.SUCURSAL}</td>
                                                    <td className='col-2 text-center'>
                                                        <div className="col-12">
                                                            <input type="number" id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" min={0} value={data.CANTIDAD} disabled={bloqueo}  onChange={(event) => handleCantidadChange(index, event)} required/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            <div class="col-lg-12 mt-3">
                                <button type="submit" class="btn btn-success btn-lg col-12" disabled={bloqueo}>Registrar</button>
                            </div>



                        </div>
                    </div>
                </form>
                <div class="container col-lg-12 mt-3">
                                <button type="button" class="btn btn-info btn-lg col-12" onClick={regresar} >Regresar</button>
                            </div>
            </div>


        </div>
    )
}
