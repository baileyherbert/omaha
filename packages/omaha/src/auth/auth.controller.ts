import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { User } from 'src/support/User';
import { AuthService } from './auth.service';
import { Guest } from './decorators/guest.decorator';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';
import { Token } from './tokens/models/Token';
import { TokensService } from './tokens/tokens.service';

@Controller('auth')
export class AuthController {

	public constructor(
		private readonly accounts: AccountsService,
		private readonly tokens: TokensService,
	) {}

	@Get('identity')
	@Guest()
	public async getIdentity(@User() token?: Token) {
		if (token) {
			return {
				access: token.isForAccount() ? 'account' : 'repository',
				ttl: Math.floor(token.ttl / 1000),
				scopes: token.scopes,
				account: token.isForAccount() ? token.account : undefined,
			};
		}

		return {
			access: 'unauthenticated',
			scopes: []
		};
	}

	@Post('login')
	@Guest(false)
	public async login(@Body() dto: LoginDto) {
		const account = await this.accounts.login({
			email: dto.email ?? '',
			password: dto.password ?? ''
		});

		const token = await this.tokens.createAccountToken(account, 86400 * 30);

		return {
			token,
			account
		};
	}

	@Post('register')
	@Guest(false)
	public async register(@Body() dto: RegisterDto) {
		const account = await this.accounts.createAccount(dto);
		const token = await this.tokens.createAccountToken(account);

		return {
			token,
			account
		};
	}

	@Post('confirm')
	@Guest()
	public async confirmEmail() {
		throw new UnauthorizedException();
	}

	@Post('password_reset/request')
	@Guest(false)
	public async passwordResetRequest() {
		throw new UnauthorizedException();
	}

	@Post('password_reset/authorize')
	@Guest(false)
	public async passwordResetAuthorize() {
		throw new UnauthorizedException();
	}

	@Post('password_reset/submit')
	@Guest(false)
	public async passwordResetSubmit() {
		throw new UnauthorizedException();
	}

}
