
import React, { useState } from 'react'
import { ListaProductos } from './ListaProductos'
import { API_URL } from '../../assets/const'
export const VentasGenerales = () => {
    const [codigo,setCodigo]=useState('')
    const [productos,setProducto]=useState([])
    const suc = document.cookie.split('sucursal=')[1];
    //console.log(productos)
    //console.log(suc     )
    const consultar = async () => {
        const datos = await fetch(`${API_URL}/productos/datos`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "codigo":`${codigo}`,
                    "sucursal":suc
                }

            })
        const dat = await datos.json()
        //console.log(dat[0])
        let bandera=false
        let indice=0
        productos.map((pr,index)=>{
                if(pr.CODIGO==codigo){
                    bandera=true
                    indice=index
                }
        })
        if(bandera){
            const datos=productos
            datos[indice].cant+=1
            //setProducto(datos)
            //console.log(datos)
            setProducto(datos)
            bandera=false
            
        }else{
            if(dat[0].length!=0) setProducto([...productos,{...dat[0][0],cant:1}])
        }
        setCodigo('')
        
        
    }
    return (
        
            <div class="container text-center">
                <form onSubmit={consultar} class="row justify-content-md-center">
                    <div class="col-lg-3">
                        <input type="text" class="form-control" id="inputPassword2" placeholder="codigo" maxLength={15} value={codigo} onChange={(e)=>{setCodigo(e.target.value)}} required />
                    </div>
                    <div class="col-lg-3 ">
                        <button type="submit" class="btn btn-primary mb-3 col-12">Agregar</button>
                    </div>
                </form>
                <ListaProductos productos={productos} setProducto={setProducto}/>
            </div >
            
        

    )
}
