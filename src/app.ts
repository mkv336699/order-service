import express from 'express'
import router from './routes/index.js'
import RabbitMQService from './services/rabbitmq.service.js'

const app = express()
app.use(express.json())

// Initialize RabbitMQ once
RabbitMQService.getInstance().initialize()

// Mount routes
app.use('/', router)

app.listen(3001, () => console.log('Order service started at port', 3001))