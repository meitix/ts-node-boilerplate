import * as Typeorm from '../libs/sample/typeorm';
import { injectable } from 'inversify';


@injectable()
export class SampleApplicationService extends Typeorm.SampleService {}