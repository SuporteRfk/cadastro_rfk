import { Renderable } from "react-hot-toast";

export type ToastifyType = 'success' | 'error' | 'promise' | 'custom' | 'info' | 'warning';
type ToastifyPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface IToastifyConfigThemeIcon {
    primary: string,
    secondary: string
}
export interface IToastifyConfigStyle {
    background: string,
    color: string
}


export interface ToastifyBaseConfig {
    duration?: number; 
    position?: ToastifyPosition;
    icon?: Renderable | undefined 
    removeDelay?: number;
    style?: IToastifyConfigStyle;
    iconTheme?: IToastifyConfigThemeIcon
    reverseOrder?: boolean;
    gutter?: number;


}


export interface ToastifyMessageConfig extends ToastifyBaseConfig {
    message: string;
}

export interface ToastifyPromiseConfig extends ToastifyBaseConfig {
    promise: Promise<any>;
    loading: string; 
    success: string | ((data: any) => string); 
    error: string | ((error: any) => string); 
}

export interface ToastifyCustomConfig extends ToastifyBaseConfig{
    content: Renderable; 
}


export type ToastifyConfig =
  | ({ type: 'success' | 'error' | 'info' | 'warning'} & ToastifyMessageConfig)
  | ({ type: 'promise' } & ToastifyPromiseConfig)
  | ({ type: 'custom' } & ToastifyCustomConfig);