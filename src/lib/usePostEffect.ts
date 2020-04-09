import { useEffect, EffectCallback, DependencyList, useReducer, useRef } from 'react'

export default function usePostEffect(cb: EffectCallback, deps?: DependencyList) {
    const inited = useRef(false)
    useEffect(() => {
        if (!inited.current) {
            inited.current = true
            return
        }
        cb()
    }, deps)
}