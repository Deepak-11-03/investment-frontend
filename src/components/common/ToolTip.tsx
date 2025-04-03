import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const ToolTip = ({children, text}:any) => {
  return (
      <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
              <TooltipContent>
                  <p>{text}</p>
              </TooltipContent>
          </Tooltip>
      </TooltipProvider>

  )
}

export default ToolTip