import { ICRUDService } from './crud-service.interface';
import { ISample } from '../models';

export interface ISampleService extends ICRUDService<ISample> {}
