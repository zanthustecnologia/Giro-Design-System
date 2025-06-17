import React from "react";
import { iconMap } from "./iconMap";

export const Icon = ({ name, ...props }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado em iconMap.`);
    return null;
  }

  return <IconComponent aria-hidden="true" {...props} />;
};
