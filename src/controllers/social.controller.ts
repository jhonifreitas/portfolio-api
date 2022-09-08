import { Request, Response } from 'express';

import { ValidationError } from '@exceptions/validation-error';

import {
  AddValidation,
  UpdateValidation,
  GetAllValidation,
  DeleteValidation,
} from '@validations/social.validation';

import { Social } from '@models/social';
import { SocialRepository } from '@repositories/social.repository';

const SocialController = {
  async getAll(request: Request, response: Response) {
    const query = request.query as {[name: string]: string};
    
    await GetAllValidation.validate(query).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });
    
    const _social = new SocialRepository();
    let socials: Social[] = [];

    if (query.active === 'true') socials = await _social.getAllActive();
    else if (query.active === 'false') socials = await _social.getAllDeleted();
    else socials = await _social.getAll();

    return response.json(socials);
  },

  async get(request: Request, response: Response) {
    const { id } = request.params;
    const _social = new SocialRepository();
    const social = await _social.getById(id);
    return response.json(social);
  },

  async add(request: Request, response: Response) {
    const body = request.body;

    await AddValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _social = new SocialRepository(response.locals.get('user').uid);
    const social = new Social(body);
    social.id = await _social.add(social);

    return response.status(201).json(social);
  },

  async update(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await UpdateValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _social = new SocialRepository(response.locals.get('user').uid);
    const social = await _social.getById(id);

    if (body.link) social.link = body.link;
    if (body.type) social.type = body.type;

    await _social.update(social.id, social);

    return response.json(social);
  },

  async active(request: Request, response: Response) {
    const { id } = request.params;
    const _social = new SocialRepository(response.locals.get('user').uid);
    await _social.softDelete(id, false);
    return response.json();
  },

  async delete(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await DeleteValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _social = new SocialRepository(response.locals.get('user').uid);
    await _social.delete(id, body.real);

    return response.json();
  }
};

export default SocialController;
