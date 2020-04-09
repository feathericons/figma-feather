import { jsx } from '@emotion/core'
import { useState, useEffect, useCallback, useContext } from 'react'
import debounce from '../lib/debounce'
import { ParamsState } from './types'
import { PARAMS } from './constants'
import React from 'react'

interface HookReturn {
    params: ParamsState,
    update: (payload: ParamsState) => void,
}

const useParams = (): HookReturn => {
    const [state, setState] = useState<ParamsState>(Object.fromEntries(Object.entries(PARAMS).map(param => [param[0], param[1].default])))

    useEffect(() => {
        new Promise<ParamsState>(resolve => {
            window.onmessage = ((event: { data: { pluginMessage: ParamsState } }) => resolve(event.data.pluginMessage))
            parent.postMessage({
                pluginMessage: {
                    type: 'STATE_REQUEST',
                }
            }, '*')
        }).then(savedState => savedState && setState(last => ({ ...last, ...savedState })))
    }, [])

    const save = useCallback(debounce((stateToSave: ParamsState) => parent.postMessage({
        pluginMessage: {
            type: 'STATE_SAVE',
            payload: stateToSave
        }
    }, '*'), 500), [])

    return {
        params: state,
        update: (payload: ParamsState) => {
            setState(last => {
                const newValue = ({ ...last, ...payload })
                save(newValue)
                return newValue
            })
        }
    }
}

let ParamsContext = React.createContext<HookReturn | null>(null)

function Provider({ children }: { children: any }) {
    let params = useParams()
    return (
        <ParamsContext.Provider value={params}>
            {children}
        </ParamsContext.Provider>
    )
}

const Params = {
    Provider: Provider,
    useContainer: () => useContext(ParamsContext)!
}

export default Params