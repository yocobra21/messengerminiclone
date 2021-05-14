import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    messageCard: {
        margin: 10,
        padding: 10,
        width: 'fit-content',
    },

    messageUser: {
        margin: 10,
        padding: 10,
        marginLeft: 'auto',
        textAlign: 'right',
        width: 'fit-content',
    },

    messageUserCard: {
        backgroundColor: '#0b81ff',
        color: 'white'
    },

    messageGuestCard: {
        backgroundColor: '#e9e9eb'
    }

})

const Message = React.forwardRef(({ username, message }, ref) => {

    const isUser = username === message.username
    const classes = useStyles()
    
    return (
            <div ref={ref} className={isUser ? classes.messageUser : classes.messageCard}>
                <Card className={isUser ? classes.messageUserCard : classes.messageGuestCard}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="h2"
                        >
                            {message.username} : {message.message}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
    )
})

export default Message