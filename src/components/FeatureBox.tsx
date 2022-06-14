import { Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
// import useStyle from './style';

const style = {
	icon: {
		width: '2.2rem',
		height: '2.2rem',
		marginRight: '1.4rem'
	},

	title: {
		color: 'var(--title-color)',
		fontWeight: 600,
		fontSize: '2rem',
		letterSpacing: '0.5px'
	},

	subTitle: {
		display: 'none',
		marginTop: '0.6rem',
		color: 'var(--label-color)',
		fontSize: '1.4rem',
		fontWeight: 500,
		letterSpacing: '0.5px'

		// [theme.breakpoints.up('sm')]: {
		// 	display: 'block'
		// }
	}
};

export default function FeatureBox({
	to,
	imgUrl,
	title,
	subTitle
}: {
	to: string;
	imgUrl: string;
	title: string;
	subTitle: string;
}) {
	return (
		<Link
			href={to}
			sx={theme => ({
				padding: '1.8rem 1.2rem',
				boxShadow:
					'0px 2px 1px -1px rgba(0,0,0,0.18),0px 1px 6px 0px rgba(0,0,0,0.12),0px 1px 4px 0px rgba(0,0,0,0.08)',
				borderRadius: '4px',
				cursor: 'pointer',
				backgroundColor: '#f1f1f1',
				transition: 'all 0.25s',

				minHeight: '8rem',
				// height: '100%',
				textDecoration: 'none',
				display: 'flex',
				alignItems: 'center',

				'&:hover, &:active': {
					backgroundColor: '#e5e5e5'
				},

				[theme.breakpoints.up('sm')]: {
					padding: '2.4rem 1.8rem'
				},

				[theme.breakpoints.up('md')]: {
					minHeight: '12rem'
				}
			})}
			// className={`${classes.root} flex-center--ver w-100`}
		>
			<Box
				sx={{
					width: '4.2rem',
					height: '4.2rem',
					marginRight: '1.4rem'
				}}
				component="img"
				src={imgUrl}
				alt="Icon"
			></Box>
			<div>
				<h2 className={JSON.stringify(style.title)}>{title}</h2>
				<p className={JSON.stringify(style.subTitle)}>{subTitle}</p>
			</div>
		</Link>
	);
}
