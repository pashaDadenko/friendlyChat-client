import React from 'react';
import ReactDOM from 'react-dom/client';
import { Chat } from './components/Chat/Chat';
import { Login } from './components/Login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './root/main.module.scss';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
	},
	{
		path: '/chat',
		element: <Chat />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
