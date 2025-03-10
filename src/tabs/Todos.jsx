import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import { nanoid } from 'nanoid';
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todoList');

    if (savedTodos !== null) {
      return JSON.parse(savedTodos);
    }

    return [];
  });

  const [isEditing, setIsEditing] = useState(false);

  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todos));
  }, [todos]);

  const fintTodo = text => {
    if (todos.some(todo => todo.text === text)) {
      alert('You already have this TODO');
      return true;
    }
    return false;
  };

  const addTodo = formData => {
    if (fintTodo(formData.text)) return;

    const nextTodo = {
      id: nanoid(7),
      ...formData,
    };

    setTodos(prevTodos => [...prevTodos, nextTodo]);
  };

  const deleteTodo = todoId =>
    setTodos(prevTodos => prevTodos.filter(todoItem => todoItem.id !== todoId));

  const handleEditTodo = editId => {
    setIsEditing(true);
    setCurrentTodo(() => todos.find(todo => todo.id === editId));
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setCurrentTodo({});
  };

  const updateTodo = updateText => {
    if (fintTodo(updateText)) return;

    const newTodos = todos.map(todoItem => {
      if (todoItem.id === currentTodo.id) {
        const newToDo = {
          id: todoItem.id,
          text: updateText,
        };
        return newToDo;
      } else {
        return todoItem;
      }
    });

    setTodos(newTodos);
    setCurrentTodo({});
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          defaultValue={currentTodo}
          updateTodo={updateTodo}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <Form onSubmit={addTodo} />
      )}

      <TodoList
        todoList={todos}
        onDelete={deleteTodo}
        onEdit={handleEditTodo}
      />
      {!todos.length && (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
    </>
  );
};

export default Todos;
