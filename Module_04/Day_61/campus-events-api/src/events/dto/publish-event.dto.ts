import { IsBoolean } from 'class-validator';

export class PublishEventDto {
  @IsBoolean()
  isPublished: boolean;
}