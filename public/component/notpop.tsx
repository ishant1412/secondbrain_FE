
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

type AlertType = 200 | 300 | 400 ;

interface AlertProps {
  type: AlertType;
 
  message: string;
  //there is a probem in this isvisible the V is uppercase and in the pages where im using it, is in lower case 
  isVisible: boolean;
  onClose: () => void;
 
  
}

const Alert: React.FC<AlertProps> = ({
    
    type,
  
  message,
  isVisible,
  onClose
 
}) => {
  useEffect(() => {
    if (isVisible ) {
      const timer = setTimeout(() => {
       onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible,onclose]);

  const getAlertStyles = () => {
    switch (type) {
      case 200:
        return {
          bg: 'bg-green-50 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-600',
                   messageColor: 'text-green-700'
        };
      case 400:
        return {
          bg: 'bg-red-50 border-red-200',
          icon: XCircle,
          iconColor: 'text-red-600',
                 messageColor: 'text-red-700'
        };
      case 300:
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          icon: AlertTriangle,
          iconColor: 'text-yellow-600',
         
          messageColor: 'text-yellow-700'
        };
   
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          icon: Info,
          iconColor: 'text-gray-600',
                  messageColor: 'text-gray-700'
        };
    }
  };

  const styles = getAlertStyles();
  const IconComponent = styles.icon;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start px-4 py-6 pointer-events-none">
      <div
        className={`
          max-w-md w-full p-4 rounded-lg border-2 shadow-lg pointer-events-auto
          ${styles.bg}
          transform transition-all duration-300 ease-out
          animate-in slide-in-from-top-2 fade-in-0
          ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}
        `}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <IconComponent className={`w-6 h-6 ${styles.iconColor}`} />
          </div>
          <div className="ml-3 flex-1">
         
            <p className={`mt-1 text-sm ${styles.messageColor}`}>
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className={`
                inline-flex rounded-md p-1.5 transition-colors duration-200
                ${styles.iconColor} hover:bg-black hover:bg-opacity-10
              `}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Alert