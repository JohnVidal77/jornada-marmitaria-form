export const cleanNumber = (number: string): string => {
  return number ? number.replace(/\D/g, '') : '';
};

export default cleanNumber;
