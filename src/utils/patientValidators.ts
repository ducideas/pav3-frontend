import moment from 'moment';
export const validators =(ruleName: string, ruleCondition:number | string | RegExp | boolean, value:string, field:string)=>{
    let result: string ='';
    switch (ruleName){
        case 'required':
            if (ruleCondition && !((typeof value === 'boolean' || typeof value === 'number' || value) && value.toString() ? value.toString().length > 0 : false)) {
                result = field+' is required';
            }
            return result;
        case 'maxLength':
            if (!(value ? value.length <= Number(ruleCondition) : true)) {
                    result = field+ ' cannot exceed ' + ruleCondition + ' characters.';
            }
            return result;
        case 'format':
                if (!(value ? String(value).match(ruleCondition as string | RegExp) : true)) {
                    result =field+ ' is invalid';
                }
            return result;
        case 'notIntheFuture':
            if (ruleCondition && moment(value, 'YYYY/MM/DD').isValid()) {
                const minDate=moment('1900/01/01','YYYY/MM/DD')
                const maxDate=moment();

                if (moment(value, 'YYYY/MM/DD').format('YYYYMMDD') > maxDate.format('YYYYMMDD') ||
                moment(value, 'YYYY/MM/DD').format('YYYYMMDD')<minDate.format('YYYYMMDD')) {
                    result="Please enter a value between " + minDate.format('MM/DD/YYYY').toString() + " and " + maxDate.format('MM/DD/YYYY').toString();
                }
            }
        return result;
        default:
            return '';
    }
}
export const checkErrorForm = (validationRules: Object, data: Object) => {
    return Object.keys(validationRules).some(validationRule => {
        return Object.keys((validationRules as any)[validationRule]).some(rule => {
            return validators(rule, (validationRules as any)[validationRule][rule], (data as any)[validationRule],validationRule).length > 0;
        });
    });

};