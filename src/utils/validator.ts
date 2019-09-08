export function validatePhone (phone: string): boolean {
  return !(/^((13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8})$/).test(phone);
}

export function validatePassword (password: string): boolean {
  return !(/\w{6,}/).test(password);
}