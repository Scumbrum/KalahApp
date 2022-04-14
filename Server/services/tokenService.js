import JWT from "jsonwebtoken"
import { getUser, updateUser, getUserByField } from "../model/users.js"
export function getTokens(payload) {
    const accessToken = JWT.sign(payload, process.env.JWT_ACCESS, {expiresIn: "1h"})
    const refreshToken = JWT.sign(payload, process.env.JWT_REFRESH, {expiresIn: "30d"})
    return {
        accessToken,
        refreshToken
    }
}

export function setRefreshToken(userId, key) {
    const data = getUser(userId)
    data.refreshToken = key
    updateUser(userId, data)
}

export function removeToken(refreshToken) {
    const id = getUserByField(refreshToken, "refreshToken")
    const data = getUser(id)
    delete data.refreshToken
    updateUser(id, data)
    return id
}
export function validate(accessToken, refreshToken, validator) {
    try {
        let data1
        let data2
        if(validator == 1) {
            data1 = JWT.verify(accessToken, process.env.JWT_ACCESS)
            return data1
        } else if(validator == 2) {
            data2 = JWT.verify(refreshToken, process.env.JWT_REFRESH)
            return data2
        } else {
            data1 = JWT.verify(accessToken, process.env.JWT_ACCESS)
            data2 = JWT.verify(refreshToken, process.env.JWT_REFRESH)
            return {
                access: data1,
                refresh: data2
            }
        }
    } catch(e) {
        return null
    }
}