import { faker } from '@faker-js/faker';

String.prototype.addAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index - 1 + replacement.length);
}

class ErrorsGenerator {
    generateErrors = (user, errorsCount, seed) => {
        faker.seed(seed);
        const errors = Number.parseFloat(errorsCount);
        for (let i = 0; i < errors; i++) {
            if (errors - i < 1) {
                const error = faker.datatype.boolean();
                if (error === false) continue;
            }

            const errorType = faker.helpers.arrayElement(['add', 'swap', 'delete']);
            const dataPart = faker.helpers.arrayElement(['id', 'firstName', 'lastName', 'phone', 'address']);
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
        const addChar = user[dataPart][addIndex] + user[dataPart].substring(getIndex, getIndex + 1).toLowerCase();
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

export default new ErrorsGenerator();