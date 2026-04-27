export type GeoType = {
  range: [number, number];
  country?: string;
  region?: string;
  eu?: string;
  timezone?: string;
  city?: string;
  ll?: [number, number];
  metro?: number;
  area?: number;
};

export type UserAgentType = {
  browser?: {
    name?: string;
    version?: string;
    type?: string;
  };
  cpu?: {
    architecture?: string;
  };
  device?: {
    vendor?: string;
    model?: string;
    type?: string;
  };
  engine?: {
    name?: string;
    version?: string;
  };
  os?: {
    name?: string;
    version?: string;
  };
};

export type SessionType = {
  _id?: string;
  sid: string;
  ip?: string;
  geo?: GeoType;
  userAgent?: UserAgentType;
  token: string;
  expiresAt: Date;
};

export type AccountType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  sessions: SessionType[];
};

export type AccountFilterType = Partial<AccountType>;

export type AccountDocumentType = AccountType & Document;
