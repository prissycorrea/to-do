import styles from './CreatedTasks.module.css';
import clipboardIcon from '../assets/clipboard-icon.svg';

export function CreatedTasks() {
  return (
    <div className={styles.container}>
        <div className={styles.tasksContainerHeader}>
            <div className={styles.tasksHeader}>
                <p className={styles.tasksHeaderText}>Tarefas criadas</p>
                <p>0</p>
            </div>
            <div className={styles.tasksHeader}>
                <p className={styles.tasksHeaderText}>Concluídas</p>
                <p>0</p>
            </div>
        </div>
        <div className={styles.containerTasks}>
            <img src={clipboardIcon} alt="Ícone de clipboard" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
    </div>
  );
}