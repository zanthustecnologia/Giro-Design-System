import React from 'react';
import './styles.scss';

// Interface para as props do componente
interface MultiLineTextProps {
  /** Texto a ser exibido como linha principal */
  text1: string;
  /** Texto a ser exibido como linha secundária */
  text2: string;
}

/**
 * Componente para exibir texto em duas linhas
 * Utilizado principalmente em tabelas para mostrar informações hierárquicas
 */
const MultiLineText: React.FC<MultiLineTextProps> = ({ text1 = '', text2 = '' }) => {
  return (
    <div className="zds-multi-line-text">
      <span className="zds-multi-line-text__text1">{text1}</span>
      <span className="zds-multi-line-text__text2">{text2}</span>
    </div>
  );
};

export default MultiLineText;
export type { MultiLineTextProps };
