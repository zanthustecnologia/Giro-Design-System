import * as FluentIcons from "@fluentui/react-icons";
import { Circle12Regular } from "@fluentui/react-icons/fonts";

/** Tipos de nomes de ícones disponíveis */
export type IconName = "add" | "delete" | "edit" | "usb" | "arrowDown" | "circle";

/** Mapeamento de ícones */
export const iconMap: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  add: FluentIcons.Add24Regular,
  delete: FluentIcons.Delete24Regular,
  edit: FluentIcons.Edit24Regular,
  usb: FluentIcons.UsbStick24Regular,
  arrowDown: FluentIcons.ArrowCircleDown24Regular,
  circle: FluentIcons.Circle24Regular
};