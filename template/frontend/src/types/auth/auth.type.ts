import type { AccountType } from "../account/account.type";

export type AuthStoreType = {
  loading: boolean;

  setRegister: (data: Partial<AccountType>) => Promise<boolean | string>;
  setLogin: (data: Partial<AccountType>) => Promise<boolean | string>;
  logout: () => Promise<boolean>;
};
