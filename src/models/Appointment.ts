import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; // Entidade, com algo que será salvo no banco de dados

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
