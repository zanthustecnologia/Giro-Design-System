import {
  forwardRef as forwardRefR18,
  version,
} from 'react';

import type {
  ForwardedRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  RefAttributes,
} from 'react';

const REACT_MAJOR = parseInt(version.split('.')[0], 10);

/**
 * Shim de compatibilidade para `React.forwardRef` que funciona tanto no React 18
 * quanto no React 19.
 *
 * - React 18: `ref` não é uma prop comum — usa `React.forwardRef` internamente.
 * - React 19: `ref` é uma prop normal e `forwardRef` foi depreciado. Este shim
 *   cria um componente funcional comum que lê `ref` das props diretamente,
 *   evitando o aviso de depreciação.
 *
 * O padrão de autoria dos componentes permanece idêntico para ambas as versões.
 *
 * @example
 * const MyInput = forwardRef<HTMLInputElement, MyInputProps>((props, ref) => {
 *   return <input ref={ref} {...props} />;
 * });
 */
export function forwardRef<T, P = {}>(
  render: ForwardRefRenderFunction<T, P>,
): ForwardRefExoticComponent<P & RefAttributes<T>> {
  if (REACT_MAJOR >= 19) {
    const Comp = (props: P & { ref?: ForwardedRef<T> }) => {
      const { ref, ...rest } = props as P & { ref?: ForwardedRef<T> };
      return render(rest as P, ref ?? null);
    };

    const displayName = (render as { displayName?: string }).displayName ?? render.name;
    if (displayName) {
      (Comp as unknown as { displayName: string }).displayName = displayName;
    }

    return Comp as unknown as ForwardRefExoticComponent<P & RefAttributes<T>>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return forwardRefR18(render as any) as unknown as ForwardRefExoticComponent<P & RefAttributes<T>>;
}
