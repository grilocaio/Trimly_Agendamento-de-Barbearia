import { 
    LocalStorageUserRepository, 
    LocalStorageBookingRepository, 
    LocalStorageBarbeariaRepository, 
    LocalStorageCorteRepository, 
    LocalStorageHorarioRepository 
} from '../repositories/LocalStorageRepositories';

import { 
    ApiUserRepository, 
    ApiBookingRepository, 
    ApiBarbeariaRepository, 
    ApiCorteRepository, 
    ApiHorarioRepository 
} from '../repositories/ApiRepositories';

import { AuthService } from './AuthService';
import { BookingService } from './BookingService';

const USE_API = false; 

const userRepository = USE_API ? new ApiUserRepository() : new LocalStorageUserRepository();
const bookingRepository = USE_API ? new ApiBookingRepository() : new LocalStorageBookingRepository();
const barbeariaRepository = USE_API ? new ApiBarbeariaRepository() : new LocalStorageBarbeariaRepository();
const corteRepository = USE_API ? new ApiCorteRepository() : new LocalStorageCorteRepository();
const horarioRepository = USE_API ? new ApiHorarioRepository() : new LocalStorageHorarioRepository();

export const authService = new AuthService(userRepository, bookingRepository);
export const bookingService = new BookingService({
    bookingRepository,
    barbeariaRepository,
    corteRepository,
    horarioRepository,
    userRepository
});
