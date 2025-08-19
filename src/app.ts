import express from 'express'
import router from './routes/index.js'
import RabbitMQService from './services/rabbitmq.service.js'

const app = express()

// Initialize RabbitMQ once
RabbitMQService.getInstance().initialize()

// Mount routes
app.use('/', router)

app.listen(3000, () => console.log('Order service started at port', 3000))