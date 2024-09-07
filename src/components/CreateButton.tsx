import styles from './CreateButton.module.css';
import { PlusCircle } from '@phosphor-icons/react';

interface CreateButtonProps {
  onClick: () => void; // Callback para quando o botão for clicado
}

export function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <button onClick={onClick} className={styles.button} type="button">
      Criar <PlusCircle size={16} />
    </button>
  );
}