import { Router } from 'express'
import { publishMessage } from '../controllers/publish.controller.js'
import { createOrder } from '../controllers/orders.js'

const router = Router()

router.get('/', (req, res) => {
	res.json({ success: true, message: 'Order service is healthy and running' })
})

// dummy
router.get('/publish', publishMessage)

router.post('/orders', createOrder)

export default router