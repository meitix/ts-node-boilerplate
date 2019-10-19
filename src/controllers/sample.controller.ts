import { Controller, Route, Get, Query , Request, Post, Body, Delete, SuccessResponse, Put } from 'tsoa';
import { ISample, ISampleService, TYPES } from '../libs/sample/interfaces';
import { inject, injectable } from 'inversify';

@Route('samples')
@injectable()
export class SampleController extends Controller {
  constructor(@inject(TYPES.ISampleService) private paymentPlanService: ISampleService) {
      super();
  }
  
  @Get()
  async list(@Query() filter?: any): Promise<ISample[]> {
    return this.paymentPlanService.find(filter);
  }

  @Get('{id}')
  async find(id: number): Promise<ISample> {
    return this.paymentPlanService.findById(id);
  }
  
  @Post()
  async create(@Body() plan: ISample): Promise<ISample> {
    return await this.paymentPlanService.create(plan);
  }

  @Put('{id}')
  async update(id:number, @Body() plan: ISample): Promise<any> {
    return this.paymentPlanService.update(id, plan);
  }
  
  @Delete('{id}')
   async delete(id: number): Promise<any> {
     return this.paymentPlanService.delete(id);
   }
}
