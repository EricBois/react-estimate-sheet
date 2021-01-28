import * as yup from 'yup';

const validationMeasureSchema = yup.object({
  roomLength: yup
    .string('Enter a Measure or Name')
    .required('This Field is Required'),
  roomWidth: yup
    .number('Enter Hours')
    .typeError('hours must be a number')
    .positive('hours must be greater than zero'),
  sqfPrice: yup
    .number('Enter Price')
    .typeError('price must be a number')
    .positive('price must be greater than zero')
});

export default validationMeasureSchema;