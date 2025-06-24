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

        this.edit = (ticket) => {
            if (ticket.id === undefined) throw new Error(`Attempted to edit a ticket without passing an ID.`);
            let ticketIndex = this.store.tickets.findIndex(e => e.id === ticket.id);
            if (ticketIndex >= 0) {
                Object.assign(this.store.tickets[ticketIndex], ticket);
            } else {
                throw new Error(`Attempt to edit ticket that couldn't be found with ID: ${ticket.id}`);
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

class TicketerBuilder {
    constructor() {
        this._data = {}

        this.id = (id) => {
            this._data.id = id;
            return this;
        }

        this.type = (type) => {
            this._data.type = type;
            return this;
        }

        this.subject = (subject) => {
            this._data.subject = subject;
            return this;
        }

        this.details = (details) => {
            this._data.details = details;
            return this;
        }

        this.state = (state) => {
            this._data.state = state;
            return this;
        }
    }
}

class Ticketer {
    constructor(store = new DefaultStore, status = TicketState) {
        this.store = store;

        this.createTicket = (ticket) => {
            ticket._data.state ? null : ticket._data.state = TicketState.Active;
            this.store.create(ticket._data);
        }

        this.deleteTicket = (id) => {
            this.store.delete(id);
        }

        this.editTicket = (ticket) => {
            this.store.edit(ticket._data);
        }

        this.readTicket = (id) => {
            return this.store.read(id);
        }
    }
}

const lib = {
    TicketState,
    Ticketer,
    TicketerStore,
    TicketerBuilder
}

module.exports = lib;
