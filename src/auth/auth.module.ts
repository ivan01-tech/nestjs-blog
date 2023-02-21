import { jwtConstant } from './constant';
import { Module } from '@nestjs/common';
import { AuthServices } from 'src/auth/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async function (configService: ConfigService) {
        return {
          secret: configService.get<string>(jwtConstant.secret),
          signOptions: { expiresIn: '120' },
        };
      },
    }),
  ],
  providers: [AuthServices],
  exports: [AuthServices],
})
export class AuthModule {}
