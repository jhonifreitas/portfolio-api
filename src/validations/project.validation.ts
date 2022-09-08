import * as yup from 'yup';

export const GetAllValidation = yup.object().shape({
  active: yup.boolean()
});

export const AddValidation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

export const UpdateValidation = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
});

export const DeleteValidation = yup.object().shape({
  real: yup.boolean()
});
