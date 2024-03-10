const Image = require("../../assets/logo.png")

export type LogoProps = {
  className?: string
}
/**
 * Noli logo element
 */
export const Logo = (props: LogoProps) => {
  return(
    <img alt="Noli logo" className={`${props.className}`} src={Image}/>
  )
}
