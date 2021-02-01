import * as yup from 'yup';

const validationMeasureSchema = yup.object({
  name: yup
    .string('Enter a Name')
    .required('This Field is Required'),
  sqfPrice: yup
    .number('Enter Price')
    .typeError('price must be a number'),
  hourly: yup
    .number('Enter Hourly Rate')
    .typeError('Rate must be a number')
});

export default validationMeasureSchema;