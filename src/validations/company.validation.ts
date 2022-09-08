import * as yup from 'yup';

export const GetAllValidation = yup.object().shape({
  active: yup.boolean()
});

export const AddValidation = yup.object().shape({
  name: yup.string().required(),
  link: yup.string().url().nullable(),
  logo: yup.string().url().nullable(),
});

export const UpdateValidation = yup.object().shape({
  name: yup.string(),
  link: yup.string().url().nullable(),
  logo: yup.string().url().nullable(),
});

export const DeleteValidation = yup.object().shape({
  real: yup.boolean()
});