export const mongodbConfig = {
    url: process.env.DB_URI,
    dbname: process.env.DB_NAME

}

    export const cloudinary_config = {
       api_key: process.env.CLOUDINARY_API_KEY,
        secret: process.env.CLOUDINARY_SECRET,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME
    }

    export const email_config = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD,
        from: process.env.SMTP_USER 
    }
