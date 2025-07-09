import React from "react";
import { cn } from "../../lib/utils";

const Tabs = ({ defaultValue, value, onValueChange, children, className, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);
  
  const currentValue = value || activeTab;
  const handleValueChange = onValueChange || setActiveTab;
  
  return (
    <div className={cn("", className)} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value: currentValue, onValueChange: handleValueChange });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = React.forwardRef(({ className, children, value, onValueChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, children, value: tabValue, value: currentValue, onValueChange, ...props }, ref) => {
  const isActive = currentValue === tabValue;
  
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50",
        className
      )}
      onClick={() => onValueChange?.(tabValue)}
      {...props}
    >
      {children}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, children, value: tabValue, value: currentValue, ...props }, ref) => {
  if (currentValue !== tabValue) return null;
  
  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };