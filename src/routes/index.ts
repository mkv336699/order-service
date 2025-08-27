import { Router } from 'express'
import { publishMessage } from '../controllers/publish.controller.js'

const router = Router()

router.get('/', (req, res) => {
	res.json({ success: true, message: 'order service is healthy and running' })
})

router.get('/publish', publishMessage)

router.post('/orders', (req, res) => {
	// client calls the API to initate order
	// we'll get all items from the cart in product service
	// we'll send out a reservation update (decrement inventory)
	// we'll initiate payment  
})

export default router