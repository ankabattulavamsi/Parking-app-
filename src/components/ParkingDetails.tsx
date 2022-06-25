import { Box, Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { slotContext } from '../ParkingConext'
import axios from 'axios'

const ParkingDetails = () => {
    const {parkingSlots, setParkingSlots, pay, setPay} = useContext(slotContext)
    // const [pay, setPay] = useState<Boolean>(true)
    const [timeInHour, setTimeInHour] = useState(0)
    const [timeInMinutes, setTimeInMinutes] = useState(0)
    const [charge, setCharge] = useState(0)
    const [counter, setCounter] = useState(0)
    const navigate = useNavigate() 

    const {state}: any = useLocation()
    console.log('each-object',state)

    const onClickPlay = async (id : any) => {
        let carDetails = state.carNumber
        

        setPay(false)
        console.log('=========', carDetails)

       await  axios.post(`https://httpstat.us/200`, {
            method: 'POST',
            headers: {
                Accept : 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({carDetails})
        }).then((response) => {
            console.log('response', response.status)
        })

        const index: any = parkingSlots.findIndex((item: any) => item.id === id)

        if(index !== ''){
            parkingSlots[index].carNumber = ''
            parkingSlots[index].available = true
        }
        setParkingSlots(parkingSlots)
    }

    let timeFunction = () => {
    let findSlotsAndCharge : any = state?.date?.getTime()
    console.log('date-time',findSlotsAndCharge)

    let newData = new Date()

    let entryHour = state?.date.getHours()
    console.log('hours',entryHour)
    let entryMinutes = state?.date?.getMinutes()
    
    console.log('minutes', entryMinutes)

    let currentHour = newData.getHours()
    console.log('hours',currentHour)
    let currentMinutes = newData.getMinutes()
    console.log('minutes', currentMinutes)
   
    let totalEntryMinutes = entryHour * 60 + entryMinutes
    console.log('totalEntryMinutes', totalEntryMinutes)

    let totalCurrentMinutes = currentHour * 60 + currentMinutes
    console.log('totalCurrentMinutes', totalCurrentMinutes)

    let totalTimeInMinutes = Math.floor(totalCurrentMinutes - totalEntryMinutes)
    setTimeInMinutes(totalTimeInMinutes)
    console.log('totalTimeInMinutes', totalTimeInMinutes) 

    let totalTimeInHours = Math.round(totalTimeInMinutes / 60)
    setTimeInHour(totalTimeInHours)
    console.log('totalTimeInHours', totalTimeInHours)

    let totalCharge = 0 

    if(totalTimeInHours <= 2) {
           totalCharge  = 10
       } else{
           totalCharge = (totalTimeInHours - 1) * 10
       }
       setCharge(totalCharge)

    }
    
    useEffect(() => { 
       timeFunction()
        setInterval(() => {
            timeFunction()
        }, 6000)
    }, [])
    



    const onClickBack = (id : any) => {
        navigate('/parking')
    }

    const onClickBackSuccess = (id : any) => {
        setPay(true)
        const index: any = parkingSlots.findIndex((item: any) => item.id === id)

        if(index !== ''){
            parkingSlots[index].carNumber = ''
            parkingSlots[index].available = true
        }
        navigate('/parking')
    }

  return (
    <Box sx={{
        width: 300,
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "50px",
        backgroundColor: 'rgb(236, 231, 240)',
        boxShadow: '10px 15px 20px black'
    }}>
     { pay ? <Box>
        <Box>
            <Typography >Car-Number :- {state?.carNumber}</Typography>
      <Typography >Total Time :-  {timeInHour} : {timeInMinutes}</Typography>
      <Typography >Total Amount :-  {charge}</Typography>
        </Box>
      <Box>
       <Button onClick={() => onClickPlay(state?.id)}  sx={{border: '1px solid black', 
       textAlign: 'center', padding: 1,
        width: 155, borderRadius: 3,
        color: 'black', cursor: 'pointer',
        mt: 4}}>Pay Bill</Button>
     </Box>
      <Button onClick={() => onClickBack(state?.id)}  sx={{border: '1px solid black', 
       textAlign: 'center', padding: 1,
        width: 155, borderRadius: 3,
        color: 'black', cursor: 'pointer',
        mt: 4}}>Back</Button>
         
     </Box> : <Box>
     <Typography  variant='h6' >Payment successful</Typography>
     <Button onClick={() => onClickBackSuccess(state?.id)} sx={{border: '1px solid black', 
       textAlign: 'center', padding: 1,
        width: 155, borderRadius: 3,
        color: 'black', cursor: 'pointer',
        mt: 4}}>Back</Button>
        </Box>}
    </Box>
  )
}

export default ParkingDetails


