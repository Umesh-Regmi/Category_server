import bcrypt from "bcryptjs"

// to hash password
export const hash_password = async(password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const comparePassword = async(password, hash) => {
    return await bcrypt.compare(password, hash)
}