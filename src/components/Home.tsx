import { Button, Container, TextField, Typography } from '@mui/material'

import React, { ChangeEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { slotContext } from '../ParkingConext';

export interface Model {
    id : number;
    name : string;
 }

const Home = () => {
    const [slots, setSlots] = useState<any>('')
    // const [parkingSlots, setParkingSlots] = useState<any[]>([])
    const { setParkingSlots} = useContext(slotContext)
    // console.log('123--',parkingSlots)

    const navigate = useNavigate()

    const changeHandler =  (event : ChangeEvent<HTMLInputElement>) : void => {
        setSlots(event.target.value)
      }

      const onClickSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
       let dummy = []
        for(let i = 1; i <= slots; i++){
            const newObject = {
                id: Math.floor(Math.random() * 10000),
                carNumber: '',
                available: true,
                date: new Date()
            }
            dummy.push(newObject)
        }
        setParkingSlots(dummy)
        navigate('/parking')
      }


  return (
    <Container 
    sx={{
        width: 300,
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "50px",
        backgroundColor: 'rgb(236, 231, 240)',
        boxShadow: '10px 15px 20px lightGreen inset'
      }}>
        <Typography variant='h4'>Admin slots</Typography>
      <TextField type='text'
      label='Enter no of slots' 
      value={slots} name='country'
      role="inputEl"
      data-testid='parking-create-text-input'
      onChange={changeHandler}
      sx={{mt: 2}}  />
      <Button onClick={onClickSubmit}
      data-testid='parking-create-submit-button'
       sx={{border: '1px solid green', 
       textAlign: 'center', padding: 1,
        width: 155, borderRadius: 3,
        color: 'lightgreen', cursor: 'pointer',
        mt: 4}}>Submit</Button>
    </Container>
  )
}

export default Home
