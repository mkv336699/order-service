import express from 'express'
import { createPublisher } from './service/rabbitmq-service.js'

const app = express()

app.get("/", (req, res) => {
    res.json({ "success": true, "message": "order services is healthy and running" })
})

// Publish a message to a custom exchange
// await pub.send(
//     { exchange: 'my-events', routingKey: 'users.visit' }, // metadata
//     { id: 1, name: 'Alan Turing' }
//     ) // message content

const pub = createPublisher()

app.get("/publish", async (req, res) => {
    await pub.send('paymet', { message: "Let's Go" })
    res.json({ "success": true })
})

app.listen(3000, () => console.log("Order services started at port", 3000))