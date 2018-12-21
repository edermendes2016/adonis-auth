'use strict'

const Contact = use('App/Models/Contact');
class ContactController {

    async index({ request, response, view }) {
        let contacts = await Contact.query().with('user').fetch()
        return response.json(contacts)
    }

    async store({ request, response }) {

        const name = request.input('name')
        const email = request.input('email')
        const title = request.input('title')
        const tel = request.input('tel')

        const contact = new Contact()
        contact.name = name
        contact.email = email
        contact.title = title
        contact.tel = tel

        await contact.save()
        return response.json(contact)
    }

    async update ({ params, request, response }) {    
        const name = request.input('name')
        const email = request.input('email')
        const title = request.input('title')
        const tel = request.input('tel')
    
        let contact = await Contact.find(params.id)
    
        contact.name = name
        contact.email = email
        contact.title = title
        contact.tel = tel
        await contact.save()
        return response.json(contact)
    }
    
    async destroy ({ params, request, response }) {
        await Contact.find(params.id).delete()
        return response.json({message: 'Contact deleted!'})
    } 
}

module.exports = ContactController
