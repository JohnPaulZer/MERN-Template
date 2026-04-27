import Account from "@/models/account/account.model";

export const pullExpiredSessionsS = async (accountId: string) => {
  return Account.updateOne(
    { _id: accountId },
    { $pull: { sessions: { expiresAt: { $lt: new Date() } } } },
  ).exec();
};
