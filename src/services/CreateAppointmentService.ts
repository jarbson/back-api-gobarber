import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'; // possui todos metodos(create, update, delete ..)
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}
// Método Create
class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentsInSameDate) {
      throw new AppError('ja existe um agendamento para essa date');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
