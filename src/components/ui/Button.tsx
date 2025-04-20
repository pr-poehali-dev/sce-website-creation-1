import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "font-scp inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sce-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          
          // Варианты
          variant === "default" && "bg-sce-primary text-white hover:bg-sce-secondary",
          variant === "secondary" && "bg-sce-secondary text-white hover:bg-sce-accent",
          variant === "outline" && "border border-sce-lightgray bg-transparent text-sce-primary hover:bg-sce-lightgray",
          variant === "ghost" && "bg-transparent text-sce-primary hover:bg-sce-lightgray",
          variant === "link" && "bg-transparent text-sce-primary underline hover:text-sce-secondary",
          variant === "danger" && "bg-destructive text-white hover:bg-destructive/90",
          
          // Размеры
          size === "sm" && "px-3 py-1 text-sm",
          size === "md" && "px-4 py-2",
          size === "lg" && "px-6 py-3 text-lg",
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
