import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export interface ConfirmEditDialogProps {
	open: boolean;
	onClose: () => void;
	onEdit: (newName: string) => void;
}

const ConfirmEditDialog = ({
	open,
	onClose,
	onEdit
}: ConfirmEditDialogProps) => {
	const [newName, setNewName] = useState('');

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Chỉnh sửa tên list</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					sx={{ marginRight: 2 }}
					label="Tên mới của list"
					id="newList"
					name="newList"
					value={newName}
					onChange={e => setNewName(e.target.value)}
				></TextField>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Đóng</Button>
				<Button
					color="error"
					variant="contained"
					onClick={() => onEdit(newName)}
					autoFocus
					disabled={!newName}
				>
					Edit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmEditDialog;
