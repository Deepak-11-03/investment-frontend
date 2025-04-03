import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import moment from 'moment'
import { DateAfter } from 'react-day-picker'

const DatePicker = ({ date, setDate, required = false, error }:any) => {


  // Match days after the 2nd of February 2019
  const matcher: DateAfter = { after: new Date() };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          name='date'
          className={`w-full text-left justify-start ${!date && "text-muted-foreground"} outline-1 outline-gray-300 h-8   ${error ? 'outline-red-500 focus:outline-red-500' : ''}`}
          variant={"outline"}
        //   className={cn(
        //     "w-[240px] justify-start text-left font-normal",
        //     !date && "text-muted-foreground"
        //   )}
        >
          <CalendarIcon />
          {/* <span>Select date</span> */}
          {date ? moment(date).format("MMMM DD, YYYY") : <span>Select date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          disabled={matcher}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          required={required}
          
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker