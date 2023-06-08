import type { QueryRunner } from '../../index';
import Sport from '../../../db/entities/Sport';
import Section from '../../../db/entities/Section';
import handleTransaction from '../../../db/utils/handleTransaction';

const sport = {
  name: 'Equestrian',
};

const section = {
  title: 'some title',
  description: 'some description',
  eventDate: '2023-06-02 17:13:55.664761',
  address: 'some address',
  image: 'some image',
  sectionSport: sport,
};

const addSportAndSection = async () => {
  return handleTransaction(async (queryRunner: QueryRunner) => {
    const newSport = await queryRunner.manager.save(
      queryRunner.manager.create(Sport, sport),
    );
    section.sectionSport = newSport;
    await queryRunner.manager.save(
      queryRunner.manager.create(Section, section),
    );
  });
};

export default addSportAndSection;
