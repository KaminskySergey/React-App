import { ReactNode } from "react"

interface ITodoList {
    children: ReactNode
}

export default function TodoList({children}: ITodoList) {
    return <ul className="flex flex-col gap-4">{children}</ul>
}
