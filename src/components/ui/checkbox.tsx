// Placeholder for Checkbox component
import React from 'react';

const Checkbox = React.forwardRef<HTMLButtonElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  // A real checkbox would involve more state and styling
  return (
    <input
      type="checkbox"
      ref={ref as unknown as React.Ref<HTMLInputElement>} // Proper type casting
      className={className}
      {...props}
    />
  );
});
Checkbox.displayName = 'Checkbox';

export { Checkbox };
export default Checkbox;
