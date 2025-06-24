const TicketState = {
    Active: 3,
    InProgress: 2,
    Resolved: 1,
    Closed: 0
}

const checkType = (called, expected, passed) => {
    if (passed !== expected) {
        throw new Error(`"${called}" expects a ${expected} but got "${passed}" instead.`);
    }
}

class DefaultStore {
    constructor() {
        this.store = {tickets: []}

        this.create = (data) => {
            this.store.tickets.push(data);
        }

        this.delete = (id) => {
            let ticketIndex = this.store.tickets.findIndex(e => e.id === id);
            if (ticketIndex >= 0) {
                this.store.tickets.splice(ticketIndex, 1);
            } else {
                throw new Error(`Attempt to delete ticket that couldn't be found with ID: ${id}`);
            }
        }

        this.edit = (id, data) => {
            let ticketIndex = this.store.tickets.findIndex(e => e.id === id);
            if (ticketIndex >= 0) {
                Object.assign(this.store.tickets[ticketIndex], data);
            } else {
                throw new Error(`Attempt to edit ticket that couldn't be found with ID: ${id}`);
            }
        }

        this.read = (id) => {
            let ticketIndex = this.store.tickets.findIndex(e => e.id === id);
            if (ticketIndex >= 0) {
                return this.store.tickets[ticketIndex];
            } else {
                throw new Error(`Attempt to read ticket that couldn't be found with ID: ${id}`);
            }
        }
    }
}

class TicketerStore {
    constructor() {
        this.create = null;
        this.delete = null;
        this.edit = null;
        this.read = null;

        this.onCreate = (fn) => {
            checkType("TicketerBuilder.onCreate()", "function", typeof fn);
            this.create = fn;
        }

        this.onDelete = (fn) => {
            checkType("TicketerBuilder.onDelete()", "function", typeof fn);
            this.delete = fn;
        }

        this.onEdit = (fn) => {
            checkType("TicketerBuilder.onEdit()", "function", typeof fn);
            this.edit = fn;
        }

        this.onRead = (fn) => {
            checkType("TicketBuilder.onRead()", "function", typeof fn);
            this.read = fn;
        }
    }
}

class Ticketer {
    constructor(store = new DefaultStore, status = TicketState) {
        this.store = store;

        this.createTicket = (id, type, subject, details, state = status.Active) => {
            this.store.create({id, type, subject, details, state});
        }

        this.deleteTicket = (id) => {
            this.store.delete(id);
        }

        this.editTicket = (id, data) => {
            this.store.edit(id, data);
        }

        this.readTicket = (id) => {
            return this.store.read(id);
        }
    }
}

const lib = {
    Ticketer,
    TicketerStore,
    TicketState
}

module.exports = lib;
