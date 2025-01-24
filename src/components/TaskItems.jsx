import PropTypes from "prop-types";

function TaskItem({
  task,
  onChecked,
  onTextChange,
  onEditable,
  onDelete,
  editableTodoId,
}) {
  return (
    <div key={task.id} className="todo-item">
      <input
        className="checkbox"
        type="checkbox"
        checked={task.completed}
        onClick={() => onChecked(task.id)}
      />
      <input
        value={task.todo}
        className={task.completed ? "todo-checked" : "todo-text-box"}
        type="text"
        onChange={(e) => onTextChange(e, task.id)}
        readOnly={editableTodoId !== task.id}
      />
      <button className="edit-todo" onClick={() => onEditable(task.id)}>
        {editableTodoId === task.id ? "Save" : "Edit"}
      </button>
      <button className="delete-todo" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  onChecked: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onEditable: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editableTodoId: PropTypes.number,
};
