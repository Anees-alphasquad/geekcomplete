import { Type } from "class-transformer"

export class CreateChatDto {
    @Type(() => Number)
    interactionId: number

    message: string
}
