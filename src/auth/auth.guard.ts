import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuhtGuard implements CanActivate {
  constructor(private authService: AuthService) {} 

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    request.user = {
      name: 'YOUR_NAME',
      email: 'YOUR_EMAIL@email.com'
    };

    return true;
    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    const authorization = request.headers.authorization as string;
    const jwtString = authorization.split('Bearer ')[1];

    this.authService.verify(jwtString);

    return true;
  }
}
