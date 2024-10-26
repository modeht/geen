import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { ConversationsService } from './conversations.service';
import { FindConversationDto } from './dto/find-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Controller('conversations')
@ApiTags('conversations')
@UseGuards(AuthGuard)
export class ConversationsController {
	constructor(private readonly conversationsService: ConversationsService) {}

	@Get()
	findMyConversation(
		@Query() paginated: Paginated,
		@Query() findConversationDto: FindConversationDto,
	) {
		return this.conversationsService.findAll(paginated, findConversationDto);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
		return this.conversationsService.update(+id, updateConversationDto);
	}
}
