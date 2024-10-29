const config = {
    port: process.env.PORT || 3001,
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'mydatabase'
    },
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key'
};

module.exports = config;