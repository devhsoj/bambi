const config = {
    crypto: {
        bcryptRounds: process.env.BCRYPT_ROUNDS ? parseInt(process.env.BCRYPT_ROUNDS) : 14,
        pbkdf2: {
            userKeyIterations: process.env.PBKDF2_USER_KEY_ITERATIONS ? parseInt(process.env.PBKDF2_USER_KEY_ITERATIONS) : 250_000,
        }
    }
};

export default config;