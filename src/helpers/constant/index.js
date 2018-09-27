export const ERROR_UNKNOWN_ACTION = "80001"; //"unknown action"
export const ERROR_EFORM_EXPIRED = "90006";
export const ERROR_EARLY = "90007";
export const ERROR_APPOINTMENT_EXPIRED = "90008";
export const ERROR_NOT_BRANCH = "90009";
export const ERROR_BENEFECIARY_ACCOUNT = "90001"; //"Beneficiary Account must be difference"
export const ERROR_ACCOUNT_NOT_EXIST = "99902"; //"Account not Exist"
export const ERROR_TICKET_NUMBER = "99903"; //"Ticket Number is Not Exist"
export const ERROR_TICKET_ARE_EXPIRED = "99904"; //"Your Ticket Number Are Expired"
export const ERROR_TICKET_ARE_NOT_IN_THIS_BRANCH = "99905"; //"Your Ticket Number Are Not in This Branch"
export const ERROR_BRANCH_NOT_EXIST = "21001"; //"branchid not exist"
export const ERROR_INVALID_PARAM = "10001"; //"invalid param"
export const ERROR_INVALID_USER_DATA = "99900"; //"Account not Exist or Incorrect Password."
export const ERROR_NOT_APPOINTMENT_TIME = "31014";
export const ERROR_APPOINTMENT_CODE_USED = "31016";
export const ERROR_APPOINTMENT_CODE_EXPIRED = "7002";
export const ERROR_APPOINTMENT_CODE_NOT_FOUND = "7004";
export const ERROR_APPOINTMENT_CODE_NOT_EXIST = "31012";
export const ERROR_APPOINTMENT_CODE_NOT_IN_BRANCH = "31013";
export const ERROR_APPOINTMENT_CODE_CANCELED = "31017";
export const ERROR_EFORM_HAS_EXPIRED = "90006";
export const ERROR_BUSINESS_NOT_IN_TIME = "31011";
export const ERROR_RESERVATION_TIME_PASSED = "31015";

// "80001" : "Unknown Action"
// "90011";		"Account not Exist or Incorrect Password.";
// "90012";		"This Account Already Exist";
// "90013";		"Incorrect Email or Incorrect Password";
// "80001";		"Account not Exist";
//
// "80001";		"Unknown Action";
// "99902";		"Account not Exist";
// "90002";		"You Already Have Ticket Number";
// "90006";		"Your Appointment is Expired and your form is Expired.";
//
// "90002";		"You Already Have Ticket Number";
// "90006";		"Your Appointment is Expired and your form is Expired.";
// "90007";		"You Come Too Earlier, Please Come Back Later or Create new Appointment";
// "90008";		"Your Appointment is Expired, but form still exist.";
// "90009";		"Your appointment not in this branch.";

// error code from native
export const ERROR_CODE_TIMEOUT = 1;
export const ERROR_CODE_CONNECTION = 2;
export const ERROR_CODE_SECURITY_ISSUE = 3;
export const ERROR_CODE_RESPONSE = 4;
export const ERROR_CODE_SERVER = 5;
export const ERROR_CODE_SERVER_DATA = 6;
export const ERROR_CODE_SESSION_TIMEOUT = 7;

// directory constant
export const TELLER = "teller";
export const MAIN = "main";
export const TRANSACTION = "transaction";
export const MOCK = "";

// action constant
export const ACTION_CREATE = "CREATE";
export const ACTION_READ = "READ";
export const ACTION_UPDATE = "UPDATE";
export const ACTION_DELETE = "DELETE";
export const ACTION_LOGIN = "LOGIN";

export const POST_METHOD = "POST";
export const GET_METHOD = "GET";

export const PRECISION_CURRENCY = 0;
export const SEPARATOR_CURRENCY = '.'; // decimal separator
export const DELIMITER_CURRENCY = ','; // thousand separator
export const UNIT_CURRENCY = ''; // make it default to blank