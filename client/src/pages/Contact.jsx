import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({listing}) => {
    const [landlord,setLandlord] = useState(null)
    const [message,setMessage] = useState("")
    


    useEffect(()=>{
        const fetchingUser = async()=>{
             try{
               const res = await fetch(`/api/user/${listing.userRef}`)
               const data = await res.json()
               console.log(data)
               setLandlord(data)
             }catch(error){
                console.log(error.message)

             }
        }

        fetchingUser()

    },[listing.userRef])
    const messageHandler = (e)=> setMessage(e.target.value)
  return (
    <div>
        {
            landlord && (
                <div className='flex flex-col gap-4 w-1/2 mx-auto'>
                    <p>Contact <span>{landlord.username}</span> for <span>{listing.name}</span></p>
                    <textarea name="message" id="message" className='p-2'  rows={2} value={message} onChange={messageHandler} ></textarea>
                    <Link
                    className='bg-green-500 text-white p-3 rounded-md text-center'
                     to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                    >
                     Send Message
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default Contact