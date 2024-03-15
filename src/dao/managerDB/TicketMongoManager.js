import { ticketModel } from "../models/ticket.model.js";

export class TicketMongoManager {

    async getTickets() {
        try {
            const tickets = await ticketModel.find();
            return tickets;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getTicketById(id) {
        try {
            const ticket = await ticketModel.findOne({_id : id});
            return ticket;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async addTicket (ticket) {
        try {
            const addedTicket = await ticketModel.create(ticket)
            return addedTicket;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}