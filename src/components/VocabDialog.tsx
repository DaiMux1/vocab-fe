import { Vocab } from '../types/list';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

export interface VocabEditDialogProps {
	open: boolean;
	oldVocab: Vocab | undefined;
	onClose: () => void;
	onEdit: (newVocab: Vocab) => void;
}

function VocabDialog({
	open,
	oldVocab,
	onClose,
	onEdit
}: VocabEditDialogProps) {
	const [newVocab, setNewVocab] = useState<Vocab>({
		word: '',
		meaning: '',
		example: ''
	});

	useEffect(() => {
		setNewVocab(
			oldVocab
				? oldVocab
				: {
						word: '',
						meaning: '',
						example: ''
				  }
		);
	}, [oldVocab]);
	console.log(newVocab);

	const handleChange = (
		evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const name = evt.target.name;
		const newValue = evt.target.value;
		setNewVocab({ ...newVocab, ...{ [name]: newValue } });
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Chỉnh sửa từ vựng</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					sx={{ marginRight: 2 }}
					label=" Từ vựng "
					id="newLwordist"
					name="word"
					value={newVocab.word}
					onChange={handleChange}
				/>
				<TextField
					autoFocus
					margin="dense"
					sx={{ marginRight: 2 }}
					label="Nghĩa của từ"
					id="meaning"
					name="meaning"
					value={newVocab.meaning}
					onChange={handleChange}
				/>
				<TextField
					autoFocus
					margin="dense"
					sx={{ marginRight: 2 }}
					label="Ví dụ"
					id="newList"
					name="example"
					onChange={handleChange}
					value={newVocab.example}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Đóng</Button>
				<Button
					color="error"
					variant="contained"
					onClick={() => onEdit(newVocab)}
					disabled={
						newVocab.word === oldVocab?.word &&
						newVocab.meaning === oldVocab?.meaning &&
						newVocab.example === oldVocab?.example
					}
				>
					Edit
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default VocabDialog;
