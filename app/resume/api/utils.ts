export function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}

export const validateDateInput = (input: string) => {
  const pattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
  return pattern.test(input);
};

export const formatDateToFormat = (date: Date | undefined) => {
  if (!date) return "";
  let month: string | number = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  return `${month}/${date.getFullYear()}`;
};
