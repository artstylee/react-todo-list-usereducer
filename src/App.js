import React, { useEffect, useState } from "react";
import clsx from "clsx";
import "./index.css";

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState(function () {
    let todoList = [];
    try {
      todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    } catch (error) {
      todoList = [];
    }
    return todoList;
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  function removeItemFromList(e, params) {
    e.stopPropagation();
    setList(list.filter((el, index) => index !== params));
  }

  function formSubmit(e) {
    e.preventDefault();
    setList([...list, { item, active: false }]);
    setItem("");
  }

  function toggleClass(params) {
    setList([
      ...list.map((el, index) => {
        if (index === params) {
          return { ...el, active: !el.active };
        } else {
          return { ...el };
        }
      }),
    ]);
  }

  return (
    <>
      <div className={"container"}>
        <div className={"formWrapper"}>
          <form onSubmit={formSubmit}>
            <input
              className={"inputAdd"}
              onChange={(e) => setItem(e.currentTarget.value)}
              value={item}
              type="text"
            />
            <button className={"btnAdd"} type="submit">
              add
            </button>
          </form>
        </div>
        <div className={"listWrapper"}>
          {list.map((el, index) => {
            return (
              <>
                <div
                  onClick={() => toggleClass(index)}
                  className={clsx({
                    itemWrapper: true,
                    listItemActive: el.active,
                  })}
                >
                  <button
                    className={"btnRemove"}
                    onClick={(e) => removeItemFromList(e, index)}
                  >
                    remove
                  </button>
                  <div
                    className={clsx({
                      listItem: true,
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
