import jwt from "jsonwebtoken";

export const AUTH_COOKIE_NAME = "kino_auth_token";

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if(!secret){
        throw new Error("JWT_SECRET is not defined in .env.local");
    }
    return secret;
}

export function createAuthToken(user) {
    return jwt.sign(
        {
            userId: user._id.toString(),
            username: user.username,
        },
        getJwtSecret(),
        {expiresIn: "7d"}
    );
}

export function verifyAuthToken(token) {
    try{
        return jwt.verify(token, getJwtSecret());
    }catch{
        return null;
    }
}