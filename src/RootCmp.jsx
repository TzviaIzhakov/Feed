import React, { useState } from 'react'


export function RootCmp() {
    const [msg, setMsg] = useState({ txt: '' ,email: ''})
    const [msgs, setMsgs] = useState([])

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

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }
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


