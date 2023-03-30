import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AdaptyService } from "./adapty.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('ADAPTY_URL'),
        headers: {
          'Authorization': 'Api-Key ' + configService.get('ADAPTY_SECRET_KEY')
        },
        timeout: 5000,
        maxRedirects: 5
      }),
      inject: [ConfigService]
    }),
    ConfigModule
  ],
  providers: [AdaptyService],
  exports: [AdaptyService]
})
export class AdaptyModule {}