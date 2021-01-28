import * as yup from 'yup';

const validationEstimateSchema = yup.object({
  name: yup
    .string('Enter a Name')
    .required('This Field is Required'),
  address: yup
    .string('Enter Address'),
  note: yup
    .string('Enter Note')
    
});

export default validationEstimateSchema;