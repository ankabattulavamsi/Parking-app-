import React, {createContext, useState} from 'react'

export interface ParkingProps {
    parkingSlots: any[] 
    setParkingSlots: (state :any ) => void 
    pay : any,
    setPay: any
}

export const slotContext = createContext({} as ParkingProps) 

const ParkingContext = ({children} : any) => {
    const [parkingSlots, setParkingSlots] = useState<any[]>([])
    const [pay, setPay] = useState<any>(true)

    return <slotContext.Provider value={{parkingSlots, setParkingSlots, pay, setPay}}>{children}</slotContext.Provider>
}

export default ParkingContext












 //  let currentDate : any = Math.abs((new Date() / 1000).toFixed(0))
    //  console.log(currentDate)

    //  let currentHour = state?.date.getHours() + entryHour
    //  console.log('hours',currentHour)

    //  let currentMinutes = state?.date?.getMinutes()
    //  console.log('minutes', currentMinutes)

    //  let totalEntryMinutes = entryHour * 60 + entryMinutes
    //  console.log('totalEntryMinutes', totalEntryMinutes)

    //  let totalCurrentMinutes = currentHour * 60 + currentMinutes 
    //  console.log('totalCurrentMinutes', totalCurrentMinutes)