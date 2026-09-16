import clsx from 'clsx';
import styles from './Card.module.scss'

import type { CardProps } from './Card.types';

export default function Card({ children, className, hoverable, borderRadius }: CardProps) {
  return (
    <main
      className={clsx(styles['card'], hoverable && styles['card--hoverable'], className)}
      style={borderRadius !== undefined ? { borderRadius: `${borderRadius}px` } : undefined}
    >
        {children}
    </main>
  )
}