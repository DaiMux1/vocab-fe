import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

export interface ConfirmDeleteDialogProps {
	open: boolean;
	onClose: () => void;
	onDelete: () => void;
}

const ConfirmDeleteDialog = ({
	open,
	onClose,
	onDelete
}: ConfirmDeleteDialogProps) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Xóa</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Bạn có chắc chắn muốn xóa không?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Đóng</Button>
				<Button color="error" variant="contained" onClick={onDelete} autoFocus>
					Xóa
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDeleteDialog;
