import { isHexadecimal } from 'validator';

export const isPublicKeyValid = (publicKey: string) =>
  publicKey.length === 64 && isHexadecimal(publicKey);
