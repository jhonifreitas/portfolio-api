import * as yup from 'yup';

const types = ['email', 'phone', 'whatsapp', 'linked-in', 'github', 'facebook'];

export const GetAllValidation = yup.object().shape({
  active: yup.boolean()
});

export const AddValidation = yup.object().shape({
  link: yup.string().url().required(),
  type: yup.string().equals(types).required(),
});

export const UpdateValidation = yup.object().shape({
  link: yup.string().url().nullable(),
  type: yup.string().equals(types).required(),
});

export const DeleteValidation = yup.object().shape({
  real: yup.boolean()
});
