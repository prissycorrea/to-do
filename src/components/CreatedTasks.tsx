import { useState } from "react";
import styles from "./CreatedTasks.module.css";
import clipboardIcon from "../assets/clipboard-icon.svg";
import { TaskCard } from "./TaskCard";
import { Input } from "./Input"; // Importando o componente Input

// Definição de um tipo para a tarefa
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export function CreatedTasks() {
  // Gerenciando o estado das tarefas
  const [tasks, setTasks] = useState<Task[]>([]); // Inicialmente, sem tarefas
  const [newTaskTitle, setNewTaskTitle] = useState<string>(""); // Estado para o título da nova tarefa

  // Função para adicionar uma nova tarefa
  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return; // Não adiciona se o título estiver vazio

    const newTask: Task = {
      id: tasks.length + 1, // ID único para a tarefa (pode ser melhorado)
      title: newTaskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]); // Atualiza o estado com a nova tarefa
    setNewTaskTitle(""); // Limpa o input após adicionar a tarefa
  };

  // Função para excluir uma tarefa
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId)); // Remove a tarefa com o ID correspondente
  };

  // Função para alternar o status de conclusão da tarefa
  const handleToggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.tasksContainerHeader}>
        <div className={styles.tasksHeader}>
          <p className={styles.tasksHeaderText}>Tarefas criadas</p>
          <p>{tasks.filter((task) => !task.completed).length}</p>{" "}
          {/* Número de tarefas não concluídas */}
        </div>
        <div className={styles.tasksHeader}>
          <p className={styles.tasksHeaderText}>Concluídas</p>
          <p>{tasks.filter((task) => task.completed).length}</p>{" "}
          {/* Número de tarefas concluídas */}
        </div>
      </div>

      {/* Componente Input que captura o valor do input e cria a tarefa */}
      <Input
        value={newTaskTitle} // Valor do input
        onChange={setNewTaskTitle} // Callback para atualizar o estado do input
        onCreate={handleAddTask} // Callback para criar a tarefa
      />

      <div className={styles.containerTasks}>
        {/* Tarefas Não Concluídas */}
        {tasks.filter((task) => !task.completed).length === 0 ? ( // Se não houver tarefas
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
                onDelete={handleDeleteTask} // Passa a função de exclusão para o TaskCard
                onToggleCompletion={handleToggleTaskCompletion} // Passa a função de conclusão para o TaskCard
              />
            ))
        )}

        {/* Tarefas Concluídas */}
        {tasks.filter((task) => task.completed).length > 0 && (
          <div className={styles.completedTasksContainer}>
            <h3>Tarefas Concluídas</h3>
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask} // Passa a função de exclusão para o TaskCard
                  onToggleCompletion={handleToggleTaskCompletion} // Passa a função de alternância de conclusão para o TaskCard
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
