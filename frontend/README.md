# CoCode Frontend

Frontend for the collaborative code editor, now structured with dedicated layers for:

- `api` (HTTP/socket clients)
- `services` (API operations)
- `hooks` (stateful UI logic)
- `app` (routing bootstrap)

## Updated Structure

```text
src/
	app/
		router.jsx
	api/
		client.js
		socket.js
	auth/
		Login.jsx
		Signup.jsx
	components/
		...
	constants/
		storageKeys.js
	hooks/
		useAuth.js
		useCurrentUser.js
		useRooms.js
		useSocketRoom.js
	Pages/
		Home.jsx
		JoinRoom.jsx
		CodeEditor.jsx
	services/
		ai.service.js
		auth.service.js
		code.service.js
		file.service.js
		room.service.js
		token.service.js
		user.service.js
	utils/
		validation.js
```

## Environment

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Set:

- `VITE_GEMINI_API_KEY`

## Run

```bash
npm install
npm run dev
```
