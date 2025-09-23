import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "-tracking-tighter inline-flex items-center justify-center rounded-sm border h-[25px] px-2 py-1.5 text-[12px] font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    
    variants: {
      variant: {
        default:
          "border-transparent bg-accent text-text-strong text-white-default",
        pending:
          "border-transparent bg-yellow-400 text-white-default",
        denied:
          "border-transparent bg-red-500/80 text-white-default",
        approved:
          "border-transparent bg-green-600/80 text-white-default",
        "review":
          "border-transparent bg-purple-700/80 text-white-default",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        "new register": 
          "rounded-full border-accent bg-accent/10 text-accent font-semibold",  
        "change": 
          "rounded-full border-warning bg-warning/40 text-text-strong font-semibold",
        "counter":
          "rounded-full border-accent bg-accent/10 text-accent font-semibold",
        "fiscal": 
          "border-slate-600 bg-slate-400 text-white font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
