//Serviço responsável pela criação de um novo cliente

import prismaClient from "../prisma";

interface CreateCustomerProps {
  name: string;
  email?: string;
  cpf: string;
  phone?: string;
  pixKey?: string;
  ticket: string[];
}

class CreateCustomerService {
  async execute({name, cpf, ticket, email, phone, pixKey}: CreateCustomerProps){

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
    if(ticket.length != 6){
      throw new Error("Ticket must have 6 numbers");
    }
    for(let i = 0; i < ticket.length; i++){
      const ticketNumber = parseInt(ticket[i]);
      if(isNaN(ticketNumber) || ticketNumber < 1 || ticketNumber > 60){
        throw new Error("Ticket must be a number between 1 and 60");
      }
    }
      throw new Error("Ticket must be a number between 1 and 60");
      
    const customer = await prismaClient.customer.create({
      data: {
        name,
        cpf,
        ticket,
        email,
        phone,
        pixKey,
        status: true //active by default
      }
    })

    return customer

      }
    }








export { CreateCustomerService };
