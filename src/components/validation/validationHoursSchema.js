import * as yup from 'yup';

const validationHoursSchema = yup.object({
  item: yup
    .string('Enter an Item Name')
    .required('Item Name is Required'),
  hours: yup
    .number('Enter Hours')
    .typeError('hours must be a number')
    .positive('hours must be greater than zero')
    .required('hours is required'),
  price: yup
    .number('Enter Price')
    .typeError('price must be a number')
    .positive('price must be greater than zero')
    .required('price is required')
});

export default validationHoursSchema;
