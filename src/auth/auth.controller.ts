import { Controller, Post, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('sign-up')
    createNewUser(@Body() body): Promise<any> {
        return this.authService.signUp(body);
    }
    @Post('sign-in')
    signIn(@Body() body): Promise<any> {
        return this.authService.signIn(body);
    }
}
