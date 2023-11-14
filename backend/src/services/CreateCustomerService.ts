//Serviço responsável pela criação de um novo cliente
import prismaClient from "../prisma";

export type ticketNumbers = number[];

export interface CreateCustomerProps {
  name: string;
  email?: string;
  cpf: string;
  phone?: string;
  pixKey?: string;
  ticket: ticketNumbers;
  status: true;
}

class CreateCustomerService {
  async execute(data: CreateCustomerProps) {
    const { name, cpf, ticket, email, phone, pixKey, status } = data;
    console.log("🚀 ~ file: CreateCustomerService.ts:17 ~ CreateCustomerService ~ execute ~ name, cpf, ticket, email, phone, pixKey:", name, cpf, ticket, email, phone, pixKey)

    // Validate that all numbers in the ticket array are between 1 and 60
    if (!ticket.every(num => num >= 1 && num <= 60)) {
      throw new Error('All ticket numbers must be between 1 and 60');
    }

    const customerAlreadyExists = await prismaClient.customer.findFirst({
      where: {
        cpf,
      },
    });

    if(customerAlreadyExists){
      throw new Error("Customer already exists!");
    }

    if(!name || !cpf || !ticket){
      throw new Error("Name, CPF and Ticket are required");
    }

    //check if cpf is valid (11 digits)
    if(cpf.length < 11){
      throw new Error("CPF must have 11 digits");
    }

    // Check if ticket has 6 numbers
    if (ticket.length !== 6) {
      throw new Error('Ticket must have 6 numbers');
    }

    // Check if all ticket numbers are between 1 and 60
    if (!ticket.every(num => num >= 1 && num <= 60)) {
      throw new Error('All ticket numbers must be between 1 and 60');
    }





    const customer = await prismaClient.customer.create({
      data: {
        name,
        cpf,
        ticket,
        email,
        phone,
        pixKey,
        status
      },
    });
    return customer;
    }
  }

  export { CreateCustomerService };
