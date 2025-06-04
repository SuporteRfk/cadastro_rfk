import { LucideIcon } from "lucide-react";

export type MenuItem = {
    label: string;
    icon: LucideIcon; // Tipo dos ícones
    path?: string;    // Se for um link direto
    children?: { 
        label: string; 
        path: string;
        icon: LucideIcon; 
    }[]; // Se tiver submenu
};
  