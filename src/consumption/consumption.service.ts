import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consumption } from './schemas/consumption.schema';
import { CreateConsumptionDto } from './dto/create-consumption.dto';

@Injectable()
export class ConsumptionService {
  constructor(
    @InjectModel(Consumption.name) private consumptionModel: Model<Consumption>,
  ) {}

  async create(
    createConsumptionDto: CreateConsumptionDto,
  ): Promise<Consumption> {
    const createdConsumption = new this.consumptionModel(createConsumptionDto);
    return createdConsumption.save();
  }

  async getHistory(startDate: Date, endDate: Date): Promise<Consumption[]> {
    return this.consumptionModel
      .find({
        date: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }

  async checkForAlerts(userId: string): Promise<boolean> {
    const consumptions = await this.consumptionModel
      .find({ userId })
      .sort({ date: -1 })
      .limit(2)
      .exec();
    if (consumptions.length < 2) return false;
    return consumptions[0].amount > consumptions[1].amount;
  }
}
