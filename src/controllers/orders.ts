import { readFile } from "fs/promises"
import RabbitMQService from "../services/rabbitmq.service.js"

export const createOrder = async (req: any, res: any) => {
	// client calls the API to initate order
	// we'll get all items from the cart in product service
	// we'll send out a reservation update (decrement inventory)
	// we'll initiate payment  
	await callGetCartEvent(req.body.cartId)
	res.status(200).json({
		success: true,
		message: 'Order initialized successfully',
	})
}

const callGetCartEvent = (cartId: string) => {
	RabbitMQService.getInstance().publish('products', { cartId })
}

export const initiatePayments = (cart: any) => {
	RabbitMQService.getInstance().publish('payments', { userId: 123, cart, amount: cart.totalPrice, order: { id: Date.now() } })
}

export const paymentCompleted = (status: boolean) => {
	if (status) {
		// send notification
		// send tracking info
		// remove reservedQuantity
		// clear cart
		console.log("Success!!")
	} else {
		// ask user to retry
	}
}

/**
 * userId I want to know which user placed the order - which I'll get from JWT 
 * cartId
 */