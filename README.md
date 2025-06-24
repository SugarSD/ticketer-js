# Ticketer-js
Ticketer-js is a standalone utility library that helps make support (and other) ticket management programs easier to read and write by wrapping all the logic necessary for your ticket systems into a predictable and reusable API.

## Usage
```javascript
const { Ticketer, TicketerBuilder, TicketState } = require("ticketer-js");

//Create a "Ticketer" instance
let ticketer = new Ticketer()

try {
    
    //Create a new ticket
    ticketer.createTicket(new TicketerBuilder()
        .id(1)
        .type("GENERAL")
        .subject("Phone won't start up.")
        .details("Phone won't start up.", "I've been trying to start my phone for the last 8 hours and it just won't turn on for some reason!"));

    //Edit an existing ticket
    ticketer.editTicket(new TicketerBuilder()
        .id(1)
        .type("HARDWARE")
        .state(TicketState.InProgress));
    
    //Read a ticket
    let ticketData = ticketer.readTicket(1);
    console.log(ticketData);
    
    //Delete a ticket
    ticketer.deleteTicket(1)
    
} catch(e) {
    
    //Log any errors that get thrown
    console.log(e);
    
}
```

## Tickets
The `TicketerBuilder` constructor is used to build a new ticket that can be passed into any `Ticketer()` function that requires the `ticket` parameter. Example Usage:

```javascript
const { TicketerBuilder, TicketState } = require("ticketer-js");

//Ticket with all variables
let fullTicket = new TicketerBuilder()
    .id(1)
    .type("FULL")
    .subject("Full ticket example.")
    .details("This is a ticket with every piece of data!")
    .state(TicketState.InProgress)

//Ticket without all variables is still entirely valid
let halfTicket = new TicketBuilder()
    .id(2)
    .type("HALF")
    .details("Meh I didn't feel like filling everything out.")
```
**NOTE: When passing ticket into `Ticketer.createTicket()`, if a state is not defined then it will default to the store's `states.Active`.**

## Storage
The `TicketerStore` constructor is provided to make storage logic more concise. Example Usage:

```javascript
const { Ticketer, TicketerStore } = require("ticketer-js");
    
let myStore = new TicketerStore()
    .onCreate((data) => {
        console.log(`Creating ticket with data:`);
        console.log(data);
        /*Save ticket logic here*/
    })
    .onDelete((id) => {
        console.log(`Deleting ticket with id:`);
        console.log(id);
        /*Delete ticket logic here*/
    })
    .onEdit((data) => {
        console.log(`Editing ticket with data:`);
        console.log(data)
        /*Edit ticket logic here*/
    })
    .onRead((id) => {
        console.log(`Reading ticket with id:`);
        console.log(id)
        /*Read ticket logic here*/
    });
```

### Configuration
To replace the default configuration with your own the `TicketerStore.configure` function is provided. Example Usage:

```javascript
let { TicketerStore } = require("ticketer-js");

let customStates = {
    Active: 4,
    Investigating: 3,
    GettingSupplies: 2,
    Fixing: 1,
    Resolved: 0
}

let myStore = new TicketerStore()
    /*snip from above example*/
    .configure({
        states: customStates
    });
```

**NOTE: If custom states are used there should *ALWAYS* be a `states.Active` as it will be the fallback for the Ticketer in the event that a state is not provided upon creation of a new `ticket`.**