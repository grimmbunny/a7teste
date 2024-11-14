import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumptionModule } from './consumption/consumption.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/water_monitor'), // Substitua pelo URI do MongoDB Atlas se necessário
    ConsumptionModule,
  ],
})
export class AppModule {}
