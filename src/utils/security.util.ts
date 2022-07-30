const crypto = require('crypto');

export default class SecurityUtil {
  public static toSha1 = (data: string) => {
    return crypto.createHash('sha1').update(data).digest('hex');
  };

  public static decodeFromBase64 = (base64String: string): string => {
    return Buffer.from(base64String, 'base64').toString('ascii');
  };

  public static toBase64 = (string: string): string => {
    return Buffer.from(string).toString('base64');
  };

  public static aesEncypt = (
    aesKey: string,
    aesIv: string,
    data: any,
  ): string => {
    const encryption_encoding = 'base64';
    const buffer_encryption = 'utf-8';
    const iv = Buffer.from(aesIv);
    const cipher = crypto.createCipheriv(getAlgorithm(aesKey), aesKey, iv);
    let encrypted = cipher.update(data, buffer_encryption, encryption_encoding);
    encrypted += cipher.final(encryption_encoding);
    return encrypted;
  };

  public static aesDecrypt(
    aesKey: string,
    aesIv: string,
    base64String: string,
  ): any {
    const decipher = crypto.createDecipheriv(
      getAlgorithm(aesKey),
      aesKey,
      aesIv,
    );
    let decrypted = decipher.update(base64String, 'base64');
    decrypted += decipher.final();
    return decrypted;
  }

  public static toSha256 = (data: string) => {
    return crypto.createHash('sha256').update(data).digest('hex');
  };

  /**
   * All requests from Paystack contain a cryptographic hash in their headers. This method creates an identical copy of that hash for comparison sake.
   * This way, we can ensure that all requests hitting our webhook are from Paystack's end and not a malicious actor.
   * @params The request body after it has been stringified
   * @returns A cryptographic hash
   */
  public static createPaystackHash = async (data: string): Promise<string> => {
    const sha_512_hasher = crypto.createHmac(
      'sha512',
      process.env.PAYSTACK_SECRET_KEY,
    );
    return sha_512_hasher.update(data).digest('hex');
  };
}

function getAlgorithm(key) {
  switch (key.length) {
    case 16:
      return 'aes-128-cbc';
    case 32:
      return 'aes-256-cbc';
  }

  throw new Error('Invalid key length: ' + key.length);
}
