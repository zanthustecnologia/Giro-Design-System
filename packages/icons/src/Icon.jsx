import React from "react";
import { iconMap } from "./iconMap";

/**
 * @typedef {"add" | "delete" | "edit" | "usb" | "arrowDown" | "circle"} IconName
 */

/**
 * @param {Object} props
 * @param {IconName} props.name - Nome do ícone (deve corresponder ao `iconMap`).
 * @param {number} [props.size=24] - Tamanho do ícone em pixels.
 * @param {string} [props.className] - Classe CSS opcional.
 */
export const Icon = ({ name, size = 24, className = '', ...props }) => {
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