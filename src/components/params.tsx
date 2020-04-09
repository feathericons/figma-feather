import { jsx } from '@emotion/core'
import theme from '../theme'
import React, { useEffect, useCallback } from 'react'
import Params from '../state/params'
import debounce from '../lib/debounce'
import { PARAMS } from '../state/constants'
import { ParamToggleValue, ParamNumber } from '../state/types'
import usePostEffect from '../lib/usePostEffect'

interface ParamsProps {
    show: boolean
}

const PARAM_CONTROL_HEIGHT = 24
const PARAMS_COUNT = Object.keys(PARAMS).length
const CONTAINER_HEIGHT = PARAM_CONTROL_HEIGHT * PARAMS_COUNT + 6 * (PARAMS_COUNT - 1) + theme.space[2] * 2 + 1

function ParamsList({ show }: ParamsProps) {
    const container = Params.useContainer()
    const update = useCallback(debounce((key: string, value: number | boolean) => container.update({ [key]: value }), 200), [])
    return <div css={{
        position: 'sticky',
        top: 41,
        background: 'white',
        height: show ? CONTAINER_HEIGHT : 0,
        transition: '300ms height linear',
        overflow: 'hidden',
    }}>
        <div css={{
            padding: theme.space[2],
            transform: `translateY(${show ? 0 : `${-CONTAINER_HEIGHT}px`})`,
            transition: '300ms transform linear',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            '> *:not(:last-child)': {
                paddingBottom: 6
            }
        }}>
            {Object.entries(PARAMS).map(param => {
                if (typeof param[1].default == 'boolean') {
                    return <ParamToggle key={param[0]} param={param[1] as ParamToggleValue} initialValue={container.params[param[0]] as boolean} onChange={value => update(param[0], value)} />
                } else if (typeof param[1].default == 'number') {
                    return <ParamSlider key={param[0]} param={param[1] as ParamNumber} initialValue={container.params[param[0]] as number} onChange={value => update(param[0], value)} />
                }
            })}
        </div>
    </div>
}

function ParamSlider({ param, initialValue, onChange }: { param: ParamNumber, initialValue?: number, onChange: (newValue: number) => void }) {
    const [state, setState] = React.useState(initialValue == null ? param.default : initialValue)

    useEffect(() => { initialValue != null && state != initialValue && setState(initialValue) }, [initialValue])
    usePostEffect(() => { state != initialValue && onChange(state) }, [state])

    return <div css={{ height: PARAM_CONTROL_HEIGHT, fontSize: theme.fontSizes[0], display: 'flex', alignItems: 'center' }}>
        {param.displayName}
        <input css={{
            flex: 1,
            margin: `0 ${theme.space[4]}px`
        }} type="range" min={param.minValue} max={param.maxValue} step={param.step} value={state} onChange={e => setState(e.currentTarget.valueAsNumber)} />
        <p css={{ width: 16 }}>{state}</p>
    </div>
}

function ParamToggle({ param, initialValue, onChange }: { param: ParamToggleValue, initialValue?: boolean, onChange: (newValue: boolean) => void }) {
    const [state, setState] = React.useState(initialValue == null ? param.default : initialValue)

    useEffect(() => { initialValue != null && state != initialValue && setState(initialValue) }, [initialValue])
    usePostEffect(() => { state != initialValue && onChange(state) }, [state])

    return <div css={{ height: PARAM_CONTROL_HEIGHT, fontSize: theme.fontSizes[0], display: 'flex', alignItems: 'center' }}>
        {param.displayName}
        <input css={{
            margin: `0 ${theme.space[4]}px`
        }} type="checkbox" checked={state} onChange={e => setState(e.currentTarget.checked)} />
    </div>
}

export default ParamsList