import bcrypt from "bcryptjs";

export const hashValue = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
};

export const compareHashed = async (
  enteredValue: string,
  storedValue: string,
): Promise<boolean> => {
  return await bcrypt.compare(enteredValue, storedValue);
};
