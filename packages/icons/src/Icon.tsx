import React from "react";
import { iconMap } from "./iconMap";

export type IconName = "add" | "delete" | "edit" | "usb" | "arrowDown" | "circle";

export interface IconProps {
  /** Nome do ícone (deve corresponder ao `iconMap`) */
  name: IconName;
  /** Tamanho do ícone em pixels */
  size?: number;
  /** Classe CSS opcional */
  className?: string;
  /** Outros props */
  [key: string]: any;
}

export const Icon = ({ name, size = 24, className = "", ...props }: IconProps) => {
  const Component = iconMap[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <Component
      style={{ width: `${size}px`, height: `${size}px` }}
      className={className}
      aria-hidden
      {...props}
    />
  );
};