import { Link } from 'react-router-dom';
import { FormValues } from './TypeLogin';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';

import styles from './Login.module.scss';

const FIELDS = {
	NAME: 'name',
	ROOM: 'room',
};

export const Login: FC = () => {
	const { NAME, ROOM } = FIELDS;

	const [values, setValues] = useState<FormValues>({ [NAME]: '', [ROOM]: '' });

	const handleCHange = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [name]: value });
	};

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		const isDisabled = Object.values(values).some((value) => !value);
		if (isDisabled) event.preventDefault();
	};

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>
				welcome to <br /> FRENDLY CHAT
			</h1>

			<form className={styles.form}>
				<input className={styles.input} type='text' name='room' placeholder='название комнаты' value={values[ROOM]} autoComplete='off' required onChange={handleCHange} />
				<input className={styles.input} type='text' name='name' placeholder='никнейм' value={values[NAME]} autoComplete='off' required onChange={handleCHange} />

				<Link to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`} onClick={handleClick}>
					<button className={styles.button} type='submit'>
						войти
					</button>
				</Link>
			</form>
		</div>
	);
};
