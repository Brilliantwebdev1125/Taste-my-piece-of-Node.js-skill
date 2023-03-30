import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GiftCodeTemplateSchema } from "./schema/gift-code-template.schema";
import { GiftCodeTemplateController } from "./gift-code-template.controller";
import { GiftCodeTemplateRepository } from "./gift-code-template.repository";
import { GiftCodeTemplateService } from "./gift-code-template.service";



@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'GiftCodeTemplate', schema: GiftCodeTemplateSchema },
    ]),
  ],
  controllers: [GiftCodeTemplateController],
  providers: [
    GiftCodeTemplateRepository,
    GiftCodeTemplateService],
  exports: [GiftCodeTemplateService]
})
export class GiftCodeTemplateModule {}
