import React from "react";
import "../css/App.css";
import Formulario from "../components/Formulario";
import ListadoGastos from "../components/ListadoGatos";

function Gastos() {
  return (
    <div className="App container">
      <header>
        <h1>Balance General Mensual</h1>
      </header>
      <div className="contenido-principal contenido">
        <div className="row">
          <div className="one-half column">
            <Formulario />
          </div>
          <div className="one-half column">
            <ListadoGastos />
            {/* <ControlPresupuesto
            presupuesto={this.state.presupuesto}
            restante={this.state.restante}
          /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gastos;
