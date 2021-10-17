export function initReducer(value) {
    try {
      const item = window.localStorage.getItem("todolist");
      return item ? JSON.parse(item) : value;
    } catch (error) {
      console.log(error);
      return value;
    }
  }
  
  export function inputReducer(state, action) {
    switch (action.type) {
      case "enter":
        return { input: action.payload };
      case "reset":
        return { input: "" };
      default:
        return state;
    }
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case "add":
        const add = {
          list: [...state.list, { item: action.payload, active: false }]
        };
        window.localStorage.setItem("todolist", JSON.stringify(add));
        return add;
  
      case "delete":
        const del = {
          list: state.list.filter((el, index) => index !== action.payload)
        };
        window.localStorage.setItem("todolist", JSON.stringify(del));
        return del;
  
      case "toggle":
        const tog = {
          list: [
            ...state.list.map((el, index) => {
              if (index === action.payload) {
                return { ...el, active: !el.active };
              } else {
                return { ...el };
              }
            })
          ]
        };
        window.localStorage.setItem("todolist", JSON.stringify(tog));
        return tog;
  
      default:
        return state;
    }
  }
  