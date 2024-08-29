import styles from './CreateButton.module.css';

export function CreateButton() {
  return (
    <button className={styles.button} type="button">
      Criar
    </button>
  );
}