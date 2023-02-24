import { AuthController } from './controllers/auth.controller';
import { UserEntity } from 'src/user/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthGuard } from './guards/JwtGuards.guard';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { jwtConstant } from './constant';
import { Module } from '@nestjs/common';
import { AuthServices } from 'src/auth/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async function (configService: ConfigService) {
        return {
          secret: configService.get<string>(jwtConstant.secret),
          signOptions: { expiresIn: '120s' },
        };
      },
    }),
  ],
  providers: [AuthServices, JWTAuthGuard, JwtStrategy, RolesGuard],
  exports: [AuthServices],
  controllers: [AuthController],
})
export class AuthModule {}
