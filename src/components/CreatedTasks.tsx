import { useState } from "react";
import styles from "./CreatedTasks.module.css";
import clipboardIcon from "../assets/clipboard-icon.svg";
import { TaskCard } from "./TaskCard";
import { Input } from "./Input";
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export function CreatedTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask: Task = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Função para atualizar o título da tarefa
  const handleEditTask = (taskId: number, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.tasksContainerHeader}>
        <div className={styles.tasksHeader}>
          <p className={styles.tasksHeaderText}>Tarefas criadas</p>
          <p>{tasks.filter((task) => !task.completed).length}</p>
        </div>
        <div className={styles.tasksHeader}>
          <p className={styles.tasksHeaderText}>Concluídas</p>
          <p>{tasks.filter((task) => task.completed).length}</p>
        </div>
      </div>

      <Input
        value={newTaskTitle}
        onChange={setNewTaskTitle}
        onCreate={handleAddTask}
      />

      <div className={styles.containerTasks}>
        {tasks.filter((task) => !task.completed).length === 0 ? (
          <div className={styles.noTasks}>
            <img src={clipboardIcon} alt="Ícone de clipboard" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onToggleCompletion={handleToggleTaskCompletion}
                onEdit={handleEditTask}  // Passa a função de edição para o TaskCard
              />
            ))
        )}

        {tasks.filter((task) => task.completed).length > 0 && (
          <div className={styles.completedTasksContainer}>
            <h3>Tarefas Concluídas</h3>
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggleCompletion={handleToggleTaskCompletion}
                  onEdit={handleEditTask}  // Passa a função de edição para o TaskCard
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
