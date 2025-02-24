import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { Context } from "../store/appContext.js";

export const ToDoList = () => {
  const { actions, store } = useContext(Context);
  const [todos, setTodos] = useState(store.todosList);

  const taskAdd = (todos) => {
    setTodos(actions.addTodo(0, todos));
  };

  const taskDelete = (todos) => {
    setTodos(actions.removeTodo(todos));
  };

  return (
    <Context.Provider value={{ todos, taskAdd, taskDelete }}>
      <ToDoForm />
    </Context.Provider>
  );
};

const ToDoForm = () => {
  const props = useContext(Context);
  const [input, setInput] = useState("");
  const { actions, store } = useContext(Context);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      props.taskAdd(input);
      setInput("");
    }
  };

  function deleteTodo(e) {
    e.preventDefault();
    props.taskDelete(e.target.outerText);
  }

  const todosMap = props.todos.map((item, index) => {
    return (
        <div>
      <div key={index} className="todo-text" onClick={(e) => deleteTodo(e)}>
      <img src="https://akumudragonz.io/images/master-plan/boku.png" alt="Green Beer"></img>
        {item}
        <img onClick={(e) => deleteTodo(e)} src="https://akumudragonz.io/images/master-plan/boku.png" alt="Green Beer"></img>
      </div>
      </div>
    );
  });

  return (
    <div>
      <div className="todo-container">
        <div>
          <h1>Today's Quests</h1>
          <div>
            <input
              type="text"
              className="input"
              onChange={handleChange}
              value={input}
              onKeyDown={handleSubmit}
              placeholder="Leeeeroy Jenkins"
              ref={inputRef}
            />
          </div>
        </div>
        <div>
          <form>{todosMap}</form>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
