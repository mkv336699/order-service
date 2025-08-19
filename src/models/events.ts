export type UserEvent = {
	type: 'users.created' | 'users.updated' | 'users.deleted'
	userId: string
	payload: Record<string, unknown>
}


