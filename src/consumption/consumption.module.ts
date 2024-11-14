import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumptionService } from './consumption.service';
import { ConsumptionController } from './consumption.controller';
import { Consumption, ConsumptionSchema } from './schemas/consumption.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Consumption.name, schema: ConsumptionSchema },
    ]),
  ],
  controllers: [ConsumptionController],
  providers: [ConsumptionService],
})
export class ConsumptionModule {}
