import * as dotenv from "dotenv";
dotenv.config();

type Config = {
  apple: Record<string, string>,
  aws: Record<string, string>,
  company: Record<string, string>,
  ecpay: Record<string, string>,
  firebase: Record<string, string>,
  line: Record<string, string>,
  sfexpress: Record<string, string>,
  shopify: Record<string, string>,
  tappay: Record<string, string>,
  projectId: string,
};

const config: Config = {
  apple: {
    appId: process.env.APPLE_APP_ID,
  },
  aws: {
    region: process.env.AWS_S3_REGION,
    bucket: process.env.AWS_S3_BUCKET,
  },
  company: {
    name: process.env.COMPANY_NAME,
    phone: process.env.COMPANY_PHONE,
    staffName: process.env.COMPANY_STAFF_NAME,
    staffPhone: process.env.COMPANY_STAFF_PHONE,
    vatNumber: process.env.COMPANY_VAT_NUMBER,
    postalCode: process.env.COMPANY_POSTAL_CODE,
    city: process.env.COMPANY_CITY,
    district: process.env.COMPANY_DISTRICT,
    address: process.env.COMPANY_ADDRESS,
  },
  firebase: {
    region: process.env.FIREBASE_REGION
  },
  line: {
    channelId: process.env.LINE_CHANNEL_ID,
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  },
  ecpay: {
    merchantId: process.env.ECPAY_MERCHANT_ID,
    hashKey: process.env.ECPAY_HASH_KEY,
    hashIV: process.env.ECPAY_HASH_IV,
  },
  projectId: process.env.GCLOUD_PROJECT,
  sfexpress: {
    merchantId: process.env.SF_MERCHANT_ID,
    signKey: process.env.SF_SIGN_KEY,
    appKey: process.env.SF_APP_KEY,
    appSecret: process.env.SF_APP_SECRET,
    aesSecretKey: process.env.SF_AES_SECRET_KEY,
    monthCardNumber: process.env.SF_MONTH_CARD_NUMBER,
  },
  shopify: {
    domain: process.env.SHOPIFY_DOMAIN,
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
    adminAccessToken: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
  },
  tappay: {
    merchantId: process.env.TAPPAY_MERCHANT_ID,
    partnerKey: process.env.TAPPAY_PARTNER_KEY,
  },
};

export default config;
