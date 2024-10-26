import { WebSocketGateway } from '@nestjs/websockets';
import { AbstractGateway } from 'lib/abstract.gateway';

export const NOFITICATIONS_EVENT = 'notifications';
// TODO: configure CORS properly
@WebSocketGateway({ namespace: 'notifications', cors: { origin: '*' } })
export class NotificationsGateway extends AbstractGateway {
	sendNotification(userId: number, notification: any) {
		this.emitMessage(userId, NOFITICATIONS_EVENT, notification);
	}
}
