import { IsNumber, IsOptional, Min } from 'class-validator';

export class PageInput {
  constructor(page: any, size: any) {
    this.page = Number(page);
    this.size = Number(size);
  }

  @IsOptional()
  @IsNumber()
  @Min(0)
  page: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  size: number;
}