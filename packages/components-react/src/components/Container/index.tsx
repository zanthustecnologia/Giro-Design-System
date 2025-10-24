import './styles.scss'

interface ContainerProps {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="container mx-auto">
      {children}
    </main>
  )
}