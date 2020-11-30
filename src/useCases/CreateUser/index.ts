import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const maitrapMailProvider = new MailTrapMailProvider;
const postgresUserRepository = new PostgresUserRepository;

const createUserCase = new CreateUserUseCase(
    postgresUserRepository,
    maitrapMailProvider,
)

const createUserController = new CreateUserController(createUserCase);

export { createUserCase, createUserController };