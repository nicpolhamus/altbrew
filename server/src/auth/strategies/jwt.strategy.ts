import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ModuleRef, ContextIdFactory } from "@nestjs/core";
import { AuthService } from "../auth.service";
import { JwtPayload } from "../jwt-payload.model";
import { Environment } from "src/common/environment";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private moduleRef: ModuleRef,
    @Inject('ENVIRONMENT_CONFIG')
    private readonly envConfig: Environment
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: String(envConfig.JWTSECRET)
    });
  }

  async validate(payload: JwtPayload, request: Request) {
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const validToken = await authService.validateUserFromToken(payload);
    if (!validToken) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, email: payload.email };
  }
}