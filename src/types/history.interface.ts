export interface IHistory {
    id: string,
    idTodo: string,
    dateHistory: string,
    updatedAt?: string | undefined,
    type: string,
    oldValue: null | IValueTodo | IValueList | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newValue: IValueTodo | IValueList | any
}


export interface IValueTodo {
    category: string,
    date: string,
    name: string,
    priority: string
    status?: string | undefined
}

export interface IValueList {
    createdAt: string,
    id: string,
    name: string,
    date: string,
    updatedAt: string
    category?: string | undefined
    priority?: string | undefined
    status?: string | undefined
}
