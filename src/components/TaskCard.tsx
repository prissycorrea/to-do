import { Circle, Trash, CheckCircle, PencilSimple } from '@phosphor-icons/react';
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
  onEdit: (taskId: number, newTitle: string) => void;
}

export function TaskCard({ task, onDelete, onToggleCompletion, onEdit }: TaskCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  const handleCompletionToggle = () => {
    setIsCompleting(true);
    setTimeout(() => {
      onToggleCompletion(task.id);
      setIsCompleting(false);
    }, 300);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);  // Alterna entre o modo de edição e visualização
  };

  const handleEditConfirm = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle);
    } else {
      setEditedTitle(task.title); // Restaura o título original se estiver vazio
    }
    setIsEditing(false);  // Sai do modo de edição
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEditConfirm();  // Confirma a edição ao pressionar Enter
    } else if (event.key === 'Escape') {
      setIsEditing(false);  // Cancela a edição ao pressionar Escape
      setEditedTitle(task.title);  // Restaura o título original
    }
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

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEditConfirm}  // Confirma ao sair do campo de edição
            onKeyDown={handleKeyDown}  // Confirma com Enter ou cancela com Escape
            className={styles.editInput}
            autoFocus
          />
        ) : (
          <p
            className={task.completed ? styles.completedText : ''}
            onClick={handleEditToggle}  // Habilita o modo de edição ao clicar
          >
            {task.title}
          </p>
        )}
      </label>
        <div className={styles.buttonsContainer}>
          <button onClick={handleEditToggle} className={styles.editButton}>
            <PencilSimple size={24} />
          </button>

          <button onClick={handleRemove} className={styles.deleteButton}>
            <Trash size={24} />
          </button>
      </div>
    </div>
  );
}
