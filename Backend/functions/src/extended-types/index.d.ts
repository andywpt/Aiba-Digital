import {DecodedIdToken} from "firebase-admin/auth"

declare global {
  namespace Express {
    interface Request {
      idToken: DecodedIdToken;
    }
    interface Response {
      idToken: DecodedIdToken;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      APPLE_APP_ID: string;

      AWS_ACCESS_KEY_ID: string
      AWS_SECRET_ACCESS_KEY: string
      AWS_S3_REGION: string
      AWS_S3_BUCKET: string

      COMPANY_NAME: string
      COMPANY_STAFF_NAME: string
      COMPANY_STAFF_PHONE: string
      COMPANY_VAT_NUMBER: string
      COMPANY_ADDRESS: string
      COMPANY_CITY: string
      COMPANY_DISTRICT: string
      COMPANY_POSTAL_CODE: string
      COMPANY_PHONE: string

      ECPAY_MERCHANT_ID: string
      ECPAY_HASH_KEY: string
      ECPAY_HASH_IV: string

      FIREBASE_REGION: string

      GCLOUD_PROJECT: string

      LINE_CHANNEL_ID: string
      LINE_CHANNEL_ACCESS_TOKEN: string

      SF_MERCHANT_ID: string
      SF_APP_KEY: string
      SF_APP_SECRET: string
      SF_AES_SECRET_KEY: string
      SF_MONTH_CARD_NUMBER: string
      SF_SIGN_KEY: string

      SHOPIFY_DOMAIN: string
      SHOPIFY_API_KEY: string
      SHOPIFY_API_SECRET_KEY: string
      SHOPIFY_ADMIN_API_ACCESS_TOKEN: string

      TAPPAY_MERCHANT_ID: string
      TAPPAY_PARTNER_KEY: string
    }
  }
}


