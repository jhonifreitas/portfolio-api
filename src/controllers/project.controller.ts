import { Request, Response } from 'express';

import { ValidationError } from '@exceptions/validation-error';

import {
  AddValidation,
  UpdateValidation,
  GetAllValidation,
  DeleteValidation,
  DeleteImageValidation,
} from '@validations/project.validation';

import { Project } from '@models/project';
import { ProjectRepository } from '@repositories/project.repository';

const ProjectController = {
  async getAll(request: Request, response: Response) {
    const query = request.query as {[name: string]: string};
    
    await GetAllValidation.validate(query).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });
    
    const _project = new ProjectRepository();
    let projects: Project[] = [];

    if (query.active === 'true') projects = await _project.getAllActive();
    else if (query.active === 'false') projects = await _project.getAllDeleted();
    else projects = await _project.getAll();

    return response.json(projects);
  },

  async get(request: Request, response: Response) {
    const { id } = request.params;
    const _project = new ProjectRepository();
    const project = await _project.getById(id);
    return response.json(project);
  },

  async add(request: Request, response: Response) {
    const body = request.body;

    await AddValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _project = new ProjectRepository(response.locals.userId);
    const project = new Project(body);
    project.id = await _project.add(project);

    return response.status(201).json(project);
  },

  async update(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await UpdateValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _project = new ProjectRepository(response.locals.userId);
    const project = await _project.getById(id);

    if (body.skillIds) project.skillIds = body.skillIds;
    if (body.name) project.name = body.name;
    if (body.type) project.type = body.type;
    if (body.images) project.images = body.images;
    if (body.description_PT) project.description_PT = body.description_PT;
    if (body.description_EN) project.description_EN = body.description_EN;

    if (body.link || body.link === null) project.link = body.link;
    if (typeof body.featured_image === 'number') project.featured_image = body.featured_image;

    await _project.update(project.id, project);

    return response.json(project);
  },

  async deleteImage(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await DeleteImageValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _project = new ProjectRepository(response.locals.userId);
    const project = await _project.getById(id);

    project.images.splice(body.index, 1);

    await _project.update(project.id, {images: project.images});

    return response.json(project);
  },

  async active(request: Request, response: Response) {
    const { id } = request.params;
    const _project = new ProjectRepository(response.locals.userId);
    await _project.softDelete(id, false);
    return response.json();
  },

  async delete(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await DeleteValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _project = new ProjectRepository(response.locals.userId);
    await _project.delete(id, body.real);

    return response.json();
  }
};

export default ProjectController;
