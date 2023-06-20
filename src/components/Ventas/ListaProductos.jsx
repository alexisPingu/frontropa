import React, { useState } from 'react'

export const ListaProductos = ({ productos ,setProducto}) => {

    console.log(productos)
    return (
        <form>
<table class="table">
            <thead>
                <tr>
                    <th scope="col">Codigo</th>
                    <th scope="col">Piezas</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Color</th>
                    <th scope="col">Talla</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Descuento</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                
                    {
                        productos.map((pro, index) => {
                            return(
                            <tr>
                            
                                <td scope="row">{pro.CODIGO}</td>
                                <td className='col-1'> <input type="number" class="form-control" aria-label="Username" aria-describedby="basic-addon1" max={pro.CANTIDAD} min={1} required  onChange={
                                    (e)=>{
                                        const datos=productos
                                        datos[index].cant=e.target.value
                                        setProducto(datos)
                                        console.log(productos)
                                }}/></td>
                                <td>{pro.CATEGORIA}</td>
                                <td>{pro.COLOR}</td>
                                <td>{pro.TALLA}</td>
                                <td>${pro.PRECIO}</td>
                                <td className='col-1'> <input type="number" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required /></td>
                                <td><button className='btn btn-danger' type='button'>Eliminar</button></td>
                            
                                </tr>)
                        })
                    }


             
            </tbody>
        </table>
        <button type='submit'>agrega</button>
        </form>
        
    )
}
