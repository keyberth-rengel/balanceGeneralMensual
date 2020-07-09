import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { editGastosAction } from "../store/gastos/gastosAction";

const FormularioGasto = () => {
  const dispatch = useDispatch();

  const gastosCategoria = useSelector((state) => state.gastos);
  const [error, setError] = useState(false);
  const [gastos, setGastos] = useState({
    nombre: "",
    cantidad: "",
    categoria: "",
  });

  useEffect(() => {
    if (gastosCategoria.editarGasto !== {}) {
      setGastos(gastosCategoria.editarGasto);
    }
  }, [gastosCategoria, dispatch]);

  const agregarGastos = (e) => {
    e.preventDefault();
    const { nombre, cantidad, categoria } = gastos;
    let fecha = new Date();
    if (nombre === "" || cantidad === "" || categoria === "") {
      // console.log("los campos no pueden estar vacios");
      setError(true);
      return;
    }

    dispatch(
      editGastosAction(
        {
          ...gastos,
          fecha: `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`,
        },
        gastos.id ? "Edit" : "Add"
      )
    );

    e.target.reset();
    setError(false);
    setGastos({
      nombre: "",
      cantidad: "",
      categoria: "",
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Se guardo Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <form onSubmit={agregarGastos}>
      <h2>Agregue su Información</h2>

      <div className="campo">
        <label>Descripción</label>
        <input
          className="u-full-width"
          type="text"
          placeholder="Ej. Transporte"
          defaultValue={gastos.nombre}
          onChange={(e) => {
            return setGastos({
              ...gastos,
              nombre: e.target.value,
            });
          }}
        />
      </div>

      <div className="campo">
        <label>Valor</label>
        <input
          className="u-full-width"
          type="text"
          placeholder="Ej. 300"
          defaultValue={gastos.cantidad}
          onChange={(e) => {
            return setGastos({
              ...gastos,
              cantidad: e.target.value,
            });
          }}
        />
      </div>

      <div className="campo">
        <label>Categoria</label>
        <select
          onChange={(e) => {
            return setGastos({
              ...gastos,
              categoria: e.target.value,
            });
          }}
          className="u-full-width"
          value={gastos.categoria}
        >
          <option>Categoria...</option>

          <option>Capital</option>
          <option>Activo</option>
          <option>Pasivo</option>
        </select>
      </div>

      <input
        className="button-primary u-full-width"
        type="submit"
        value={gastos.id ? "Editar" : "Agregar"}
      />

      {error ? (
        <div className="alert alert-danger">
          <p className="m-0 p-0">Todos los Campos son Obligatorios</p>
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default FormularioGasto;
