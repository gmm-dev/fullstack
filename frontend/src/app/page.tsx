
'use client'

import { FormEvent, useEffect, useRef, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import { api } from '../services/api';

interface CustomerProps {
  id: string;
  name: string;
  email?: string;
  cpf: string;
  phone?: number;
  pixKey?: string;
  ticket: number[];
  status: boolean;
}

interface CustomerNumber {
  [index: number]: string;
}

type Winner = {
  id: string;
  name: string;
  ticket: number[];
  // include other properties here if needed
};


export default function Home() {

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const [customerNumbers, setCustomerNumbers] = useState(Array(6).fill(""));
  const [chosenNumbers, setChosenNumbers] = useState(Array(6).fill(""));
  const [winners, setWinners] = useState<Winner[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null)
  const cpfRef = useRef<HTMLInputElement | null>(null)
  // const ticketRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)
  const pixKeyRef = useRef<HTMLInputElement | null>(null)


    useEffect(() => {
    loadCustomers()
  }, [])

  async function loadCustomers() {
   const response = await api.get('/customers')
   setCustomers(response.data)
  }

  function handleCustomerNumbersInput(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const newNumber = Number(event.target.value);

    // Validate that the number is between 1 and 60
    if (newNumber < 1 || newNumber > 60) {
      alert('Number must be between 1 and 60');
      return;
    }

    const newCustomerNumbers = [...customerNumbers];
    newCustomerNumbers[index] = newNumber;
    setCustomerNumbers(newCustomerNumbers);
  }


  function handleChosenNumbersInput(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const newNumber = Number(event.target.value);

    // Validate that the number is between 1 and 60
    // if (newNumber < 1 || newNumber > 60) {
    //   alert('Number must be between 1 and 60');
    //   return;
    // }

    const newChosenNumbers = [...chosenNumbers];
    newChosenNumbers[index] = newNumber; // store as a number, not a string
    setChosenNumbers(newChosenNumbers);
  }

  async function handleWinners() {
    console.log("handleeeeewinnersss")
    if (!chosenNumbers.every(num => num >= 1 && num <= 60)) {
      alert('All numbers must be between 1 and 60');
      return;
    }
    const response = await api.post('customers/winners', { chosenNumbers: chosenNumbers });
    setWinners(response.data as Winner[]);
    console.log("🚀 ~ file: page.tsx:82 ~ handleWinners ~ response.data:", response.data)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Convert customerNumbers to integers
    const customerTicketNumbers = customerNumbers.map(Number);

    console.log("🚀 ~ file: page.tsx:53 ~ handleSubmit ~ e:", e)
    const name = nameRef.current?.value
    const cpf = cpfRef.current?.value
    const ticket = customerTicketNumbers;
    const email = emailRef.current?.value
    const phone = phoneRef.current?.value
    const pixKey = pixKeyRef.current?.value

    if(!name || !cpf || !ticket) return alert("Preencha todos os campos obrigatórios: Nome, CPF e Cartela!")

    if(!cpf.match(/^[0-9]+$/)) return alert("O campo CPF só aceita números!")
    if(cpf.length < 11) return alert("O campo CPF deve ter no mínimo 11 números!")

    // if(!ticket.match(/^[0-9]+$/)) return alert("O campo Cartela só aceita números!")
    if(ticket.length < 6) return alert("O campo Cartela deve ter 6 números separados por virgulas!")

    const data = {
      name: name,
      cpf: cpf,
      ticket: ticket,
      email: email,
      phone: phone,
      pixKey: pixKey,
      status: true,
    };

    const apiResponse = await api.post('/customer', data);

    if (apiResponse.status === 200) {
      alert('Customer created successfully');
    } else {
      alert('Error creating customer');
    }


    // const apiResponse = await api.post('/customer', {
    //   name: nameRef.current?.value,
    //   cpf: cpfRef.current?.value,
    //   ticket: customerNumbers,
    //   status: true,
    //   email: emailRef.current?.value,
    //   phone: phoneRef.current?.value,
    //   pixKey: pixKeyRef.current?.value
    // })
    setCustomers(allCustomers => [...allCustomers, apiResponse.data])


    // clear input
    if (nameRef.current) nameRef.current.value = "";
    if (cpfRef.current) cpfRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (phoneRef.current) phoneRef.current.value = "";
    if (pixKeyRef.current) pixKeyRef.current.value = "";
    if(setCustomerNumbers) setCustomerNumbers(Array(6).fill(''));
  }


  async function handleDelete(id: string) {
    try {
      await api.delete("/customer", {params: { id: id, }})
      const allCustomers = customers.filter(customer => customer.id !== id)
      setCustomers(allCustomers)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center w-full min-h-screen px-4 bg-gray-900">
      <main className="w-full my-10 md:max-w-2xl">
      <h1 className="text-4xl font-medium text-white">Customers</h1>

      <form className="flex flex-col my-6" onSubmit={handleSubmit}>
        <label className="font-medium text-white">Nome:</label>
        <input type="text"
        placeholder="Digite seu nome completo."
        className="w-full p-2 mb-5 rounded"
        ref={nameRef}
         />
        <label className="font-medium text-white">CPF:</label>
        <input type="text"
        placeholder="Digite seu CPF."
        className="w-full p-2 mb-5 rounded"
        ref={cpfRef}
         />
        <label className="font-medium text-white">Email:</label>
        <input type="email"
        placeholder="Digite seu email."
        className="w-full p-2 mb-5 rounded"
        ref={emailRef}
        />
        <label className="font-medium text-white">Telefone:</label>
        <input type="text"
        placeholder="Digite seu telefone."
        className="w-full p-2 mb-5 rounded"
        ref={phoneRef}
        />
        <label className="font-medium text-white">Chave PIX:</label>
        <input type="text"
        placeholder="Digite sua chave PIX."
        className="w-full p-2 mb-5 rounded"
        ref={pixKeyRef}
        />
        <label className="font-medium text-white">Cartela:</label>
        {customerNumbers.map((number, index) => (
        <InputMask
          key={index}
          mask="99"
          maskChar=""
          alwaysShowMask={false}
          value={number}
          onChange={(event) => handleCustomerNumbersInput(index, event)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
        />
      ))}

         <input type="submit" value="Cadastrar" className="w-full p-2 font-medium bg-green-500 rounded cursor-point" />
      </form>

      <section className="flex flex-col gap-4">

        {customers.map(customer => (
          <article key={customer.id} className="relative w-full p-2 duration-200 bg-white rounded hover:scale-105">
          <p><span className="font-medium">Nome: </span> {customer.name}</p>
          <p><span className="font-medium">CPF: </span> {customer.cpf}</p>
          <p><span className="font-medium">Email: </span> {customer?.email}</p>
          <p><span className="font-medium">Telefone: </span> {customer?.phone}</p>
          <p><span className="font-medium">Chave PIX: </span> {customer?.pixKey}</p>
          <p><span className="font-medium">Ticket: </span> {customer.ticket.join(', ')}</p>
          <p><span className="font-medium">Status: </span> {customer.status ? "ATIVO" : "INATIVO"}</p>

          <button
          className='absolute right-0.5 flex items-center justify-center bg-red-500 rounded top-0.5 w-7 h-7'
          onClick={() => handleDelete(customer.id)}
          >
            <FiTrash size={18} color="white" />
          </button>
        </article>
        ))}
        <div>
        {chosenNumbers.map((number, index) => (
        <InputMask
        key={index}
        mask="99"
        maskChar=""
        alwaysShowMask={false}
        value={number}
        onChange={event => handleChosenNumbersInput(index, event)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
       />
        ))}

        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded"
        onClick={handleWinners}
        >Check Winners</button>
        <ul className='list-disc list-inside space-y-2 w-full p-2 duration-200 bg-white rounded hover:scale-105'>
          {winners.map((winner, index) => (
            <li key={index}>Name: {winner.name}, Ticket: {winner.ticket && winner.ticket.join(', ')}</li>

          ))}
        </ul>
        </div>
      </section>
      </main>
    </div>
  )
}
