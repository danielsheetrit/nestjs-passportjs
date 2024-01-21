import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {
  @Get()
  getHello() {
    return 'Hello World';
  }
}
