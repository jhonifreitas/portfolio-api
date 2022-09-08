import * as yup from 'yup';

export const GetAllValidation = yup.object().shape({
  active: yup.boolean()
});

export const AddValidation = yup.object().shape({
  name: yup.string().required(),
  years: yup.number().positive().required(),
  percent: yup.number().positive().required(),
});

export const UpdateValidation = yup.object().shape({
  name: yup.string().nullable(),
  years: yup.number().positive().nullable(),
  percent: yup.number().positive().nullable(),
});

export const DeleteValidation = yup.object().shape({
  real: yup.boolean()
});
