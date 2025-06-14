import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // console.log('COOKIES: ', req.cookies);
    const authToken = req.cookies['app-token'];
    if (!authToken) {
      // console.log('NO AUTH TOKEN COOKIE PASSED');
      return next();
    }
    const user = await this.authService.getUserFromToken(authToken);
    // console.log('AUTH TOKEN FOUND FOR USER: ', user);
    req['user'] = user;
    next();
  }
}