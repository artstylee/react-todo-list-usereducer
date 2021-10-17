import React, { useReducer } from "react";
import { reducer, initReducer, inputReducer } from "./todoReducer";
import clsx from "clsx";
import "./index.css";

function App() {
  const [state, dispatch] = useReducer(reducer, { list: [] }, initReducer);
  const [input, setInput] = useReducer(inputReducer, { input: "" });

  return (
    <>
      <div className={"container"}>
        <div className={"formWrapper"}>
          <input
            className={"inputAdd"}
            onChange={(e) => {
              setInput({ type: "enter", payload: e.currentTarget.value });
            }}
            value={input.input}
            type="text"
          />
          <button
            className={"btnAdd"}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "add", payload: input.input });
              setInput({ type: "reset" });
            }}
          >
            add
          </button>
        </div>
        <div className={"listWrapper"}>
          {state.list.map((el, index) => {
            return (
              <>
                <div
                  onClick={() => dispatch({ type: "toggle", payload: index })}
                  className={clsx({
                    itemWrapper: true,
                    listItemActive: el.active
                  })}
                >
                  <button
                    className={"btnRemove"}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: "delete", payload: index });
                    }}
                  >
                    remove
                  </button>
                  <div
                    className={clsx({
                      listItem: true
                    })}
                    key={index}
                  >
                    {el.item}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
