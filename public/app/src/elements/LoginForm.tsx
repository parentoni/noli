import { useState } from "react"
import { TextInput } from "../shared/elements/TextInput"
import { SecretInput } from "../shared/elements/SecretInput"
import { useNavigate } from "react-router-dom"
/**
 * Class responsible for logging in users
 * */
export const LoginForm = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  return (
    <form className="gap-4 flex flex-col">
      <h1 className="text-2xl font-semibold">Entre em sua conta</h1>
      <TextInput value={email} label="Email"  onChange={e => setEmail(e.target.value)}/>  
      <SecretInput value={password} label="Senha" onChange={e => setPassword(e.target.value)}/>
      <button className="w-full h-12 border border-noli-primary-text bg-noli-primary rounded-md">Entrar</button>
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
