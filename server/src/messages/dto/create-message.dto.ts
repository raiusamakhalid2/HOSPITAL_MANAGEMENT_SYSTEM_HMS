import { Conversation } from "src/conversation/entities/conversation.entity";

export class CreateMessageDto {
    readonly text             : string;
    readonly conversation     : Conversation;
    readonly sender           : string;
}
