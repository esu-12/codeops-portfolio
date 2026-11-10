
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from "class-validator";
import { AREAS } from "../order.types";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  customerName!: string;

  @IsIn(AREAS)
  area!: (typeof AREAS)[number];

  @IsInt()
  @Min(1)
  totalSantim!: number;

  @IsOptional()
  @IsString()
  @Matches(/^(?:\+251|0)(?:9|7)\d{8}$/)
  teleBirrPhone?: string;
}
