export interface ParamBase<T> {
    displayName: string
    default: T
}

export interface ParamNumber extends ParamBase<number> {
    minValue: number
    maxValue: number
    step: number
}

export interface ParamToggleValue extends ParamBase<boolean> {}

export type ParamsState = {
    [key: string]: number | boolean
}
