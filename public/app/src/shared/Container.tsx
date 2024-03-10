export const Container = (props: React.PropsWithChildren<{}>) => {
  return (
    <div className="grid grid-cols-4 gap-4 px-8 py-4 ">
      {props.children}
    </div>
  )
}
