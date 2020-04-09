import { ParamNumber, ParamToggleValue } from './types'

export const PARAMS: { [key: string]: ParamNumber | ParamToggleValue } = {
    stroke: {
        displayName: 'Stroke',
        default: 2,
        minValue: 0.5,
        maxValue: 3,
        step: 0.5,
    },
    lockChildren: {
        displayName: 'Lock Node children',
        default: true
    }
}