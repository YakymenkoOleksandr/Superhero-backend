import path from 'path';
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: "guest",
};

