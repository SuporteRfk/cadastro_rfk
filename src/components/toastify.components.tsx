import { ToastifyConfig } from '@/interfaces';
import { toast} from 'react-hot-toast';




export const Toastify = (config: ToastifyConfig) => {
  const { type, duration, icon, position, removeDelay, gutter, iconTheme, reverseOrder, style} = config; 
  
  
  let toastOption = {
    duration,
    position ,
    removeDelay,
    icon,
    gutter,
    iconTheme,
    reverseOrder,
    style
  }

  

  switch (type) {
    case 'success':
        toast.success(
          config.message,
          toastOption
        );      
      break;

    case 'error':
      toast.error(
        config.message, 
        toastOption 
      ); 
      break;
    
    case 'custom':
      toast.custom(config.content); 
      break;

    case 'promise':
      toast.promise(config.promise, {
        loading: config.loading,
        success: config.success,
        error: config.error,
      },
      toastOption
    );
    break;

    case 'info':
      toastOption.icon = toastOption.icon || 'ℹ️'; 
      toastOption.style = {
        background: style?.background || 'var(--color-info)', 
        color: style?.color || 'var(--color-white)', 
      };
      toast(config.message, toastOption);
      break;

    case 'warning':
      toastOption.icon = toastOption.icon || '⚠️'; 
      toastOption.style = {
        background: style?.background || 'var(--color-warning)', 
        color: style?.color || 'var(--color-white)', 
      };
      toast(config.message, toastOption);
      break;

    default:
      console.error('Type toast invalid');
  }
};
