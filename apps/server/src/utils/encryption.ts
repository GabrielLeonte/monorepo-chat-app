import { createCipheriv, createDecipheriv } from 'crypto';

const { ENCRYPT_KEY, ENCRYPT_IV } = process.env;

const key = Buffer.from(ENCRYPT_KEY, 'hex');
const iv = Buffer.from(ENCRYPT_IV, 'hex');

export const encryptSymetrical = (text: string) => {
  const cipher = createCipheriv('aes256', key, iv);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
};

export const decryptSymetrical = (text: string) => {
  const decipher = createDecipheriv('aes256', key, iv);
  return decipher.update(text, 'hex', 'utf-8') + decipher.final('utf8');
};
