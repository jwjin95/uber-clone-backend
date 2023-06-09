import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";


@Resolver(of => User)
export class UsersResolver{
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Query(returns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args("input") createAccountInput: CreateAccountInput) : Promise<CreateAccountOutput> {
        try {
            const {ok, error} = await this.usersService.createAccount(createAccountInput);
            return {
                ok,
                error,
            }
        } catch(e) {
            return {
                error: e,
                ok: false,
            }
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        try {
            const { ok, error, token } = await this.usersService.login(loginInput);
            return {ok, error, token}
        } catch(error) {
            return {ok: false, error}
        }
    }
} 