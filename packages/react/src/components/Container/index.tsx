import './Container.module.scss'
import type { ContainerProps } from './Container.types';

export default function Container({ children }: ContainerProps) {
  return (
    <main className="container mx-auto">
      {children}
    </main>
  )
}