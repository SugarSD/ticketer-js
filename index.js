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
    constructor(store = new DefaultStore, statuses = TicketState) {
        this.store = store;

        this.createTicket = (id, type, subject, description, state = TicketState.Active) => {
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

const exports = {
    Ticketer,
    TicketState
}

export default exports;

//Test

let ticketer = new Ticketer();

ticketer.createTicket("1", "PHONE", "Phone won't start up.", "I've been trying to start my phone for the last 8 hours and it just won't turn on for some reason!");
ticketer.editTicket("1", {type: "PC", state: TicketState.InProgress});
ticketer.deleteTicket("1");
