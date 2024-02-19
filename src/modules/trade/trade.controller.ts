import { Controller } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Post, UseGuards } from '@nestjs/common';

@Controller('trade')
export class TradeController {
    @UseGuards(AuthGuard)
    @Post('start-bot')
    async startBot() {
        return 'Bot started';
    }
}
