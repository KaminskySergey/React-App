import ItemList from "./ItemList";
import { ITask } from "../../types/task.interface";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { selectIsTask } from "../../redux/todo/selectors";
import { useEffect } from "react";
import { taskAll } from "../../redux/todo/operations";
import { selectIsList } from "../../redux/list/selectors";
import { listAll } from "../../redux/list/operations";
import styles from './todos.module.css'

export default function TodosComponent() {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(selectIsTask)
    const list = useAppSelector(selectIsList)

    useEffect(() => {
        dispatch(taskAll());
        dispatch(listAll());
      }, [dispatch]);
      
      
      useEffect(() => {
        dispatch(taskAll());
      }, [dispatch, list]);



    const tasksByCategoryName: { [key: string]: ITask[] } = {};

    if (tasks) {
        tasks.forEach(task => {
            const categoryName = task.category;
            if (!tasksByCategoryName[categoryName]) {
                tasksByCategoryName[categoryName] = [];
            }
            tasksByCategoryName[categoryName].push(task);
        });
    }
    if (!list) {
        return null;
    }
    return <ul className={styles.todo} style={{ maxHeight: '650px' }}>
        {
            list?.map(el => (
                <ItemList key={el.id} tasksByCategory={tasksByCategoryName[el.name]} category={el} />
            ))
        }
    </ul>
}
