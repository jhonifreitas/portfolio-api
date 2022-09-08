import * as yup from 'yup';

const types = ['mobile', 'system', 'website', 'e-commerce'];

export const GetAllValidation = yup.object().shape({
  active: yup.boolean()
});

export const AddValidation = yup.object().shape({
  companyId: yup.string().required(),
  skillIds: yup.array().of(yup.string()).required(),

  name: yup.string().required(),
  type: yup.string().equals(types).required(),

  description_PT: yup.string().required(),
  description_EN: yup.string().required(),

  link: yup.string().nullable(),
  featured_image: yup.string().nullable(),
  images: yup.array().of(yup.string().url()).nullable(),
});

export const UpdateValidation = yup.object().shape({
  companyId: yup.string().nullable(),
  skillIds: yup.array().of(yup.string()),

  type: yup.string().equals(types),

  name: yup.string().nullable(),
  link: yup.string().nullable(),

  description_PT: yup.string().nullable(),
  description_EN: yup.string().nullable(),

  featured_image: yup.string().nullable(),
  images: yup.array().of(yup.string().url()).nullable(),
});

export const DeleteValidation = yup.object().shape({
  real: yup.boolean()
});
