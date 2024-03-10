import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

export type SecretInputProps = {
  label: string
  value: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Secret input component
 * */
export const SecretInput = (props: SecretInputProps) => {

  const [showPassword, setShowPassword] = useState(false)
  return(
    <div className="relative">
      <input 
        id={`input_${props.label}`}
        type={showPassword ? 'text' : 'password'} 
        value={props.value}
        onChange={props.onChange}
        placeholder={props.label}
        className="w-full h-12 bg-noli-neutral border border-noli-border
        rounded-md p-4 placeholder:text-noli-neutral-text focus:outline-none
        focus:ring-2 focus:ring-noli-primary"
      >
      </input>
      <button
        onClick={() => setShowPassword(!showPassword)} type={'button'} 
        className="absolute right-0 top-0 w-16 h-full border-l 
        border-noli-border flex items-center justify-center">
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  )
}
