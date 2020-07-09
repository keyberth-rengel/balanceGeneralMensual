import { GASTOS, GASTOS_SUCCESS, GASTOS_END } from "./gastosReducer";
import { gastosEditRef, gastosRef } from "../../config/firebase";

import { calcularTotal } from "../../helper";

export const fetchGastosAction = () => (dispatch) => {
  dispatch({
    type: GASTOS,
  });
  gastosRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });

      const activos = arr.filter((item) => item.categoria === "Activo");
      const pasivos = arr.filter((item) => item.categoria === "Pasivo");
      const capital = arr.filter((item) => item.categoria === "Capital");

      dispatch({
        type: GASTOS_SUCCESS,
        payload: {
          activos: {
            data: activos,
            total: calcularTotal(activos),
          },
          pasivos: {
            data: pasivos,
            total: calcularTotal(pasivos),
          },
          capital: {
            data: capital,
            total: calcularTotal(capital),
          },
        },
      });
    }
  });
  dispatch({
    type: GASTOS_END,
  });
};

export const editGastosAction = (addGasto, method) => async (dispatch) => {
  dispatch({
    type: GASTOS,
  });

  if (method === "Add") {
    gastosRef.push(addGasto);

    dispatch({
      type: GASTOS_SUCCESS,
      payload: { msg: "Se creo correctamente" },
    });
  } else if (method === "Delete") {
    dispatch({
      type: GASTOS_SUCCESS,
      payload: { msg: "Se borro correctamente" },
    });
    gastosEditRef(addGasto.id).remove();
  } else if (method === "Edit") {
    dispatch({
      type: GASTOS_SUCCESS,
      payload: { msg: "Se edito correctamente", editarGasto: {} },
    });
    gastosEditRef(addGasto.id).set(addGasto);
  } else if (method === "podereditar") {
    dispatch({
      type: GASTOS_SUCCESS,
      payload: { editarGasto: addGasto },
    });
  }
  // dispatch({
  //   type: GASTOS_END,
  // });
};
