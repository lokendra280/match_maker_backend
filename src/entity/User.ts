import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Role } from "./Role";

import { SoftDelete } from "./SoftDelete";


@Entity()
export class User extends SoftDelete {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: "first_name", nullable: true })
  firstName?: string;

  @Column({ name: "last_name", nullable: true })
  lastName?: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: "phone_number", nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true, name:"device_id" })
  deviceId?: string;

  @Column({ name: "forget_password", nullable: true })
  forgetPassword?: string;

  // @OneToOne(({}) => Role)
  // @JoinColumn({name: 'role_id'})
  // roleId: Role

  @ManyToOne(() => Role, (role) => role.userId)
  @JoinColumn({ name: "role_id" })
  roleId: Role;


}
