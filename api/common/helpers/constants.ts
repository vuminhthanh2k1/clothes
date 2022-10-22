
export const MIN_PASSWORD_LENGTH = 8;

export const MAX_PASSWORD_LENGTH = 100;

export const WEAK_PASSWORD_STATUS_CODE = 422;

export const WEAK_PASSWORD_ERROR_MESSAGE = `Password must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters long, must contain both upper and lowercase letters and 2 digit!`;

export const NEW_PASSWORD_IS_DIFFERENT_FROM_OLD_MESSAGE =
  'The new password must be different from the old password';

export const NEW_PASSWORD_IS_DIFFERENT_FROM_OLD =
  'NEW_PASSWORD_IS_DIFFERENT_FROM_OLD';

export const vnp_HashSecret = "KYSEEEZQHCBZDBHMRPZIFEKROOFBMWAP";
export const vnp_TmnCode = "THNHL9EN";
export const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
export const web_Url = "http://localhost:3003/"