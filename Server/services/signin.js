import { getDTO, getUser, createUser, getUserByField, updateUser} from "../model/users.js"
import { getTokens, setRefreshToken, removeToken, validate } from "./tokenService.js"

export function registration(name, password) {
    const id = createUser(name, password)
    let data = getUser(id)
    data = getDTO(data)
    const tokens = getTokens(data)
    setRefreshToken(id, tokens.refreshToken)
    return {...tokens, user:data, id}    
}
export function login(name, password) {
    const id = getUserByField(name, "name")
    if(!id) {
        throw new Error("Non exists name")
    }
    let data = getUser(id)
    if(data.password != password) {
        throw new Error("Non valid password")
    }
    data = getDTO(data)
    const tokens = getTokens(data)
    setRefreshToken(id, tokens.refreshToken)
    return {...tokens, user:data, id}
}

export function logout(refreshToken) {
    return removeToken(refreshToken)
}

export function refresh(refreshToken) {
    const data = validate("", refreshToken, 2)
    const id = getUserByField(refreshToken, "refreshToken")
    if(!data || !id) {
        throw new Error("Non authorised")
    }
    const user = getDTO(getUser(id))
    const tokens = getTokens(user)
    setRefreshToken(id, tokens.refreshToken)
    return {...tokens, user, id}
}

export function getRate(accessToken, refreshToken) {
    const data = validate(accessToken, "", 1)
    const id = getUserByField(refreshToken, "refreshToken")
    if(!data) {
        throw new Error("Non authorised")
    }
    const user = getDTO(getUser(id))
    
    return {user,id}
}   

export function updateRate(rate, id, accessToken) {

    const data = validate(accessToken, "", 1)
    if(!data) {
        throw new Error("No authorised")
    }
    const user = getUser(id)
    user.achievements = rate.achievements
    user.requirements = rate.requirements
    user.progress = rate.progress
    updateUser(id, user)
}