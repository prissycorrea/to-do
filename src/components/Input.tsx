import { CreateButton } from './CreateButton';
import styles from './Input.module.css';

interface InputProps {
  value: string; // Valor atual do input
  onChange: (value: string) => void; // Callback para mudança de valor
  onCreate: () => void; // Callback para criar a tarefa
}

export function Input({ value, onChange, onCreate }: InputProps) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={value} // Valor do input controlado pelo estado
        onChange={(e) => onChange(e.target.value)} // Chama o callback ao mudar o valor
      />
      <CreateButton onClick={onCreate} /> {/* Botão para criar a tarefa */}
    </div>
  );
}
