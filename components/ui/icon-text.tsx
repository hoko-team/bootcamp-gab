import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface IconTextProps {
  icon: ReactNode
  children: ReactNode
  className?: string
}

function IconText({ icon, children, className }: IconTextProps) {
  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      {icon}
      <span>{children}</span>
    </div>
  )
}

export { IconText }
