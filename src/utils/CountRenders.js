import { useRef } from "react"

export const CountRenders = (prop = ' ') => {
    const count = useRef(0)
    count.current = count.current + 1
    console.log(` ${prop} number of renders: ${count.current}`)
}