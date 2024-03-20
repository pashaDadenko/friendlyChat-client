import { FC } from 'react';
import { MessagesProps } from './TypeMessages';

import styles from './Messages.module.scss';

export const Messages: FC<MessagesProps> = ({ messages, name }) => {
	return (
		<div className={styles.wrapper}>
			{messages.map(({ user, message }, i) => {
				const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
				const isAdmin = user.name.trim().toLowerCase() === 'админ';
				const className = itsMe ? styles.me : isAdmin ? `${styles.user} ${styles.admin}` : styles.user;

				return (
					<div key={i} className={`${styles.wrap} ${className}`}>
						<div className={styles.user}>{user.name}</div>
						<div className={styles.text}>{message}</div>
					</div>
				);
			})}
		</div>
	);
};
