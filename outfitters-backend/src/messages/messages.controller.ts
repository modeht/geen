import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthContext } from 'src/auth/auth.context';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { FindMessagesDto } from './dto/find-messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
	constructor(
		private readonly messagesService: MessagesService,
		private readonly authContext: AuthContext,
	) {}

	@Get()
	findAll(@Query() findMessagesDto: FindMessagesDto, @Query() paginated: Paginated) {
		const userId = this.authContext.getUser().sub;
		return this.messagesService.findAll(userId, findMessagesDto, paginated);
	}

	@Post()
	create(@Body() createMessageDto: CreateMessageDto) {
		const userId = this.authContext.getUser().sub;
		return this.messagesService.create(userId, createMessageDto);
	}
}
