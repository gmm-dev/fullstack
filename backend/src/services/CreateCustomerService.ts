//Serviço responsavel pela criação de um novo cliente

import prismaClient from "../prisma";

interface CreateCustomerProps {
  name: string;
  email: string;
}

class CreateCustomerService {
  async execute({name, email}: CreateCustomerProps){

    console.log("createCustomerService activated")

    // if(!name || !email){
    //   throw new Error("Name or email incorrect");
    // }

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true //active by default
      },
    })

    return customer
  }
}

export { CreateCustomerService };


// class CreateCustomerService {
//   async execute(name: string, email: string) {
//     const customerAlreadyExists = await prismaClient.customer.findFirst({
//       where: {
//         email,
//       },
//     });

//     if (customerAlreadyExists) {
//       throw new Error("Customer already exists!");
//     }

//     const customer = await prismaClient.customer.create({
//       data: {
//         name,
//         email,
//       },
//     });

//     return customer;
//   }
// }
