"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, size = "lg", variant = "default", children, ...props }, ref) => {
    return (
      <>
        <button
          ref={ref}
          className={cn(
            buttonVariants({ size, variant }),
            // Animated shine overlay
            "relative overflow-hidden isolate",
            "bg-primary text-primary-foreground",
            "before:absolute before:inset-0 before:bg-[radial-gradient(150px_50px_at_var(--x,0%)_-20%,rgba(255,255,255,0.35),transparent_60%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
            "after:absolute after:inset-y-0 after:-left-1/2 after:w-[150%] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:translate-x-[-100%] hover:after:animate-[shimmer_1.6s_ease-in-out]",
            className,
          )}
          {...props}
          onMouseMove={(e) => {
            // optional follow-light effect
            const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            ;(e.currentTarget as HTMLButtonElement).style.setProperty("--x", `${x}%`)
            props.onMouseMove?.(e)
          }}
        >
          {children}
        </button>
        <style jsx global>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </>
    )
  },
)

ShinyButton.displayName = "ShinyButton"
