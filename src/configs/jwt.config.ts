import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export function getJwtConfig(configService: ConfigService): JwtModuleOptions {
    return {
        secret: configService.get('JWT_SECRET')
    }
}