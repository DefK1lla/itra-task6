import { faker } from '@faker-js/faker';

String.prototype.addAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index - 1 + replacement.length);
}

class FakesGenerator {
    generateFakes = (locale, userSeed, page, errorsCount) => {
        const seed = +userSeed + +page;
        faker.locale = locale;
        faker.seed(seed);

        let users = [];
        const usersCount = page > 1 ? 10 : 20;

        switch (locale) {
            case 'hy':
                users = this.createHyUser(usersCount, errorsCount);
                break;
            case 'ru':
                users = this.createRuUser(usersCount, errorsCount);
                break;
            default:
                users = this.createUser(usersCount, errorsCount);
                break;
        }

        return users;
    };

    createRuUser = (usersCount, errorsCount) => {
        const users = [];

        for (let i = 0; i < usersCount; i++) {
            const gender = faker.helpers.arrayElement(['male', 'female']);
            const name = faker.name.findName(undefined, undefined, gender).split(' ');

            let user = {
                id: faker.database.mongodbObjectId(),
                firstName: name[0],
                middleName: faker.name.findName(undefined, undefined, 'male').split(' ')[0] + (gender === 'male' ? 'ович' : 'овна'),
                lastName: name[1],
                phone: faker.phone.phoneNumber(),
                address: (faker.datatype.boolean() ? faker.address.state() + ', ' : '') + faker.address.city() + ', ' + faker.address.streetAddress(faker.datatype.boolean()),
            };

            users.push(user);
        }

        for (let i = 0; i < users.length; i++) {
            users[i] = this.generateErrors(users[i], errorsCount);
        }

        return users;
    };

    createHyUser = (usersCount, errorsCount) => {
        const users = [];

        for (let i = 0; i < usersCount; i++) {
            let user = {
                id: faker.database.mongodbObjectId(),
                firstName: faker.name.firstName(),
                middleName: faker.name.firstName('male') + 'ի',
                lastName: faker.name.lastName(),
                phone: faker.phone.phoneNumber(),
                address: (faker.datatype.boolean() ? faker.address.state() + ', ' : '') + faker.address.city() + ', ' + faker.address.streetAddress(faker.datatype.boolean()),
            };

            users.push(user);
        }

        for (let i = 0; i < users.length; i++) {
            users[i] = this.generateErrors(users[i], errorsCount);
        }

        return users;
    };

    createUser = (usersCount, errorsCount) => {
        const users = [];

        for (let i = 0; i < usersCount; i++) {
            let user = {
                id: faker.database.mongodbObjectId(),
                firstName: faker.name.firstName(),
                middleName: faker.name.middleName(),
                lastName: faker.name.lastName(),
                phone: faker.phone.phoneNumber(),
                address: (faker.datatype.boolean() ? faker.address.state() + ', ' : '') + faker.address.city() + ', ' + faker.address.streetAddress(faker.datatype.boolean()),
            };

            users.push(user);
        }

        for (let i = 0; i < users.length; i++) {
            users[i] = this.generateErrors(users[i], errorsCount);
        }

        return users;
    };

    generateErrors = (user, errorsCount) => {
        for (let i = 0; i < errorsCount; i++) {
            if (errorsCount - i < 1) {
                const error = faker.datatype.boolean();
                console.log(error)
                if (error === false) continue;
            }

            const errorType = faker.helpers.arrayElement(['add', 'swap', 'delete']);
            const dataPart = faker.helpers.arrayElement(['id', 'firstName', 'middleName', 'lastName', 'phone', 'address']);
            const max = user[dataPart].length - 1;

            switch (errorType) {
                case 'add':
                    user = this.addChar(user, dataPart, max);
                    break;

                case 'swap':
                    user = this.swapChars(user, dataPart, max);
                    break;

                case 'delete':
                    if (max > 0) user = this.deleteChar(user, dataPart, max);

                default:
                    break;
            }
        }

        return user;
    };

    addChar = (user, dataPart, max) => {
        const addIndex = faker.datatype.number(max);
        const getIndex = faker.datatype.number(max);
        const addChar = user[dataPart][addIndex] + user[dataPart].substring(getIndex, getIndex + 1);
        user[dataPart] = user[dataPart].addAt(addIndex, addChar);
        return user;
    };

    swapChars = (user, dataPart, max) => {
        const firstIndex = faker.datatype.number(max);
        const secondIndex = faker.datatype.number(max);
        const data = user[dataPart].split('')

        let temp = data[firstIndex];
        data[firstIndex] = data[secondIndex];
        data[secondIndex] = temp;

        user[dataPart] = data.join('');
        return user;
    };

    deleteChar = (user, dataPart, max) => {
        const deleteIndex = faker.datatype.number(max);

        user[dataPart] = user[dataPart].slice(0, deleteIndex) + user[dataPart].slice(deleteIndex + 1);

        return user;
    };
}
export default new FakesGenerator();