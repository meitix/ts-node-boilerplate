import { TYPES } from '../../libs/sample/interfaces';
import { Container, inject, injectable } from 'inversify';
import { SampleApplicationService} from '../../services';

import { SampleController } from '../../controllers';

const iocContainer = new Container({skipBaseClassChecks: true});

iocContainer.bind(TYPES.ISampleService).to(SampleApplicationService);
iocContainer.bind(SampleController).toSelf();

export { iocContainer, inject, injectable };
