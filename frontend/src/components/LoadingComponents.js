import React from 'react';

const LoadingSpinner = ({ text = 'Loading...', size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <div className="bee-spinner"></div>
        </div>
        <p className="text-gray-600 text-sm font-medium">{text}</p>
      </div>
    </div>
  );
};

const ErrorMessage = ({ 
  error, 
  onRetry, 
  title = 'Something went wrong',
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center max-w-md">
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {typeof error === 'string' ? error : error?.message || 'An unexpected error occurred'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-clubbee-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-clubbee-primary transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ 
  icon = '📋', 
  title = 'No items found', 
  description = 'There are no items to display at the moment.',
  actionButton,
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-center p-12 ${className}`}>
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{description}</p>
        {actionButton}
      </div>
    </div>
  );
};

// Button loading state
const ButtonWithLoading = ({ 
  children, 
  loading = false, 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`${className} ${loading || disabled ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 mr-2">
            <div className="bee-spinner" style={{ transform: 'scale(0.5)' }}></div>
          </div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export { LoadingSpinner, ErrorMessage, EmptyState, ButtonWithLoading };
export default LoadingSpinner;