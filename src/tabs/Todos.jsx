import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import { nanoid } from 'nanoid';
import TodoList from '../components/TodoList/TodoList';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todoList');

    if (savedTodos !== null) {
      return JSON.parse(savedTodos);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todos));
  }, [todos]);

  const addTodo = formData => {
    const nextTodo = {
      id: nanoid(7),
      ...formData,
    };

    setTodos(prevTodos => [...prevTodos, nextTodo]);
  };

  const deleteTodo = todoId => {
    setTodos(prevTodos => {
      return prevTodos.filter(todoItem => todoItem.id !== todoId);
    });
  };

  return (
    <>
      <Form onSubmit={addTodo} />

      <TodoList todoList={todos} onDelete={deleteTodo} />
      {!todos.length && (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
    </>
  );
};

export default Todos;
