import Grid from '@mui/material/Grid';
import useScrollTop from './hooks/useScrollTop';
import FeatureBox from './FeatureBox';
import dictionaryIcon from '../assets/icons/dictionary.png';
import favoriteIcon from '../assets/icons/favorite.png';
import flashcardIcon from '../assets/icons/flashcard.png';
import grammarIcon from '../assets/icons/grammar.png';
import ipaIcon from '../assets/icons/ipa.png';
import toeicIcon from '../assets/icons/toeic.png';
import { Container } from '@mui/material';

const FEATURE_LIST = [
	{
		title: 'Bảng phiên âm (IPA)',
		subTitle:
			'Luyện nghe, phát âm chuẩn với 44 âm trong bảng phiên âm quốc tế IPA',
		imgUrl: ipaIcon,
		to: '/'
	},
	{
		title: '1000+ câu giao tiếp',
		subTitle: 'Luyện nghe, nói câu tiếng Anh giao tiếp hàng ngày cùng Dyno',
		imgUrl: grammarIcon,
		to: '/'
	},
	{
		title: 'Từ vựng với Flashcard',
		subTitle:
			'Flashcard phương pháp học từ vựng nổi tiếng. Nay hoàn toàn miễn phí trên Dynonary',
		imgUrl: flashcardIcon,
		to: '/'
	},
	{
		title: 'Từ điển trong Dynonary',
		subTitle: 'Danh sách từ vựng được phân loại theo cấp độ, loại từ, ...',
		imgUrl: dictionaryIcon,
		to: '/'
	},
	{
		title: 'Từ vựng TOEIC',
		subTitle: 'Các từ vựng thường gặp trong đề thi Toeic',
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
