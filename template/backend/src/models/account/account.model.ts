import {
  AccountDocumentType,
  GeoType,
  SessionType,
  UserAgentType,
} from "@/types/models/account.type";
import { model, Model, Schema } from "mongoose";

const GeoSchema = new Schema<GeoType>({
  range: [Number],
  country: String,
  region: String,
  eu: String,
  timezone: String,
  city: String,
  ll: [Number],
  metro: Number,
  area: Number,
});

const UserAgentSchema = new Schema<UserAgentType>({
  browser: {
    name: String,
    version: String,
    type: String,
  },
  cpu: {
    architecture: String,
  },
  device: {
    vendor: String,
    model: String,
    type: String,
  },
  engine: {
    name: String,
    version: String,
  },
  os: {
    name: String,
    version: String,
  },
});

const SessionSchema = new Schema<SessionType>({
  sid: String,
  ip: String,
  geo: GeoSchema,
  userAgent: UserAgentSchema,
  token: String,
  expiresAt: Date,
});

const AccountSchema = new Schema<AccountDocumentType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sessions: [SessionSchema],
  },
  { timestamps: true },
);

const Account: Model<AccountDocumentType> = model<
  AccountDocumentType,
  Model<AccountDocumentType>
>("accounts", AccountSchema);

export default Account;
