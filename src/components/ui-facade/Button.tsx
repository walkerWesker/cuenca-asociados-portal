
import React from 'react';
import { Button as HeroButton } from '@heroui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    // Map our variants to HeroUI variants
    const getHeroVariant = () => {
      switch (variant) {
        case 'destructive':
          return 'flat';
        case 'outline':
          return 'bordered';
        case 'secondary':
          return 'flat';
        case 'ghost':
          return 'light';
        case 'link':
          return 'light';
        default:
          return 'solid';
      }
    };

    const getHeroColor = () => {
      switch (variant) {
        case 'destructive':
          return 'danger';
        case 'secondary':
          return 'default';
        default:
          return 'primary';
      }
    };

    const getHeroSize = () => {
      switch (size) {
        case 'sm':
          return 'sm';
        case 'lg':
          return 'lg';
        default:
          return 'md';
      }
    };

    if (asChild) {
      return (
        <span className={cn(buttonVariants({ variant, size, className }))}>
          {children}
        </span>
      );
    }

    return (
      <HeroButton
        ref={ref}
        variant={getHeroVariant()}
        color={getHeroColor()}
        size={getHeroSize()}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </HeroButton>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
