import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-earth-terracotta text-white hover:bg-earth-terracotta/90 dark:bg-earth-terracotta dark:text-white dark:hover:bg-earth-terracotta/90",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-700",
        outline:
          "border border-earth-brown/20 bg-transparent text-earth-brown hover:bg-earth-cream hover:text-earth-brown dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:hover:text-white",
        secondary:
          "bg-earth-sage text-white hover:bg-earth-sage/80 dark:bg-earth-sage dark:text-white dark:hover:bg-earth-sage/80",
        ghost: "text-earth-brown hover:bg-earth-cream hover:text-earth-brown dark:text-white dark:hover:bg-white/10 dark:hover:text-white",
        link: "text-earth-terracotta underline-offset-4 hover:underline dark:text-earth-terracotta",
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
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }