import { Request, Response } from 'express';

import { ValidationError } from '@exceptions/validation-error';

import {
  AddValidation,
  UpdateValidation,
  GetAllValidation,
  DeleteValidation,
} from '@validations/company.validation';

import { Company } from '@models/company';
import { CompanyRepository } from '@repositories/company.repository';

const CompanyController = {
  async getAll(request: Request, response: Response) {
    const query = request.query as {[name: string]: string};
    
    await GetAllValidation.validate(query).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });
    
    const _company = new CompanyRepository();
    let companies: Company[] = [];

    if (query.active === 'true') companies = await _company.getAllActive();
    else if (query.active === 'false') companies = await _company.getAllDeleted();
    else companies = await _company.getAll();

    return response.json(companies);
  },

  async get(request: Request, response: Response) {
    const { id } = request.params;
    const _company = new CompanyRepository();
    const company = await _company.getById(id);
    return response.json(company);
  },

  async add(request: Request, response: Response) {
    const body = request.body;

    await AddValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _company = new CompanyRepository(response.locals.userId);
    const company = new Company(body);
    company.id = await _company.add(company);

    return response.status(201).json(company);
  },

  async update(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await UpdateValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _company = new CompanyRepository(response.locals.userId);
    const company = await _company.getById(id);

    if (body.name) company.name = body.name;
    if (body.init) company.init = body.init;
    if (body.end) company.end = body.end;
    if (body.description_PT) company.description_PT = body.description_PT;
    if (body.description_EN) company.description_EN = body.description_EN;

    if (body.logo || body.logo === null) company.logo = body.logo;
    if (body.link || body.link === null) company.link = body.link;

    await _company.update(company.id, company);

    return response.json(company);
  },

  async active(request: Request, response: Response) {
    const { id } = request.params;
    const _company = new CompanyRepository(response.locals.userId);
    await _company.softDelete(id, false);
    return response.json();
  },

  async delete(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await DeleteValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _company = new CompanyRepository(response.locals.userId);
    await _company.delete(id, body.real);

    return response.json();
  }
};

export default CompanyController;
