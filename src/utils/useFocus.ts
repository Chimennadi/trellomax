import { useRef, useEffect } from "react"

function useFocus() {
    //Initial value is set to null
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        ref.current?.focus()  //optional chaining operation (?.)
    }, [])

    return ref
}

export default useFocus