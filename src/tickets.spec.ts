import { TicketAdvisor } from './tickets';

describe('Test ticket advisor', () => {
    it('Instantiate class', () => {
        const ticketAdvisor = new TicketAdvisor([]);
        expect(ticketAdvisor instanceof TicketAdvisor).toBeTruthy();
    });
});
