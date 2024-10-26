import {
	Controller,
	Get,
	Post,
	Param,
	Delete,
	Body,
	Put,
	UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItemDto } from './dto/cart-item.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Carts')
@Controller('carts')
@UseGuards(AuthGuard)
export class CartsController {
	constructor(private readonly cartsService: CartsService) {}

	@Get()
	find() {
		return this.cartsService.find();
	}

	@Put()
	updateCart(@Body() updateCartDto: UpdateCartDto) {
		return this.cartsService.update(updateCartDto);
	}

	@Delete()
	clearCart() {
		return this.cartsService.clearCart();
	}

	@Post('promocode/:code')
	applyPromoCode(@Param('code') code: string) {
		return this.cartsService.addPromoCode(code);
	}

	@Delete('promocode')
	removePromoCode() {
		return this.cartsService.removePromoCode();
	}

	@Post('products')
	addProduct(@Body() cartItemDto: CartItemDto) {
		return this.cartsService.addProduct(cartItemDto);
	}

	@Put('products')
	updateProduct(@Body() cartItemDto: CartItemDto) {
		return this.cartsService.updateProduct(cartItemDto);
	}

	@Delete('products')
	removeProduct(@Body() cartItemDto: CartItemDto) {
		return this.cartsService.removeProduct(cartItemDto);
	}
}
