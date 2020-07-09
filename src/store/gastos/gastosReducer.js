// constanst
let initialData = {
  fetching: true,
  error: "",
  msg: "",
  activos: {
    total: 0,
    data: [],
  },
  pasivos: {
    total: 0,
    data: [],
  },
  capital: {
    total: 0,
    data: [],
  },
  editarGasto: {},
};

export const GASTOS = "GASTOS";
export const GASTOS_SUCCESS = "GASTOS_SUCCESS";
export const GASTOS_END = "GASTOS_END";

// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    //Login
    case GASTOS:
      return { ...state, fetching: true };
    case GASTOS_SUCCESS:
      return { ...state, fetching: true, ...action.payload };
    case GASTOS_END:
      return { ...state, fetching: false };

    default:
      return state;
  }
}
