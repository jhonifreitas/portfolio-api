import * as yup from 'yup';

export const GetAllValidation = yup.object().shape({
  active: yup.boolean()
});

export const AddValidation = yup.object().shape({
  name: yup.string().required(),
  profession_init: yup.date().required(),
  profession_PT: yup.string().required(),
  profession_EN: yup.string().required(),
  about_PT: yup.string().required(),
  about_EN: yup.string().required(),

  photo: yup.string().url().nullable(),
  CV_PT: yup.string().url().nullable(),
  CV_EN: yup.string().url().nullable(),
});

export const UpdateValidation = yup.object().shape({
  name: yup.string().nullable(),
  profession_init: yup.date().nullable(),
  profession_PT: yup.string().nullable(),
  profession_EN: yup.string().nullable(),
  about_PT: yup.string().nullable(),
  about_EN: yup.string().nullable(),

  photo: yup.string().url().nullable(),
  CV_PT: yup.string().url().nullable(),
  CV_EN: yup.string().url().nullable(),
});

export const DeleteValidation = yup.object().shape({
  real: yup.boolean()
});
