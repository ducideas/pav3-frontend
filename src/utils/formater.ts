import moment from 'moment';

/* DOB sent to server must be YYYY-MM-DD */
export function parseDateToSendToServer(date: string){
    return moment(date, 'YYYY/MM/DD').isValid() ? moment(date, 'YYYY/MM/DD').format('YYYY-MM-DDTHH:mm:sszzz'):'';
}

export function formatDateFromServer(date: string | undefined) {
    return moment(date, 'YYYY-MM-DDTHH:mm:sszzz').isValid() ? moment(date, 'YYYY-MM-DDTHH:mm:sszzz').format('YYYY-MM-DD') : '';
}

export function formatDateFromServerToUI(date: string | undefined) {
    return moment(date, 'YYYY-MM-DDTHH:mm:sszzz').isValid() ? moment(date, 'YYYY-MM-DDTHH:mm:sszzz').format('MM-DD-YYYY') : '';
}
export function formatPhoneNumber(value:string) {
    if (!value) return value;
  
    const phoneNumber = value.replace(/[^\d]/g, "");
  
    const phoneNumberLength = phoneNumber.length;
  
    if (phoneNumberLength < 4) return phoneNumber;
  
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6, 10)}`;
  }