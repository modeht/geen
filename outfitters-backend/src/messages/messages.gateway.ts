import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import { AbstractGateway } from 'lib/abstract.gateway';
import { Socket } from 'socket.io';
import { WsAuthGuard } from 'src/auth/guards/ws.auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';

export const MESSAGES_EVENT = 'messages';
export const REACTION_EVENT = 'reactions';

// TODO: configure CORS properly
@UseGuards(WsAuthGuard)
@WebSocketGateway({ namespace: 'messages', cors: { origin: '*' } })
export class MessagesGateway extends AbstractGateway {
	constructor(
		protected readonly jwtService: JwtService,
		protected readonly configService: ConfigService,
		@Inject(forwardRef(() => MessagesService))
		private readonly messagesService: MessagesService,
	) {
		super(jwtService, configService);
	}

	@SubscribeMessage('sendMessage')
	async handleMessage(
		@MessageBody() createMessageDto: CreateMessageDto,
		@ConnectedSocket() client: Socket,
	) {
		const userId = client['session'].sub;
		const message = await this.messagesService.create(userId, createMessageDto);
		return message;
	}

	@SubscribeMessage('sendReaction')
	async handleReaction(
		@MessageBody() updateMessageDto: UpdateMessageDto,
		@ConnectedSocket() client: Socket,
	) {
		const userId = client['session'].sub;
		const { messageId, reaction } = updateMessageDto;
		const message = await this.messagesService.reactToMessage(
			userId,
			messageId,
			reaction,
		);
		return message;
	}

	@SubscribeMessage('readMessage')
	async handleReadMessage(
		@MessageBody() updateMessageDto: UpdateMessageDto,
		@ConnectedSocket() client: Socket,
	) {
		const userId = client['session'].sub;
		const { messageId } = updateMessageDto;
		return this.messagesService.readMessage(userId, messageId);
	}

	async sendReaction(userId: number, message: any) {
		this.emitMessage(userId, REACTION_EVENT, message);
	}

	async sendMessage(userId: number, message: any) {
		this.emitMessage(userId, MESSAGES_EVENT, message);
	}
}
