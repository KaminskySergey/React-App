export interface ITask {
id: string,
createdAt: string,
updatedAt: string,
priority: Priority,
category: string,
name: string,
description: string,
date: string,
}

export interface ITaskValues {
    priority: string,
    category: string,
    name: string,
    description: string,
    date: string,
}

export interface ITaskValuesUpdate {
    id: string
    priority: string,
    category: string,
    name: string,
    description: string,
    date: string,
}

export enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}