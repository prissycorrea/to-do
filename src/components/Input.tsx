import { CreateButton } from './CreateButton';
import styles from './Input.module.css';

export function Input() {
  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" placeholder="Adicione uma nova tarefa" />
      <CreateButton />
    </div>
  );
}