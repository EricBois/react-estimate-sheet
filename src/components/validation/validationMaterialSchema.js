import * as yup from 'yup';

const validationMaterialSchema = yup.object({
  item: yup
    .string('Enter an Item Name')
    .required('Item Name is Required'),
  quantity: yup
    .number('Enter Hours')
    .typeError('Quantity must be a number')
    .positive('Quantity must be greater than zero')
    .required('Quantity is required'),
  price: yup
    .number('Enter Price')
    .typeError('Price must be a number')
});

export default validationMaterialSchema;