export interface RadioProps {
  /** Definirá o nome do grupo de radio */
  name?: string;
  /** O valor associado ao botão de rádio */
  value: string;
  /** O identificador único para o input do rádio */
  id?: string;
  /** Indica se o botão de rádio está selecionado */
  checked?: boolean;
  /** Classes adicionais para estilização personalizada */
  className?: string;
  /** Função de callback acionada quando o valor do botão de rádio muda */
  onChange?: (value: string) => void;
  /** O texto do rótulo exibido ao lado do botão de rádio */
  label?: string;
  /** Indica se o botão de rádio está desabilitado */
  disabled?: boolean;
}
