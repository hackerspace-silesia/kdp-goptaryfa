import { TicketAdvisor } from './tickets';

describe('Test ticket advisor', () => {
    it('Instantiate class', () => {
        const ticketAdvisor = new TicketAdvisor('selectorTimeTable');
        expect(ticketAdvisor instanceof TicketAdvisor).toBeTruthy();
    });
});
