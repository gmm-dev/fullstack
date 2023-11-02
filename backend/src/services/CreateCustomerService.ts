//Serviço responsavel pela criação de um novo cliente

class CreateCustomerService {
  async execute(){
    console.log("rota test criada")
    return {ok: true}
  }
}

export { CreateCustomerService }


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
