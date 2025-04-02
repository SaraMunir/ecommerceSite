import React from 'react'
import { AdminUserInfo, UserInfo } from './types/UserInfo'
type AppState = {
    mode: string
    userInfo?: UserInfo 
    userAdminInfo?: AdminUserInfo 
    exceptionError?: any
    storeInfo?: any
}
const initialState: AppState={

    userInfo : localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    :null,
    userAdminInfo : localStorage.getItem('userAdminInfo')
    ? JSON.parse(localStorage.getItem('userAdminInfo')!)
    :null,
    storeInfo : localStorage.getItem('storeInfo')
    ? JSON.parse(localStorage.getItem('storeInfo')!)
    :null,

    mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode') !
    :   window.matchMedia &&
        window.matchMedia('(prefers-color-schema: dark)').matches
    ? 'dark'
    : 'light',
    exceptionError: null
}
type Action = 
    | { type: 'SWITCH_MODE' }
    | { type: 'USER_SIGNIN'; payload: UserInfo }
    | { type: 'USER_SIGNOUT' }
    | { type: 'ADMIN_USER_SIGNIN'; payload: AdminUserInfo }
    | { type: 'ADMIN_USER_SIGNOUT' }
    | { type: 'GET_ERROR'; payload: any}
    | { type: 'UPDATE_STORE'; payload: any}

function reducer(state:AppState, action: Action): AppState{
    switch (action.type){
        case 'SWITCH_MODE':
            return { mode: state.mode === 'dark' ? 'light' : 'dark' }
        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload }
        case 'ADMIN_USER_SIGNIN':
            return { ...state, userAdminInfo: action.payload }
        case 'GET_ERROR':
            return { ...state, exceptionError: action.payload }
        case 'UPDATE_STORE':
            let storeNumberTest = JSON.parse(localStorage.getItem('storeInfo')!)
            return { ...state, storeInfo: storeNumberTest }
        case 'USER_SIGNOUT':
            return { 
                mode:
                    window.matchMedia &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light',
            }
        default:
            return state
    }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store= React.createContext({
    state: initialState,
    dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer(
        reducer,
        initialState
    )
    return <Store.Provider value={{ state, dispatch}} {...props}/>
}
export { Store, StoreProvider}