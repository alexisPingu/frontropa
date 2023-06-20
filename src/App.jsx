import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Productos } from "./components/Productos";
import { Ventas } from "./components/Ventas";
import { ActualizarProducto } from "./components/ActualizarProducto";
import { Busqueda } from "./components/Busqueda";
import { Ingresarempleado } from "./components/Ingresarempleado";
import { Actulizarempleado } from "./components/Actulizarempleado";
import { Egresos } from "./components/Egresos";
import { Corte } from "./components/Corte";
import { InsertarSucursales } from "./components/InsertarSucursales";
function App() {
  return (

      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/productos" element={<Productos/>}/>
          <Route path="/vender" element={<Ventas/>} />
          <Route path="/actualizar/:codigo" element={<ActualizarProducto/>}/>
          <Route path="/busqueda" element={<Busqueda/>}/>
          <Route path="/empleados" element={<Ingresarempleado/>}/>
          <Route path="/empleadosactulizar/:rfc" element={<Actulizarempleado/>}/>
          <Route path="/egresos" element={<Egresos/>} />
          <Route path="/corte" element={<Corte/>} />
          <Route path="/sucursales" element={<InsertarSucursales/>} />
        </Routes>
      </Router>

  )
}
export default App
