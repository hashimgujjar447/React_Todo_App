import "./App.css";

import { useCallback, useEffect, useState } from "react";

import TaskItem from "./components/TaskItems";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editableTodoId, setEditableTodoId] = useState(null);

  const addTask = useCallback(() => {
    if (task === "") return;

    const checkTask = taskList.find((taskItem) => taskItem.todo === task);
    if (checkTask) {
      alert("Task already exist");
      setTask("");
      return;
    }

    setTaskList((prev) => [
      ...prev,
      { todo: task, id: Date.now(), completed: false },
    ]);
    setTask("");
  }, [task, taskList]);

  const handleTodoTextChange = useCallback((e, id) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, todo: e.target.value } : task
      )
    );
  }, []);

  const handleEditableTodo = useCallback(
    (id) => {
      const checkCompleted = taskList.find((task) => task.id === id);
      if (checkCompleted.completed) return;
      setEditableTodoId((prev) => (prev === id ? null : id));
    },
    [taskList]
  );

  const handleChecked = useCallback((id) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  }, []);

  useEffect(() => {
    const items = localStorage.getItem("taskList");

    if (items) {
      const parseItems = JSON.parse(items);
      setTaskList(parseItems);
    }
  }, []);

  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
  }, [taskList]);

  return (
    <div className="App">
      <div className="todo-container">
        <div className="todo-header">
          <input
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <div className="todo-list">
          <h1>Todos :</h1>
          <div className="todo-items">
            {taskList.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onChecked={handleChecked}
                onTextChange={handleTodoTextChange}
                onEditable={handleEditableTodo}
                onDelete={handleDelete}
                editableTodoId={editableTodoId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
