export class AppConstants {
  public static BASE_URL = process.env.STAGE_API_URL || 'https://api-dev.abhi.com.pk'
  // "http://localhost:3000/dev/";
  // "https://api-dev.abhi.com.pk/";
  // "https://api-qa.abhi.com.pk/";
  // "https://api-uat.abhi.com.pk/";
  // "https://api-production.abhi.com.pk/";
  public static LOGIN = '/auth/login'
  public static REFERRAL = '/referral'
  public static TOKEN_ID = '@@API_MANAGER:USER_API_TOKEN@@'

  public static ADD_TARIFFS = '/manage/tariff'
  public static TARIFFS = '/manage/tariffs'
  public static DELIVERY_FEE = '/manage/service-delivery-fee'
  public static TARIFF_MODEL_TIER = '/manage/tariff-model-tiers'
  public static UPDATE_TARIFF_MODEL_TIER = '/manage/tariff-model-tiers/'
  public static TARIFF_MODEL_TIER_EXCEPTION = '/manage/tariff-model-tier-exception'
  public static BUSINESS_TYPES = '/manage/business-types'
  public static ADD_BUSINESS_TYPES = '/manage/business-type'
  public static UPDATE_BUSINESS_TYPES = '/manage/business-type/'
  public static BUSINESS_DOCUMENTS_DESCRIPTION = '/manage/business-documents-description'
  public static UPDATE_BUSINESS_DOCUMENTS = '/manage/business-documents-description/'
  public static TARRIFF_MODEL_TIPPING = '/manage/tariff-model-tipping'
  public static SERVICE_DELIVERY_FEE = '/manage/service-delivery-fee'
  public static GET_EMAIL_TEMPLATES = '/manage/email-templates'
  public static ONE_LINK_RESPONSE_CODES = '/manage/one-link-response-codes'
  public static PAYMENT_PURPOSES = '/payment-purposes'
  public static GET_DEFAULT_VALUES = '/config/one-link-default-values'
  public static ONE_LINK_DEFAULT_VALUES = '/config/one-link-default-values'
  public static BANKS = '/manage/banks'
  public static UPDATE_BANKS = '/manage/banks/'
  public static TRANSACTIONS = '/employee/transactions'
  public static EMPLOYEE_APPROVE_TRANSACTION = '/transaction/employee_approve_transaction'

  public static PLATFORM_ERRORS = '/monitor/platform-errors'
  public static NOTIFICATIONS = '/monitor/notifications'

  public static ORGANIZATIONS = '/organizations'
  public static GET_ORGANIZATION = '/organization/'
  public static ORGANIZATIONS_EMPLOYEES = '/organizations/employees'
  public static ORGANIZATIONS_SETTLEMENTS = '/organizations/settlements'
  public static ORGANIZATIONS_SETTLEMENTS_DETAILS = '/organizations/all/months/settlements'
  public static EMPLOYEES_ONBOARDING = '/organizations/employee/on-boarding'
  public static SIGNED_URL_FOR_DOWNLOAD = '/pre-signed-url-download'

  public static USERS = '/users'
  public static UPDATE_USERS = '/users/roles/'
  public static FETCH_TITLE = '/fetch-title'

  public static SUCCESS = 'success'
}
