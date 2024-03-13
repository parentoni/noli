import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../shared/contexts/AuthContext"

export const Redirect = () => {

  const navigate = useNavigate()
  const {user} = useAuth()

  useEffect(() => {

    if (user === undefined) {
      navigate('/auth/login')
    }

    switch (user?.role) {
      case 0: // normal user
        navigate('/') //check later
        break
      case 1: //user partner
        navigate('/') //check later
        break
      default:
        navigate('/')
    }
  }, [user])
  return null
}
