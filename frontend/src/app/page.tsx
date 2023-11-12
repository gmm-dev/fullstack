
'use client'

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
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
  ticket: string[];
  status: boolean;
}

interface CustomerNumber {
  [index: number]: string;
}

type Winner = {
  id: string;
  // include other properties here if needed
};


export default function Home() {

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const [customerNumbers, setCustomerNumbers] = useState(Array(6).fill(''));
  const [chosenNumbers, setChosenNumbers] = useState(Array(6).fill(''));
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

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newCustomerNumbers = [...customerNumbers];
    newCustomerNumbers[index] = event.target.value;
    setCustomerNumbers(newCustomerNumbers);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newChosenNumbers = [...chosenNumbers];
    newChosenNumbers[index] = event.target.value;
    setChosenNumbers(newChosenNumbers);
  };

  async function handleWinners() {
    const numbers = chosenNumbers.map((num) => parseInt(num, 10));
    const response = await api.post('/customers/winners', { customerNumbers: numbers });
    setWinners(response.data);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    console.log("🚀 ~ file: page.tsx:53 ~ handleSubmit ~ e:", e)
    const name = nameRef.current?.value
    const cpf = cpfRef.current?.value
    const ticket = customerNumbers;
    // const email = emailRef.current?.value
    // const phone = phoneRef.current?.value
    // const pixKey = pixKeyRef.current?.value

    if(!name || !cpf || !ticket) return alert("Preencha todos os campos obrigatórios: Nome, CPF e Cartela!")

    if(!cpf.match(/^[0-9]+$/)) return alert("O campo CPF só aceita números!")
    if(cpf.length < 11) return alert("O campo CPF deve ter no mínimo 11 números!")

    // if(!ticket.match(/^[0-9]+$/)) return alert("O campo Cartela só aceita números!")
    if(ticket.length < 6) return alert("O campo Cartela deve ter 6 números separados por virgulas!")

    console.log(e)

    const apiResponse = await api.post('/customer', {
      name: nameRef.current?.value,
      cpf: cpfRef.current?.value,
      ticket: customerNumbers,
      status: true,
      email: emailRef.current?.value,
      phone: phoneRef.current?.value,
      pixKey: pixKeyRef.current?.value
    })
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
          value={number}
          onChange={event => handleChange(index, event)}
        />
      ))}


        {/* <input type="text"
        placeholder="Digite os 6 números escolhidos separados por virgula." className="w-full p-2 mb-5 rounded"
        ref={ticketRef}
        /> */}

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
        //   <InputMask
        //   key={index}
        //   mask="99"
        //   value={number}
        //   onChange={(event) => handleInputChange(index, event)}
        //   render={(inputProps: any) => <input {...inputProps} type="text" />}
        // />
        <InputMask
        key={index}
        mask="99"
        value={number}
        onChange={event => handleInputChange(index, event)}
       />
        ))}

        <button onClick={handleWinners}>Check Winners</button>
        <ul>
          {winners.map((winner, index) => (
            <li key={index}>{winner.id}</li>
          ))}
        </ul>
        </div>
      </section>
      </main>
    </div>
  )
}
