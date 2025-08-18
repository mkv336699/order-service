import { Connection } from 'rabbitmq-client'

export function initialiZeRabbitMQ() {
    const rabbit = new Connection('amqp://guest:guest@localhost:5672')

    rabbit.on('error', (err) => {
        console.log('RabbitMQ connection error', err)
    })
    
    rabbit.on('connection', () => {
        console.log('Connection successfully (re)established')
    })
    
    // Consume messages from a queue:
    const sub = rabbit.createConsumer({
        queue: 'user-events',
        queueOptions: { durable: true },
        qos: { prefetchCount: 2 },
        exchanges: [{ exchange: 'my-events', type: 'topic' }],
        queueBindings: [{ exchange: 'my-events', routingKey: 'users.*' }],
    }, async (msg) => {
        console.log('received message (user-events)', msg)
    })
    
    
    sub.on('error', (err) => {
        // Maybe the consumer was cancelled, or the connection was reset before a
        // message could be acknowledged.
        console.log('consumer error (user-events)', err)
    })
}

// Declare a publisher
export function createPublisher() {
    const rabbit = new Connection('amqp://guest:guest@localhost:5672')
    const pub = rabbit.createPublisher({
        confirm: true,
        maxAttempts: 2,
        exchanges: [{ exchange: 'my-events', type: 'topic' }]
    })

    return pub
}

// Clean up when you receive a shutdown signal
// async function onShutdown() {
//     await pub.close()
//     await sub.close()
//     await rabbit.close()
// }
// process.on('SIGINT', onShutdown)
// process.on('SIGTERM', onShutdown)