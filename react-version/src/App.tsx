import { useState, useRef } from 'react';
import './App.css';
import Editor from './components/Editor';
import { Todo } from './types';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const idRef = useRef(0);

  const onClickAdd = (text: string) => {
    setTodos([
      ...todos,
      {
        id: idRef.current++,
        content: text,
      },
    ]);
  };

  const onClickDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      <Editor onClickAdd={onClickAdd} />
      <ul>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} {...todo} onClickDelete={onClickDelete} />
          // <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
