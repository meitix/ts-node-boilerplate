import { CRUDService } from './crud.service';
import { Sample } from '../entities';
import { getRepository } from 'typeorm';

export class SampleService extends CRUDService<Sample> {
    constructor() {
        super(getRepository(Sample));
    }
}
