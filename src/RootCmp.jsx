import React, { useEffect, useState } from 'react'
import { messageService } from './services/message.service.local'
import demoUser from './assets/img/demo-user.png'

export function RootCmp() {
  const [msg, setMsg] = useState(messageService.getEmptyMessage())
  const [msgs, setMsgs] = useState([])
  const [filteBy, setFilterBy] = useState(messageService.getDefaultFilter)

  useEffect(() => {
    updateMessages(filteBy)
  }, [filteBy])

  const updateMessages = async (filteBy) => {
    setMsgs(await messageService.query(filteBy))
  }

  const handleChange = ev => {
    const { name, value } = ev.target
    setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
  }

  const handleChangeForFilter = ev => {
    const { value } = ev.target
    setFilterBy(prevFilter => ({ ...prevFilter, 'txt': value, 'email': value }))
  }

  function sendMsg(ev) {
    ev.preventDefault()
    ev.target.reset()
    const newMsg = { txt: msg.txt, email: msg.email }
    addMsg(newMsg)
  }

  async function addMsg(newMsg) {
    const saveMsg = await messageService.save(newMsg)
    setMsgs(prevMsgs => [...prevMsgs, saveMsg])
  }

  if (!msgs.length) return

  return (
    <main className='home'>
      <div className="msg-display">
        <form onSubmit={sendMsg} className='msg-form'>
          <input required type="email" onChange={handleChange} placeholder='Email' name='email' className='email-input' />
          <textarea required name="txt" cols="30" rows="4" placeholder='Message' onChange={handleChange} className='msg-input' ></textarea>
          <div className="submit-btn-area flex">
            <button>Submit</button>
          </div>
        </form>
        <div className="msg-list">
          <input type="text" onChange={handleChangeForFilter} placeholder='Filter' className='filter-input' />
          <section className='msg-preview'>
            {msgs?.map((msg, idx) =>
              <article key={idx}>
                <div className="mini-user flex">
                  <img src={demoUser} alt="demo-user" />
                  <div className="mini-user-details flex">
                  <span className="email-user">{msg.email}</span>
                  <span className='msg-user'>{msg.txt}</span>
                  </div>
                </div>
              </article>)}
          </section>
        </div>
      </div>

    </main>
  )
}


