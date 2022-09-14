import * as yup from 'yup';
import { SocialType } from '@models/social';

const types = ['email', 'phone', 'whatsapp', 'linked-in', 'github', 'facebook'];

export const GetAllValidation = yup.object().shape({
  active: yup.boolean()
});

export const AddValidation = yup.object().shape({
  type: yup.string().equals(types).required(),
  link: yup.string()
    .when('type', {
      is: (type: SocialType) => type === 'phone' || type === 'whatsapp',
      then: yup.string().min(10).max(11)
    })
    .when('type', {
      is: 'email',
      then: yup.string().email()
    })
    .when('type', {
      is: (type: SocialType) => type === 'linked-in' || type === 'github' || type === 'facebook',
      then: yup.string().url()
    })
    .required(),
});

export const UpdateValidation = yup.object().shape({
  type: yup.string().equals(types).required(),
  link: yup.string()
    .when('type', {
      is: (type: SocialType) => type === 'phone' || type === 'whatsapp',
      then: yup.string().min(10).max(11)
    })
    .when('type', {
      is: 'email',
      then: yup.string().email()
    })
    .when('type', {
      is: (type: SocialType) => type === 'linked-in' || type === 'github' || type === 'facebook',
      then: yup.string().url()
    })
    .nullable(),
});

export const DeleteValidation = yup.object().shape({
  real: yup.boolean()
});
