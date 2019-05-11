import validator from 'validator';

export const isPublicKeyValid = (publicKey: string) =>
  publicKey.length === 64 && validator.isHexadecimal(publicKey);
