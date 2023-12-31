import * as dotenv from "dotenv";
dotenv.config();

interface AppleConfig{
  appId: string;
}

interface AWSConfig {
  region: string;
  bucket: string;
}

interface CompanyConfig {
  name: string;
  phone: string;
  staffName: string;
  staffPhone: string;
  vatNumber: string;
  postalCode: string;
  city: string;
  district: string;
  address: string;
}

interface LineConfig {
  channelId: string;
  channelAccessToken: string;
}

interface EcpayConfig {
  merchantId: string;
  hashKey: string;
  hashIV: string;
}

interface SfExpressConfig {
  merchantId: string;
  signKey: string;
  appKey: string;
  appSecret: string;
  aesSecretKey: string;
  monthCardNumber: string;
}

interface ShopifyConfig {
  domain: string;
  apiKey: string;
  apiSecretKey: string;
  adminAccessToken: string;
}

interface TappayConfig {
  merchantId: string;
  partnerKey: string;
}

interface AppConfig {
  apple: AppleConfig;
  aws: AWSConfig;
  company: CompanyConfig;
  line: LineConfig;
  ecpay: EcpayConfig;
  projectId: string;
  sfexpress: SfExpressConfig;
  shopify: ShopifyConfig;
  tappay: TappayConfig;
}

const config: AppConfig = {
  apple: {
    appId: process.env.APPLE_APP_ID || "",
  },
  aws: {
    region: process.env.AWS_S3_REGION || "",
    bucket: process.env.AWS_S3_BUCKET || "",
  },
  company: {
    name: process.env.COMPANY_NAME || "",
    phone: process.env.COMPANY_PHONE || "",
    staffName: process.env.COMPANY_STAFF_NAME || "",
    staffPhone: process.env.COMPANY_STAFF_PHONE || "",
    vatNumber: process.env.COMPANY_VAT_NUMBER || "",
    postalCode: process.env.COMPANY_POSTAL_CODE || "",
    city: process.env.COMPANY_CITY || "",
    district: process.env.COMPANY_DISTRICT || "",
    address: process.env.COMPANY_ADDRESS || "",
  },
  line: {
    channelId: process.env.LINE_CHANNEL_ID || "",
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  },
  ecpay: {
    merchantId: process.env.ECPAY_MERCHANT_ID || "",
    hashKey: process.env.ECPAY_HASH_KEY || "",
    hashIV: process.env.ECPAY_HASH_IV || "",
  },
  projectId: process.env.GCLOUD_PROJECT || "",
  sfexpress: {
    merchantId: process.env.SF_MERCHANT_ID || "",
    signKey: process.env.SF_SIGN_KEY || "",
    appKey: process.env.SF_APP_KEY || "",
    appSecret: process.env.SF_APP_SECRET || "",
    aesSecretKey: process.env.SF_AES_SECRET_KEY || "",
    monthCardNumber: process.env.SF_MONTH_CARD_NUMBER || "",
  },
  shopify: {
    domain: process.env.SHOPIFY_DOMAIN || "",
    apiKey: process.env.SHOPIFY_API_KEY || "",
    apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY || "",
    adminAccessToken: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || "",
  },
  tappay: {
    merchantId: process.env.TAPPAY_MERCHANT_ID || "",
    partnerKey: process.env.TAPPAY_PARTNER_KEY || "",
  },
};

export default config;
