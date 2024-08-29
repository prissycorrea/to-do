import styles from './CreateButton.module.css';
import { PlusCircle } from '@phosphor-icons/react';

export function CreateButton() {
  return (
    <button className={styles.button} type="button">
      Criar <PlusCircle size={16} />
    </button>
  );
}