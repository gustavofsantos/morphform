import { ReactNode } from "react"

interface Props {
  children: ReactNode
  value: boolean
}

export function When(props: Props) {
  if (!props.value) return null

  return typeof props.children === "function" ? props.children() : props.children
}
