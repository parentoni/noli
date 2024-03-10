import { LoginForm } from "../../elements/LoginForm"
import { Container } from "../../shared/Container"
import { Logo } from "../../shared/elements/Logo"

export const Login = () => {
  return(
    <Container>
      <div className="col-span-full grid grid-cols-4 gap-4">
        <Logo className="col-span-2 col-start-2 w-full h-16 "/>
      </div>
      <div className="mt-8 col-span-full">
        <LoginForm />       
      </div>
    </Container>
  )
}
