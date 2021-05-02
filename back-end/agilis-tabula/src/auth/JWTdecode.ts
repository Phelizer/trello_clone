import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

export const JwtDecode = (token: string) => {
  const secret = jwtConstants.secret;
  const jwtService = new JwtService({ secret: secret });
  return jwtService.decode(token);
};

export const getToken = (BearerToken: string) => BearerToken.split(' ')[1];
