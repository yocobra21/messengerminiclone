import React from 'react'
import Message from './Message'
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'

import './App.css'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    
  appForm: {
    width: '20%',
    right: '50%',
    transform: 'translateX(50%)',
    padding: 20,
    position: 'fixed',
    bottom: 20,
    zIndex: 1000
  }
})

function App() {

  const classes = useStyles()

  const [input, setInput] = React.useState('')
  const [messages, setMessages] = React.useState([])
  const [username, setUsername] = React.useState('')

  const sendMessage = (e) => {
    e.preventDefault()

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  React.useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
      })
  }, [])

  React.useEffect(() => {
    const name = prompt('Please enter your name...')
    setUsername(name)
  }, [])

  return (
    <div className="app">
      <h2>Welcome {username}</h2>
      <form>
        <FormControl className={classes.appForm}>
          <TextField label="Enter a message..." value={input} onChange={e => setInput(e.target.value)} />
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >send msg</Button >
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({id, data}) => (
            <Message key={id} username={username} message={data} />
          ))
          
        }
      </FlipMove>


    </div>
  );
}

export default App
