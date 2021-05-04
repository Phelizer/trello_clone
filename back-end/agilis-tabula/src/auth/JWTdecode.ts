import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

export const JwtDecode = (token: string) => {
  const secret = jwtConstants.secret;
  const jwtService = new JwtService({ secret: secret });
  return jwtService.decode(token);
};

export const getToken = (BearerToken: string) => BearerToken.split(' ')[1];

export const getUserIDFromToken = (BearerToken: string) => {
  const token = getToken(BearerToken);
  const decodedJWT = JwtDecode(token);
  const user_id = decodedJWT.sub;

  return user_id;
};
