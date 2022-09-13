import * as yup from 'yup';

export const GetAllValidation = yup.object().shape({
  active: yup.boolean()
});

export const AddValidation = yup.object().shape({
  title_PT: yup.string().required(),
  title_EN: yup.string().required(),
  description_PT: yup.string().required(),
  description_EN: yup.string().required(),

  icon: yup.string().url().nullable()
});

export const UpdateValidation = yup.object().shape({
  title_PT: yup.string().nullable(),
  title_EN: yup.string().nullable(),
  description_PT: yup.string().nullable(),
  description_EN: yup.string().nullable(),

  icon: yup.string().url().nullable()
});

export const DeleteValidation = yup.object().shape({
  real: yup.boolean()
});
