// Placeholder for Button component
import React from 'react';

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => {
  return (
    <button className={className} ref={ref} {...props}>
      {children}
    </button>
  );
});
Button.displayName = 'Button';

export { Button };
export default Button; // Default export for convenience if used that way
