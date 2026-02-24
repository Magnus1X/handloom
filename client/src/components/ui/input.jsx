import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-earth-brown/20 bg-white text-earth-brown px-3 py-2 text-sm placeholder:text-earth-brown/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-terracotta focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/50 dark:focus-visible:ring-earth-terracotta",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }