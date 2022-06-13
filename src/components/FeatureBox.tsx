import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
import useStyle from './style';

const style = {
	root: {
		padding: '1.8rem 1.2rem',
		boxShadow: 'var(--box-shadow-2)',
		borderRadius: 'var(--sm-border-radius)',
		cursor: 'pointer',
		backgroundColor: 'var(--bg-color-accent)',
		transition: 'all 0.25s',

		minHeight: '8rem',
		height: '100%',

		'&:hover, &:active': {
			backgroundColor: 'var(--hover-color)'
		},

		[theme.breakpoints.up('sm')]: {
			padding: '2.4rem 1.8rem'
		},

		[theme.breakpoints.up('md')]: {
			minHeight: '18rem'
		}
	},

	icon: {
		width: '4.2rem',
		height: '4.2rem',
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
		letterSpacing: '0.5px',

		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	}
};

FeatureBox.propTypes = {
	imgUrl: PropTypes.string,
	title: PropTypes.string,
	to: PropTypes.string,
	subTitle: PropTypes.string
};

function FeatureBox({
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
	const classes = useStyle();
	return (
		<Link
			href={to}
			sx={theme => ({
				padding: '1.8rem 1.2rem',
				boxShadow: 'var(--box-shadow-2)',
				borderRadius: 'var(--sm-border-radius)',
				cursor: 'pointer',
				backgroundColor: 'var(--bg-color-accent)',
				transition: 'all 0.25s',

				minHeight: '8rem',
				height: '100%',

				'&:hover, &:active': {
					backgroundColor: 'var(--hover-color)'
				},

				[theme.breakpoints.up('sm')]: {
					padding: '2.4rem 1.8rem'
				},

				[theme.breakpoints.up('md')]: {
					minHeight: '18rem'
				}
			})}
			// className={`${classes.root} flex-center--ver w-100`}
		>
			<img className={classes.icon} src={imgUrl} alt="Icon" />
			<div>
				<h2 className={classes.title}>{title}</h2>
				<p className={classes.subTitle}>{subTitle}</p>
			</div>
		</Link>
	);
}