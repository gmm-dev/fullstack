
import { FiTrash } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="flex justify-center w-full min-h-screen px-4 bg-gray-900">
      <main className="w-full my-10 md:max-w-2xl">
      <h1 className="text-4xl font-medium text-white">Customers</h1>

      <form className="flex flex-col my-6">
        <label className="font-medium text-white">Nome:</label>
        <input type="text"
        placeholder="Digite seu nome completo."
        className="w-full p-2 mb-5 rounded"
         />

         <input type="submit" value="Register" className="w-full p-2 font-medium bg-green-500 rounded cursor-point" />
      </form>

      <section className="flex flex-col">
        <article className="relative w-full p-2 duration-200 bg-white rounded -top-2 hover:scale-105">
          <p><span className="font-medium">Nome: </span> Silvio Santos</p>
          <p><span className="font-medium">Status: </span> ATIVO</p>

          <button
          className='absolute right-0 flex items-center justify-center bg-red-500 rounded-lg w-7 h-7 -top-2'
          >
            <FiTrash size={18} color="white" />
          </button>
        </article>
      </section>
      </main>
    </div>
  )
}
