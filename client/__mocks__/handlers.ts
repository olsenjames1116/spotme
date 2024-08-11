import { HttpResponse, http } from 'msw';

export const handlers = [
	http.get('http://localhost:3000/users', () => {
		return HttpResponse.json({ username: 'testUser', balance: 100 });
	}),
];
