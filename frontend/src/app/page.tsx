
'use client'

import { FormEvent, useEffect, useRef, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
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


export default function Home() {

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
    loadCustomers()
  }, [])

  async function loadCustomers() {
   const response = await api.get('/customers')
   setCustomers(response.data)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const name = nameRef.current?.value

    // if(!name || others....) return
    if(!name) return

    const response = await api.post('/customers', {
      name: nameRef.current?.value
    })

    setCustomers(allCustomers => [...allCustomers, response.data])

    if (nameRef.current) nameRef.current.value = "" // clear input
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

         <input type="submit" value="Register" className="w-full p-2 font-medium bg-green-500 rounded cursor-point" />
      </form>

      <section className="flex flex-col gap-4">

        {customers.map(customer => (
          <article key={customer.id} className="relative w-full p-2 duration-200 bg-white rounded hover:scale-105">
          <p><span className="font-medium">Nome: </span> {customer.name}</p>
          <p><span className="font-medium">Status: </span> {customer.status ? "ATIVO" : "INATIVO"}</p>

          <button
          className='absolute right-0.5 flex items-center justify-center bg-red-500 rounded top-0.5 w-7 h-7'
          onClick={() => handleDelete(customer.id)}
          >
            <FiTrash size={18} color="white" />
          </button>
        </article>
        ))}

      </section>
      </main>
    </div>
  )
}
