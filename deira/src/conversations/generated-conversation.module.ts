import { Module } from '@nestjs/common';
import { ConversationService } from './generated-conversation.service';
import { ConversationController } from './generated-conversation.controller';

@Module({
	imports: [],
	controllers: [ConversationController],
	providers: [ConversationService],
	exports: [ConversationService],
})
export class ConversationModule {}
