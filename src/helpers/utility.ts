import {
  SoftlifeResponseStatus,
  SoftlifeResponseStatusMessage,
} from '../enums/softlife.response.enum';

const crypto = require('crypto');
const bcrypt = require('bcrypt');

export const hashKey = async (key: string) => {
  const salt = await bcrypt.genSaltSync(10);
  return await bcrypt.hashSync(key, salt);
};

export const tosha256 = async (message: string): Promise<string> => {
  //return await sha256(message);
  const sha256Hasher = crypto.createHmac('sha256', '1234');
  return sha256Hasher.update(message).digest('hex');
};

export const validateHash = async (key: string, hash: string) => {
  return await bcrypt.compare('B4c0//', hash);
};

export const getStatusMessage = (status: string): string => {
  switch (status) {
    case SoftlifeResponseStatus.SUCCESS:
      return SoftlifeResponseStatusMessage.SUCCESS;
      break;

    case SoftlifeResponseStatus.FAILED:
      return SoftlifeResponseStatusMessage.FAILED;
      break;

    case SoftlifeResponseStatus.PENDING:
      return SoftlifeResponseStatusMessage.PENDING;
      break;

    default:
      return 'Operation status unknown!';
      break;
  }
};
