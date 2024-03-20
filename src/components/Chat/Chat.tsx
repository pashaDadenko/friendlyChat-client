import { IoSend } from 'react-icons/io5';
import { Socket, io } from 'socket.io-client';
import { Messages } from '../Messages/Messages';
import { GiDiamondsSmile } from 'react-icons/gi';
import { ChatMessage, SearchParams } from './TypeChat';
import { useLocation, useNavigate } from 'react-router-dom';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { ChangeEvent, FC, FormEvent, MouseEventHandler, useEffect, useState } from 'react';

import styles from './Chat.module.scss';

export const Chat: FC = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const [state, setState] = useState<ChatMessage[]>([]);
	const socket: Socket = io('http://localhost:5000');
	const [params, setParams] = useState<SearchParams>({ room: '', user: '' });
	const [message, setMessage] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [users, setUsers] = useState<number>(0);

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setParams(searchParams);
		socket.emit('join', searchParams);
	}, [search]);

	useEffect(() => {
		socket.on('message', ({ data }: { data: ChatMessage }) => {
			setState((prevState) => [...prevState, data]);
		});
	}, []);

	useEffect(() => {
		socket.on('room', ({ data: { users } }) => {
			setUsers(users.length);
		});
	}, []);

	const outClick = () => {
		socket.emit('leftRoom', { params });
		navigate('/');
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!message) return;
		socket.emit('sendMessage', { message, params });
		setMessage('');
	};

	const onEmojiClick = ({ emoji }: EmojiClickData) => {
		setMessage(`${message} ${emoji}`);
		setIsOpen(false);
	};

	const iconClick: MouseEventHandler<SVGElement> = (event) => handleSubmit(event as unknown as FormEvent<HTMLFormElement>);

	const inputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setMessage(value);

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.title}>{params?.room}</div>
				<div className={styles.users}>{users} человек в комнате</div>
				<button className={styles.button} onClick={outClick}>
					выйти
				</button>
			</div>

			<Messages messages={state} name={params.name} />

			<form className={styles.form} onSubmit={handleSubmit}>
				<input className={styles.input} type='text' name='message' placeholder='введите сообщение' value={message} autoComplete='off' required onChange={inputChange} />

				<div className={styles.wrap}>
					{!isOpen && <GiDiamondsSmile onClick={() => setIsOpen(!isOpen)} className={styles.icon} />}
					{isOpen && <EmojiPicker onEmojiClick={onEmojiClick} className={styles.emojies} />}
					{!isOpen && <IoSend onClick={iconClick} className={styles.icon} />}
				</div>
			</form>
		</div>
	);
};
