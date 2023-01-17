import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ type: 'integer', default: null })
  parentId: number;

  @ManyToOne(() => MenuItem, (parent) => parent.children)
  parent: MenuItem;

  @OneToMany(() => MenuItem, (children) => children.parent)
  children: MenuItem[];

  @Column({ type: 'datetime' })
  createdAt: string;
}
