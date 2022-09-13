import * as yup from 'yup';

export const GetAllValidation = yup.object().shape({
  active: yup.boolean()
});

export const AddValidation = yup.object().shape({
  name: yup.string().required(),
  init: yup.date().required(),
  description: yup.string().required(),

  end: yup.date().nullable(),
  link: yup.string().url().nullable(),
});

export const UpdateValidation = yup.object().shape({
  name: yup.string(),
  init: yup.date(),
  description: yup.string(),

  end: yup.date().nullable(),
  link: yup.string().url().nullable(),
});

export const DeleteValidation = yup.object().shape({
  real: yup.boolean()
});
