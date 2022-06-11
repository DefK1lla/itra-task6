import FakesGenerator from "../fakesGenerator/fakesGenerator.js";

class UsersController {
    get = (request, response) => {
        try {
            const { page, seed, locale, errorsCount } = request.query;

            if (page === 0) return response.status(404).json({ message: 'Not found' });

            const users = FakesGenerator.generateFakes(locale, +seed, +page, errorsCount);

            response.json({ users });
        } catch (e) {
            console.log(e);
            response.status(500).json({ message: 'Server error' });
        }
    };
}

export default new UsersController();