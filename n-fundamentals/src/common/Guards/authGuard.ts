import { AuthGuard } from '@nestjs/passport';

export class JWTAuthGuard extends AuthGuard('JWT') {}
