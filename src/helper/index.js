export const revisarIguales = (activo, capPas) => {
  let clase;
  if (activo !== capPas) {
    clase = "alert alert-danger";
  } else {
    clase = "alert alert-success";
  }
  return clase;
};

export const calcularTotal = (method) => {
  let total = 0;
  if (method) {
    for (const key in method) {
      let number = Number(method[key].cantidad);
      total += number;
    }
  }
  return total;
};
