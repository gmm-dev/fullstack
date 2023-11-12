//Serviço responsável pela criação de um novo cliente
import prismaClient from "../prisma";

export type ticketNumbers = string[];

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
  async execute({name, cpf, ticket, email, phone, pixKey, status}: CreateCustomerProps){
    console.log("🚀 ~ file: CreateCustomerService.ts:17 ~ CreateCustomerService ~ execute ~ name, cpf, ticket, email, phone, pixKey:", name, cpf, ticket, email, phone, pixKey)


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

    //check if ticket is a number between 1 and 60 and if it has 6 numbers

    // if (!Array.isArray(ticket) || ticket.length !== 6) {
    //   throw new Error("Ticket must be an array of 6 numbers");
    // }

    // for(let i = 0; i < ticket.length; i++){
    //   const ticketNumber = parseInt(ticket[i]);
    //   if(isNaN(ticketNumber) || ticketNumber < 1 || ticketNumber > 60){
    //     throw new Error("Ticket must be a number between 1 and 60");
    //   }
    //   ticket[i] = ticketNumber;
    // }


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
