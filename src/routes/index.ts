import { Router } from 'express'
import { publishMessage } from '../controllers/publish.controller.js'

const router = Router()

router.get('/', (req, res) => {
	res.json({ success: true, message: 'order service is healthy and running' })
})

router.get('/publish', publishMessage)

export default router


