import { Box, Button, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { ChangeEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { slotContext } from '../ParkingConext'

const Parking = () => {
    const [carNumber, setCarNumber] = useState<any>('')
    const {parkingSlots, setParkingSlots} = useContext(slotContext)

    const navigate = useNavigate()
    // const parkingSlots: any = useLocation()

    console.log('data---', parkingSlots)

    const changeHandler =  (event : ChangeEvent<HTMLInputElement>) : void => {
        setCarNumber(event.target.value)
      }

      const onClickParking = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
        //   const dateTime = new Date()
           let dummy: any = [...parkingSlots]
        //    console.log('dummy', dummy)
           let parkingSpaceIsAvailable = dummy.filter((item : any) => item.available === true)
           console.log('isTrue',parkingSpaceIsAvailable)

        if(parkingSpaceIsAvailable.length === 0) {
            alert('no slots ')
           }
           else {
            const findId = parkingSpaceIsAvailable[Math.floor(Math.random() * parkingSpaceIsAvailable.length)].id
        //    console.log('findEchId', findId)
           const index: any = dummy.findIndex((item: any) => item.id === findId)
        //    console.log('index-position', index)
           dummy[index].carNumber = carNumber
           dummy[index].available = false
           dummy[index].date = new Date()
           setParkingSlots(dummy)
           setCarNumber('')
           }
      }

      const onClickOfDetails = ({each} : any) => {
        console.log('get--id',each)
            navigate('/parkingDetails', {
                state: each
            })
      }

    //  let date =  `${parkingSlots?.state?.getDate()}/${parkingSlots?.state?.getMonth()+1}/${parkingSlots?.state?.getFullYear()}`;
      
  return (
    <Container sx={{
        display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
    }}>
        <Box
        sx={{
            width: 300,
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "50px",
            backgroundColor: 'rgb(236, 231, 240)',
            boxShadow: '10px 15px 20px lightBlue inset'
          }}>
            <Typography variant='h4'>Parking Slots</Typography>
            <TextField type='text'
            label='Enter Vehicle Number'
            value={carNumber} name='country'
            role="inputEl"
            onChange={changeHandler}
            sx={{mt: 10}}  />

            <Button disabled={carNumber.length < 1} 
            onClick={onClickParking}
            sx={{border: '1px solid green', 
            textAlign: 'center', padding: 1,
            width: 155, borderRadius: 3,
            color: 'lightBlue', cursor: 'pointer',
            mt: 4}}>Park</Button>
        </Box>
        <Box>
            {parkingSlots.map((each:any, index:number) => {
                return (
                    <Container>
                        {!each.available ? <Box key={index}
                    sx={{textAlign: 'center', border: '2px solid lightBlue', padding: 2, margin: 2, borderRadius: '5px', width: '300px'}} 
                    onClick={() => onClickOfDetails({each})} >
                    <Typography >Space ID:- {each.id}</Typography> 
                    <Typography>Car Number:- {each.carNumber}</Typography>
                    </Box> : <Box sx={{textAlign: 'center', border: '1px solid black', padding: 2, margin: 2, borderRadius: '5px', width: '300px'}} >
                    <Typography >Space ID:- {each.id}</Typography>
                    <Typography>Car Number:- </Typography>
                    </Box> }
                    </Container>
                )
            }
            )}
        </Box>
    </Container>
  )
}

export default Parking
