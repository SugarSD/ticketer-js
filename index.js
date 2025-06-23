const TicketState = {
    Active: 3,
    InProgress: 2,
    Resolved: 1,
    Closed: 0
}

class DefaultStore {
    constructor() {
        this.store = {tickets: []}

        this.addTicket = (data) => {
            this.store.tickets.push(data);
            console.log("Created Ticket:")
            console.log(data);
        }

        this.removeTicket = (id) => {
            let ticketIndex = this.store.tickets.findIndex(e => e.id === id);
            if (ticketIndex >= 0) {
                this.store.tickets.splice(ticketIndex, 1);
                console.log("Deleted Ticket:");
                console.log(id);
            } else {
                console.log(`Ticket with id "${id}" does not exist!`);
            }
        }

        this.updateTicket = (id, data) => {
            let ticketIndex = this.store.tickets.findIndex(e => e.id === id);
            if (ticketIndex >= 0) {
                Object.assign(this.store.tickets[ticketIndex], data);
                console.log("Updated Ticket:")
                console.log(id);
                console.log(data);
            } else {
                console.log(`Ticket with id "${id}" does not exist!`);
            }
        }
    }
}

class Ticketer {
    constructor(store = new DefaultStore, status = TicketState) {
        this.store = store;

        this.createTicket = (id, type, subject, description, state = status.Active) => {
            this.store.addTicket({id, title: type, subject, description, state});
        }

        this.deleteTicket = (id) => {
            this.store.removeTicket(id);
        }

        this.editTicket = (id, data) => {
            this.store.updateTicket(id, data)
        }
    }
}

const lib = {
    Ticketer,
    TicketState
}

module.exports = lib;
