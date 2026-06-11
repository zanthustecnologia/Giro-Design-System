import clsx from 'clsx';
import styles from './Card.module.scss'

import type { CardProps } from './Card.types';

export default function Card({ children, className, interactiveCard }: CardProps) {
  return (
    <main className={clsx(styles['card'], interactiveCard && styles['card--interactive'], className)}>
        {children}
    </main>
  )
}