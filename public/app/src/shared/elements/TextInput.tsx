
export type TextInputProps = {
  label: string
  value: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void

}

/**
 * Text input component
 * */
export const TextInput = (props: TextInputProps) => {
  return(
    <input 
      id={`input_${props.label}`}
      type='text' 
      value={props.value}
      onChange={props.onChange}
      placeholder={props.label}
      className="w-full h-12 bg-noli-neutral border border-noli-border
      rounded-md p-4 placeholder:text-noli-neutral-text focus:outline-none focus:ring-2
      focus:ring-noli-primary"
    >
    </input>
  )
}
