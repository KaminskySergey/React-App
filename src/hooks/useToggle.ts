import { useState } from 'react'

export const useToggle = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(pS => !pS)
    }

    return {
        isOpen,
        setIsOpen,
        handleToggle
    }
}