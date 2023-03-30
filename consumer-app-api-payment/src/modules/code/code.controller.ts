import { Controller, UsePipes, ValidationPipe } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ValidateCodeDto } from "./dto/code.dto";
import { CodeService } from "./code.service";

@Controller()
export class CodeController {

  constructor(
    private readonly codeService: CodeService) {
  }

  @MessagePattern({ cmd: 'validate-code' })
  @UsePipes(new ValidationPipe())
  async validateAndroidOfferCode(payload: ValidateCodeDto) {
    return await this.codeService.validateCode(
      payload.params.id, payload.body.code
    );
  };
}