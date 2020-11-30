import { User } from "../../Entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./ICreateUserDTO";

export class CreateUserUseCase {
    constructor(
       private usersRepository: IUserRepository,
       private mailProvider: IMailProvider,
    ){}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error('User already exist');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

       await this.mailProvider.sendEmail({
            to: {
                email: data.email,
                name: data.name,
            },
            from: {
                name: 'Equipe do meu app',
                email: 'equipe@meuapp.com',
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p> Você ja pode fazer login em nossa plataforma </p>',
        })
    }
}