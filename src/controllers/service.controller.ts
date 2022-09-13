import { Request, Response } from 'express';

import { ValidationError } from '@exceptions/validation-error';

import {
  AddValidation,
  UpdateValidation,
  GetAllValidation,
  DeleteValidation,
} from '@validations/service.validation';

import { Service } from '@models/service';
import { ServiceRepository } from '@repositories/service.repository';

const ServiceController = {
  async getAll(request: Request, response: Response) {
    const query = request.query as {[name: string]: string};
    
    await GetAllValidation.validate(query).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });
    
    const _service = new ServiceRepository();
    let services: Service[] = [];

    if (query.active === 'true') services = await _service.getAllActive();
    else if (query.active === 'false') services = await _service.getAllDeleted();
    else services = await _service.getAll();

    return response.json(services);
  },

  async get(request: Request, response: Response) {
    const { id } = request.params;
    const _service = new ServiceRepository();
    const service = await _service.getById(id);
    return response.json(service);
  },

  async add(request: Request, response: Response) {
    const body = request.body;

    await AddValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _service = new ServiceRepository(response.locals.userId);
    const service = new Service(body);
    service.id = await _service.add(service);

    return response.status(201).json(service);
  },

  async update(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await UpdateValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _service = new ServiceRepository(response.locals.userId);
    const service = await _service.getById(id);

    if (body.title_PT) service.title_PT = body.title_PT;
    if (body.title_EN) service.title_EN = body.title_EN;
    if (body.icon || body.icon === null) service.icon = body.icon;
    if (body.description_PT) service.description_PT = body.description_PT;
    if (body.description_EN) service.description_EN = body.description_EN;

    await _service.update(service.id, service);

    return response.json(service);
  },

  async active(request: Request, response: Response) {
    const { id } = request.params;
    const _service = new ServiceRepository(response.locals.userId);
    await _service.softDelete(id, false);
    return response.json();
  },

  async delete(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await DeleteValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _service = new ServiceRepository(response.locals.userId);
    await _service.delete(id, body.real);

    return response.json();
  }
};

export default ServiceController;
