import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as faker from 'faker';
import * as moment from 'moment';

@Injectable()
export class UsersService {
  private statuses = ['pending', 'paid', 'draft'];
  private paymentTermsOptions = [1, 7, 14, 30];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}


  async generateUsers() {
    try {
      console.log('Generating 7 users...');
      const users = [];
      for (let i = 1; i <= 7; i++) {
        const userId = this.generateCustomUserId();
        const fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const date = `Due ${this.randomDateIn2024().format('DD MMM YYYY')}`;
        const paymentTerms = this.randomPaymentTerms();
        const description = this.generateRandomDescription();
        const status = this.randomStatus();


        const billFrom = {
          streetAddress: faker.address.streetAddress(),
          city: faker.address.city(),
          postCode: faker.address.zipCode(),
          country: faker.address.country(),
        };

        const billTo = {
          name: fullName,
          email: faker.internet.email(),
          streetAddress: faker.address.streetAddress(),
          city: faker.address.city(),
          postCode: faker.address.zipCode(),
          country: faker.address.country(),
        };


        const items = [
          this.generateItem(),
          this.generateItem(),
        ];

        const total = items.reduce((sum, item) => sum + item.total, 0);

        users.push({
          userId,
          fullName,
          date,
          paymentTerms,
          description,
          status,
          billFrom,
          billTo,
          items,
          total,
        });
      }

      await this.userModel.insertMany(users);
      console.log('7 users have been generated and saved to the database.');
    } catch (error) {
      console.error('Error generating users:', error);
      throw new InternalServerErrorException('Failed to generate users.');
    }
  }


  async findAll(page: number = 1, limit: number = 100) {
    const skip = (page - 1) * limit;

    const users = await this.userModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    const totalCount = await this.userModel.countDocuments();

    return {
      totalItems: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      users,
    };
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ userId: id }).exec();
  }

  async create(createUserDto: Partial<User>) {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }


  async update(id: string, updateUserDto: Partial<User>) {
    await this.userModel.updateOne({ userId: id }, { $set: updateUserDto }).exec();
    return await this.findOne(id);
  }


  async remove(id: string) {
    const userToDelete = await this.userModel.findOne({ userId: id }).exec();
    if (!userToDelete) {
      throw new InternalServerErrorException(`User with ID ${id} not found.`);
    }

    await this.userModel.deleteOne({ userId: id }).exec();
    return { message: `User ${id} has been removed` };
  }


  async deleteAllUsers() {
    try {
      await this.userModel.deleteMany({});
      return { message: 'All users have been deleted successfully.' };
    } catch (error) {
      console.error('Error deleting all users:', error);
      throw new InternalServerErrorException('Failed to delete all users.');
    }
  }


  private generateItem() {
    const name = faker.commerce.productName();
    const price = parseFloat(faker.commerce.price(1, 1000));
    const quantity = faker.datatype.number({ min: 1, max: 10 });
    return {
      name,
      price,
      quantity,
      total: price * quantity,
    };
  }


  private generateRandomDescription(): string {
    return faker.lorem.words(faker.datatype.number({ min: 2, max: 5 }));
  }


  private generateCustomUserId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = letters.charAt(Math.floor(Math.random() * 26)) + letters.charAt(Math.floor(Math.random() * 26));
    const randomNumbers = Math.floor(1000 + Math.random() * 9000).toString();
    return `#${randomLetters}${randomNumbers}`;
  }


  private randomDateIn2024(): moment.Moment {
    const start = moment('2024-01-01');
    const end = moment('2024-12-31');
    return moment(start.valueOf() + Math.random() * (end.valueOf() - start.valueOf()));
  }


  private randomPaymentTerms(): number {
    return this.paymentTermsOptions[Math.floor(Math.random() * this.paymentTermsOptions.length)];
  }


  private randomStatus(): string {
    return this.statuses[Math.floor(Math.random() * this.statuses.length)];
  }
}
