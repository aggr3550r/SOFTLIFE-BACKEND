// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { NextFunction, Request } from 'express';
// import { Cart } from 'src/modules/shop/entities/cart.entity';
// import { CartService } from 'src/modules/shop/services/cart.service';
// import { UsersService } from 'src/modules/users/users.service';

// declare global {
//   namespace Express {
//     interface Request {
//       currentCart?: Cart;
//     }
//   }
// }

// @Injectable()
// export class CurrentCartMiddleware implements NestMiddleware {
//   constructor(
//     private cartService: CartService,
//     private userService: UsersService,
//   ) {}

//   async use(req: Request, next: NextFunction) {
//     const { userID } = req.session || {};
//     const { cartID } = req.body;

//     if (userID) {
//       const user = await this.userService.findOne(userID);

//     }
//   }
// }
