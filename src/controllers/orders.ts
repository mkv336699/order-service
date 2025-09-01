import { writeFile } from "fs/promises"
import RabbitMQService from "../services/rabbitmq.service.js"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const auditTrailFilePath = join(__dirname, '../../src/assets/audit_trail.txt')

export const createOrder = async (req: any, res: any) => {
	// client calls the API to initate order
	// we'll get all items from the cart in product service
	// we'll send out a reservation update (decrement inventory)
	// we'll initiate payment  
	callGetCartEvent(req.body.cartId)

	// Logger
	await writeFile(auditTrailFilePath, Date() + ' ' + JSON.stringify([{ type: 'order', status: 'initiated' }]) + '\n', { flag: 'a' })

	res.status(200).json({
		success: true,
		message: 'Order initialized successfully',
	})
}

const callGetCartEvent = (cartId: string) => {
	RabbitMQService.getInstance().publish('products', { cartId })
}

export const initiatePayments = async (cart: any) => {
	RabbitMQService.getInstance().publish('payments', { userId: 123, cart, amount: cart.totalPrice, order: { id: Date.now() } })
	await writeFile(auditTrailFilePath, Date() + ' ' + JSON.stringify([{ type: 'payment', status: 'initiated' }]) + '\n', { flag: 'a' })
}

export const paymentCompleted = async (status: boolean) => {
	if (status) {
		// send notification
		// send tracking info
		// remove reservedQuantity
		// clear cart
		console.log("Success!!")
		RabbitMQService.getInstance().publish('notifications', { order: { id: Date.now(), status: 'success' } })
	} else {
		// ask user to retry
		RabbitMQService.getInstance().publish('notifications', { order: { id: Date.now(), status: 'failed', allowRetry: true } })
	}
	await writeFile(auditTrailFilePath, Date() + ' ' + JSON.stringify([{ type: 'payment', status: status ? 'success' : 'failed' }]) + '\n', { flag: 'a' })
	await writeFile(auditTrailFilePath, Date() + ' ' + JSON.stringify([{ type: 'order', status: status ? 'completed' : 'failed' }]) + '\n', { flag: 'a' })
}

/**
 * userId I want to know which user placed the order - which I'll get from JWT 
 * cartId
 */