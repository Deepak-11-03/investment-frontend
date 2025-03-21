import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import moment from 'moment'

const DatePicker = ({date,setDate}:any) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
        className={`w-full text-left justify-start ${!date && "text-muted-foreground"} h-8 `}
          variant={"outline"}
        //   className={cn(
        //     "w-[240px] justify-start text-left font-normal",
        //     !date && "text-muted-foreground"
        //   )}
        >
          <CalendarIcon />
          {/* <span>Select date</span> */}
          {date ? moment(date).format("MM-DD-YYYY") : <span>Select date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker