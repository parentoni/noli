import { useState } from "react"
import { TextInput } from "../shared/elements/TextInput"
import { SecretInput } from "../shared/elements/SecretInput"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../shared/contexts/AuthContext"
/**
 * Class responsible for logging in users
 * */
export const LoginForm = () => {
 
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState<boolean>(false)

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await login(email, password)
    if (response.isLeft()) {
      setError(true)
      return
    }

    setError(false)
    navigate('/auth/redirect')
  }

  return (
    <form className="gap-4 flex flex-col" onSubmit={formSubmit}>
      <h1 className="text-2xl font-semibold">Entre em sua conta</h1>
      <TextInput value={email} label="Email"  onChange={e => setEmail(e.target.value)}/>  
      <SecretInput value={password} label="Senha" onChange={e => setPassword(e.target.value)}/>
      <button className="w-full h-12 border border-noli-primary-text bg-noli-primary rounded-md">Entrar</button>
      {error && <p className="text-red-500">Credenciais inválidas</p>}
      <span> Ainda não tem uma conta? &nbsp;
        <button 
          aria-label="página de registro" 
          onClick={() => navigate('/auth/register')} 
          className="text-noli-primary-text underline" >
          Crie uma
        </button>.
      </span>
    </form>
  )
}
