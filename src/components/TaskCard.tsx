import { Circle, Trash, CheckCircle } from '@phosphor-icons/react';
import styles from './TaskCard.module.css';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: number) => void;
  onToggleCompletion: (taskId: number) => void;
}

export function TaskCard({ task, onDelete, onToggleCompletion }: TaskCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false); // Estado local para animação de conclusão

  // Função para manipular a exclusão com animação
  const handleRemove = () => {
    setIsRemoving(true); // Inicia a animação de remoção
    setTimeout(() => onDelete(task.id), 300); // Remove após a animação
  };

  // Função para alternar a conclusão com animação
  const handleCompletionToggle = () => {
    setIsCompleting(true); // Inicia a animação de conclusão
    setTimeout(() => {
      onToggleCompletion(task.id);
      setIsCompleting(false); // Reseta o estado de animação após a conclusão
    }, 300);
  };

  return (
    <div
      className={`${styles.taskCardContainer} ${isRemoving ? styles.removing : ''} ${
        isCompleting ? styles.completing : ''
      }`}
    >
      <label className={styles.taskCard}>
        <button
          className={`${styles.circleButton} ${task.completed ? styles.completed : ''}`}
          onClick={handleCompletionToggle}
        >
          {task.completed ? (
            <CheckCircle size={24} className={styles.iconCircle} />
          ) : (
            <Circle size={24} className={styles.iconCircle} />
          )}
        </button>
        <p
          className={task.completed ? styles.completedText : ''}
          onClick={handleCompletionToggle}
        >
          {task.title}
        </p>
      </label>
      <button onClick={handleRemove}>
        <Trash size={24} />
      </button>
    </div>
  );
}
