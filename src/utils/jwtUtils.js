import jwt from 'jsonwebtoken'
import CustomError from '../../middlewares/userHandler_middleware.js'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

export const generateWebToken = (payload) => {
const token  = jwt.sign(payload,JWT_SECRET, {expiresIn:JWT_EXPIRES_IN })
return token
}

export const decode_token = (token) => {
    try {
        const data = jwt.verify(token, JWT_SECRET)
        return data
    } catch (error) {
        throw new CustomError('Invalid token', 400)
    }
}