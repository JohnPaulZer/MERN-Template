import Account from "@/models/account/account.model";
import {
  AccountDocumentType,
  AccountFilterType,
  AccountType,
  SessionType,
} from "@/types/models/account.type";

export const findAccountS = async (
  filter: AccountFilterType,
  selectFields?: string,
): Promise<AccountDocumentType | null> => {
  const account = await Account.findOne(filter)
    .select(selectFields || "")
    .exec();
  return account as AccountDocumentType | null;
};

export const updateAccountS = async (
  filter: AccountFilterType,
  data: Partial<AccountType>,
): Promise<AccountDocumentType | null> => {
  const account = await Account.findOneAndUpdate(filter, data, {
    returnDocument: "after",
    runValidators: true,
    lean: true,
  }).exec();
  return account as AccountDocumentType | null;
};

export const pushSessionS = async (accountId: string, session: SessionType) => {
  return Account.findByIdAndUpdate(
    accountId,
    { $push: { sessions: session } },
    { returnDocument: "after", runValidators: true, lean: true },
  );
};

export const registerS = async (data: Partial<AccountType>) => {
  const account = await Account.create(data);
  return account;
};
