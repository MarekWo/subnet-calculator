import React from 'react';

const Card = ({ 
  children, 
  title, 
  className = '', 
  headerClassName = '',
  bodyClassName = '',
  footer,
  footerClassName = '',
  ...props 
}) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {title && (
        <div className={`px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 ${headerClassName}`}>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        </div>
      )}
      
      <div className={`p-4 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
