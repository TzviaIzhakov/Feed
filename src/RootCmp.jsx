import React, { useEffect, useState } from 'react'
import { messsageService } from './services/message.service.local'


export function RootCmp() {
    const [msg, setMsg] = useState({ txt: '' ,email: ''})
    const [msgs, setMsgs] = useState([])

    useEffect(()=>{
        updateMessages()
    },[])

    const updateMessages = async ()=>{
        setMsgs( await messsageService.query({}))
    }
    const handleChange = ev => {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
      }

      function sendMsg(ev) {
        ev.preventDefault()
        ev.target.reset()
        const newMsg = {txt: msg.txt, email:msg.email }
        addMsg(newMsg)
    }

    async function addMsg(newMsg) {
        const savegMsg = await messsageService.save(newMsg)
        setMsgs(prevMsgs => [...prevMsgs, savegMsg])
    }

    if(!msgs.length) return

    return (
            <main>
             
             <form onSubmit={sendMsg}>
                {console.log(msg)}

                <input type="email" onChange={handleChange} placeholder='Email' name='email'/>
                <textarea name="txt" cols="30" rows="10" placeholder='Message' onChange={handleChange}></textarea>
                <button>Submit</button>
             </form>
             <section>
               {msgs?.map((msg,idx)=><article key={idx}>
                {msg.txt}
                {msg.email}
               </article>)}
             </section>
            </main>
    )
}


