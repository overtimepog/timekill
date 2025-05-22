// Placeholder for Checkbox component
import React from 'react';

const Checkbox = React.forwardRef<HTMLButtonElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  // A real checkbox would involve more state and styling
  return (
    <input
      type="checkbox"
      ref={ref as any} // Basic ref handling
      className={className}
      {...props}
    />
  );
});
Checkbox.displayName = 'Checkbox';

export { Checkbox };
export default Checkbox;
