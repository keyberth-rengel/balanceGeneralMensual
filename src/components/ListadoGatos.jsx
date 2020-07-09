import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { revisarIguales } from "../helper";
import {
  fetchGastosAction,
  editGastosAction,
} from "../store/gastos/gastosAction";
import { useDispatch, useSelector } from "react-redux";

const Listado = () => {
  const dispatch = useDispatch();
  const gastosCategoria = useSelector((state) => state.gastos);
  const [total, settotal] = useState({
    activos: 0,
    pasivos: 0,
    capital: 0,
  });
  useEffect(() => {
    if (gastosCategoria.fetching) {
      dispatch(fetchGastosAction());
      settotal({
        activos: gastosCategoria.activos.total,
        pasivos: gastosCategoria.pasivos.total,
        capital: gastosCategoria.capital.total,
      });
    }
  }, [gastosCategoria, dispatch]);

  const editGasto = (item, method) => {
    if (method === "eliminar") {
      Swal.fire({
        title: "¿Esta seguro?",
        text: "Los cambios no se pueden revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar",
      }).then((result) => {
        if (result.value) {
          Swal.fire("Eliminado!", "Se ha Eliminado con exito", "success");
          dispatch(editGastosAction(item, "Delete"));
        }
      });
    } else if (method === "editar") {
      dispatch(editGastosAction(item, "podereditar"));
    }
  };
  return (
    <div className="gastos-realizados">
      <h2>Balance General</h2>
      <div>
        <h4>Activos</h4>
        {gastosCategoria.activos.data.length !== 0 ? (
          gastosCategoria.activos.data.map((item) => (
            <div className="row mt-2 border-bottom" key={item.id}>
              <li className="four columns">{item.nombre}</li>
              <li className="four columns">{item.cantidad}</li>
              <a
                onClick={() => editGasto(item, "eliminar")}
                className="four columns"
              >
                Eliminar
              </a>
              <a
                onClick={() => editGasto(item, "editar")}
                className="four columns"
              >
                Editar
              </a>
            </div>
          ))
        ) : (
          <div className="row d-flex justify-content-center">No Hay Data</div>
        )}

        <div
          className={`${revisarIguales(
            total.activos,
            total.pasivos + total.capital
          )} d-flex justify-content-between`}
        >
          <p className="m-0 p-0">Total</p>
          <p className="m-0 p-0">{total.activos}</p>
        </div>
      </div>
      <div>
        <h4>Pasivo</h4>
        {gastosCategoria.pasivos.data.length !== 0 ? (
          gastosCategoria.pasivos.data.map((item) => (
            <div className="row mt-2 border-bottom" key={item.id}>
              <li className="four columns">{item.nombre}</li>
              <li className="four columns">{item.cantidad}</li>
              <a
                onClick={() => editGasto(item, "eliminar")}
                className="four columns"
              >
                Eliminar
              </a>
              <a
                onClick={() => editGasto(item, "editar")}
                className="four columns"
              >
                Editar
              </a>
            </div>
          ))
        ) : (
          <div className="row d-flex justify-content-center">No Hay Data</div>
        )}

        <div
          className={`${revisarIguales(
            total.activos,
            total.pasivos + total.capital
          )} d-flex justify-content-between`}
        >
          <p className="m-0 p-0">Total</p>
          <p className="m-0 p-0">{total.pasivos}</p>
        </div>
      </div>
      <div>
        <h4>Capital</h4>
        {gastosCategoria.capital.data.length !== 0 ? (
          gastosCategoria.capital.data.map((item) => (
            <div className="row mt-2 border-bottom" key={item.id}>
              <li className="four columns">{item.nombre}</li>
              <li className="four columns">{item.cantidad}</li>
              <a
                onClick={() => editGasto(item, "eliminar")}
                className="four columns"
              >
                Eliminar
              </a>
              <a
                onClick={() => editGasto(item, "editar")}
                className="four columns"
              >
                Editar
              </a>
            </div>
          ))
        ) : (
          <div className="row d-flex justify-content-center">No Hay Data</div>
        )}

        <div
          className={`${revisarIguales(
            total.activos,
            total.pasivos + total.capital
          )} d-flex justify-content-between`}
        >
          <p className="m-0 p-0">Total</p>
          <p className="m-0 p-0">{total.capital}</p>
        </div>
      </div>
    </div>
  );
};

export default Listado;
