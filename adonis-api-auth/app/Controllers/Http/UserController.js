'use strict'

const User = use('App/Models/User');

class UserController {
    async create({ request, response, auth }) {
        const user = await User.create(request.only(['username', 'email', 'password']));

        await auth.login(user);
        return response.redirect('/');
    }

    async login({ request, auth, response, session }) {
        const { email, password } = request.all();

        try {
            await auth.attempt(email, password);
            return response.redirect('/');
        } catch (error) {
            session.flash({ loginError: 'These credentials do not work.' })
            return response.redirect('/api/login');
        }
    }

    async index({ response }) {
        const user = await User.all()
        return response.json(user)
    }
  

    async show({ params, request, response }) {
        let user = await User.find(params.id)
        return response.json(user)
    }


    async update({ params, request, response }) {
        const username = request.input('username')
        const email = request.input('email')
        const password = request.input('password')


        let user = await User.find(params.id)

        user.username = username
        user.email = email
        user.password = password

        await user.save()
        return response.json(user)
    }

    async destroy({ params, request, response }) {
        const user = await User.findOrFail(params.id)

        await user.delete()

        return response.json({ message: 'User deleted!' })
    }
}

module.exports = UserController