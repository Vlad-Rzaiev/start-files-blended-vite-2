import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todoList, onDelete, onEdit }) => {
  return (
    <Grid>
      {todoList.map((todoItem, idx) => (
        <GridItem key={todoItem.id}>
          <TodoListItem
            todoItem={todoItem}
            onDelete={onDelete}
            count={idx}
            onEdit={onEdit}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
