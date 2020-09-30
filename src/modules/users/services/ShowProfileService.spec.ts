import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();

  showProfile = new ShowProfileService(
    fakeUsersRepository,
  );
});

describe('UpdateProfile', () => {
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able to show the profile for non-existing user', async () => {
    expect(showProfile.execute({
      user_id: 'non-existing-user-id',
    })).rejects.toBeInstanceOf(AppError);
  });
});
