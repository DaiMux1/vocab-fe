import Grid from '@mui/material/Grid';
import useScrollTop from './hooks/useScrollTop';
import FeatureBox from './FeatureBox';
import dictionaryIcon from '../assets/icons/dictionary.png';
import favoriteIcon from '../assets/icons/favorite.png';
import flashcardIcon from '../assets/icons/flashcard.png';
import grammarIcon from '../assets/icons/grammar.png';
import ipaIcon from '../assets/icons/ipa.png';
import searchIcon from '../assets/icons/search.png';
import toeicIcon from '../assets/icons/toeic.png';
import { Container } from '@mui/material';

const FEATURE_LIST = [
	{
		title: 'Tạo list',
		subTitle:
			'Tạo list từ vựng phục vụ nhu cầu cá nhân',
		imgUrl: ipaIcon,
		to: '/create-list'
	},
	{
		title: 'List của tôi',
		subTitle: 'Các list từ vựng của bạn đã tạo',
		imgUrl: flashcardIcon,
		to: '/'
	},
	{
		title: 'Tìm kiếm list ',
		subTitle:
			'Tìm kiếm list theo tên và tác giả',
		imgUrl: searchIcon,
		to: '/'
	},
	{
		title: 'List từ vựng yêu thích',
		subTitle: 'List từ vựng mà bạn yêu thích',
		imgUrl: favoriteIcon,
		to: '/'
	},
	{
		title: 'Bảng phiên âm (IPA)',
		subTitle: 'Luyện nghe, phát âm chuẩn với 44 âm trong bảng phiên âm quốc tế IPA',
		imgUrl: toeicIcon,
		to: '/'
	},
	{
		title: 'Từ vựng yêu thích của bạn',
		imgUrl: favoriteIcon,
		subTitle: 'Danh sách những từ vựng yêu thích mà bạn đã lưu',
		to: '/'
	}
];

export function Home() {
	useScrollTop();

	return (
		<div className="container my-10">
			<Container fixed sx={{ marginTop: 2 }}>
				<Grid container spacing={3}>
					{FEATURE_LIST.map((box, index) => (
						<Grid item xs={12} md={6} lg={4} key={index}>
							<FeatureBox
								imgUrl={box.imgUrl}
								title={box.title}
								to={box.to}
								subTitle={box.subTitle}
							/>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
}
