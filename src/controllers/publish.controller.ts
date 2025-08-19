import { Request, Response } from 'express'
import RabbitMQService from '../services/rabbitmq.service.js'

export async function publishMessage(req: Request, res: Response) {
	const { routingKey = 'payment', message = "Let's Go" } = req.query as Record<string, string>

	try {
		await RabbitMQService.getInstance().publish(String(routingKey), { message })
		res.json({ success: true })
	} catch (err) {
		res.status(500).json({ success: false, error: (err as Error).message })
	}
}


