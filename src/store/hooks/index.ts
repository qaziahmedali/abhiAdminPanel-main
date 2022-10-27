import { createTypedHooks } from 'easy-peasy'
import { IStoreModel } from '../../types/store-types'

const typedHooks = createTypedHooks<IStoreModel>()

export const useEasyActions = typedHooks.useStoreActions
export const useEasyDispatch = typedHooks.useStoreDispatch
export const useEasyState = typedHooks.useStoreState
