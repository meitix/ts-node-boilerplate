import { IEntity } from './interfaces/entity.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ISample } from '../../interfaces/models/sample.interface';

@Entity()
export class Sample implements IEntity, ISample {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  url: string;
  @Column()
  isActive: boolean;
}
