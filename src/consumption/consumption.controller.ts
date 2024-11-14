import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';

@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Post()
  async createConsumption(@Body() createConsumptionDto: CreateConsumptionDto) {
    return this.consumptionService.create(createConsumptionDto);
  }

  @Get('history')
  async getConsumptionHistory(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.consumptionService.getHistory(
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('alerts')
  async checkAlerts(@Query('userId') userId: string) {
    return this.consumptionService.checkForAlerts(userId);
  }
}
