import { UnauthorizedException } from '@nestjs/common';

export const handleAuth = (middleware: any) => {
  try {
    const req = middleware.req; 
    /*if (req.headers.authorization) {
   
        return {
            headers: {
                authorization: 'Bearer random-token',
            },
        };
      }*/
    return middleware;
  } catch (err) {
    throw new UnauthorizedException(
      'User unauthorized with invalid authorization Headers',
    );
  }
};
