import config from '~/config';
import { lazy } from 'react';

const publicRoutes = [
  {
    path: config.routes.homepage,
    element: lazy(() => import('~/pages/HomePage/HomePage')),
    layout: 'isFooter',
    isMusic: false,
  },
  {
    path: config.routes.rank,
    element: lazy(() => import('~/pages/RankPage')),
    layout: 'noFooter',
    isMusic: false,
  },
  {
    path: config.routes.account,
    element: lazy(() => import('~/pages/AccountPage/Account')),
    layout: 'isFooter',
    isMusic: false,
  },
  {
    path: config.routes.accountedit,
    element: lazy(() => import('~/pages/AccountPage/AccountEdit')),
    layout: 'isFooter',
    isMusic: false,
  },
  {
    path: config.routes.accounteditprofile,
    element: lazy(() => import('~/pages/AccountPage/AccountEditProfile')),
    layout: 'isFooter',
    isMusic: false,
  },
  {
    path: config.routes.music,
    element: lazy(() => import('~/pages/MusicPage/Music')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.musictopic,
    element: lazy(() => import('~/pages/MusicPage/MusicTopic')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.musicrunvideomain,
    element: lazy(() => import('~/pages/MusicPage/RunMusicMain')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.musicrunvideo,
    element: lazy(() => import('~/pages/MusicPage/RunMusic')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.musicrunvideosearch,
    element: lazy(() => import('~/pages/MusicPage/RunMusicSearch')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.video,
    element: lazy(() => import('~/pages/VideoPage/Video')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.videocategory,
    element: lazy(() => import('~/pages/VideoPage/VideoCategory')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.videorunvideo,
    element: lazy(() => import('~/pages/VideoPage/RunVideo')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.history,
    element: lazy(() => import('~/pages/HistoryPage/History')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.historycategory,
    element: lazy(() => import('~/pages/HistoryPage/HistoryCategory')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.historyrun,
    element: lazy(() => import('~/pages/HistoryPage/RunHistory')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.historyrunvideopopular,
    element: lazy(() => import('~/pages/HistoryPage/RunHistoryPopular')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.historyrunseries,
    element: lazy(() => import('~/pages/HistoryPage/RunHistorySeries')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.historyrunsearchmain,
    element: lazy(() => import('~/pages/HistoryPage/RunHistorySearchMain')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.courseware,
    element: lazy(() => import('~/pages/CoursewarePage/Courseware')),
    layout: 'headerNotext',
    isMusic: false,
  },
  {
    path: config.routes.practicelistening,
    element: lazy(() => import('~/pages/PracticeListeningPage/PracticeListening')),
    layout: 'noFooter',
    isMusic: false,
  },
  {
    path: config.routes.register,
    element: lazy(() => import('~/pages/RegisterPage/Register')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.login,
    element: lazy(() => import('~/pages/LoginPage/Login')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.bannerui,
    element: lazy(() => import('~/pages/BannerUIPage/BannerUi')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.privacy,
    element: lazy(() => import('~/pages/Privacy/Privacy')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.privacy2,
    element: lazy(() => import('~/pages/PrivacyPage2/Privacy2')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.userinfo,
    element: lazy(() => import('~/pages/UserInfoPage/UserInfo')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.vocabulary,
    element: lazy(() => import('~/pages/VocabularyPage/Vocabulary')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.grammar,
    element: lazy(() => import('~/pages/GrammarPage/Grammar')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.grammardetail,
    element: lazy(() => import('~/pages/GrammarPage/GrammarDetail')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.grammardetailclass,
    element: lazy(() => import('~/pages/GrammarPage/GrammarDetailClass')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.learning,
    element: lazy(() => import('~/pages/LearningPage/Learning')),
    layout: 'noFooter',
    isMusic: false,
  },
  {
    path: config.routes.conversation,
    element: lazy(() => import('~/pages/ConversationPage/Conversation')),
    layout: 'noFooter',
    isMusic: false,
  },
  {
    path: config.routes.exercise,
    element: lazy(() => import('~/pages/ExercisesPage/Exercises')),
    layout: 'center',
    isMusic: false,
  },
  {
    path: config.routes.process,
    element: lazy(() => import('~/pages/ProcessPage/Process')),
    layout: 'isFooter',
    isMusic: false,
  },
  {
    path: config.routes.productbkt,
    element: lazy(() => import('~/pageintro/ProductPage/ProductPage')),
    layout: 'intro',
    isMusic: false,
  },
  {
    path: config.routes.aboutbkt,
    element: lazy(() => import('~/pageintro/AboutPage/AboutPage')),
    layout: 'intro',
    isMusic: false,
  },
  {
    path: config.routes.helpbkt,
    element: lazy(() => import('~/pageintro/Support/SupportPage')),
    layout: 'intro',
    isMusic: false,
  },
  // Game
  {
    path: config.routes.wordmatchinggame,
    element: lazy(() => import('~/pages/WordMatchingGame/WordMatchingGame')),
    layout: 'game',
    isMusic: true,
  },
  {
    path: config.routes.startwordmatchinggame,
    element: lazy(() => import('~/pages/StartWordMatchingGame/StartWordMatchingGame')),
    layout: 'game',
    isMusic: true,
  },
  {
    path: config.routes.bingogame,
    element: lazy(() => import('~/pages/BingoGame/BingoGame')),
    layout: 'game',
    isMusic: true,
  },
  {
    path: config.routes.dragdropgame,
    element: lazy(() => import('~/pages/DragDropGame/DragDropGame')),
    layout: 'game',
    isMusic: true,
  },
  {
    path: config.routes.startdragdropgame,
    element: lazy(() => import('~/pages/StartDropDragGame/StartDropDragGame')),
    layout: 'game',
    isMusic: true,
  },
  {
    path: config.routes.starttotltalgame,
    element: lazy(() => import('~/pages/StartToltalGame/StartToltalGame')),
    layout: 'game',
    isMusic: true,
  },
  {
    path: config.routes.startbingogame,
    element: lazy(() => import('~/pages/StartBingoGame/StartBingoGame')),
    layout: 'game',
    isMusic: true,
  },
  {
    path: config.routes.startbingogame2,
    element: lazy(() => import('~/pages/StartBingoGame2/StartBingoGame2')),
    layout: 'game',
    isMusic: true,
  },
  // alpha page
  {
    path: config.routes.alphastartpage,
    element: lazy(() => import('~/pages/AlphaPage/AlphaStartPage')),
    layout: 'headerNotext',
  },
  {
    path: config.routes.listalpha,
    element: lazy(() => import('~/pages/ListAlphaPage/ListAlphaPage')),
    layout: 'center',
  },
  {
    path: config.routes.detailalpha,
    element: lazy(() => import('~/pages/AphaDetailPage/AphaDetailPage')),
    layout: 'center',
  },
  // number page
  {
    path: config.routes.numberstartpage,
    element: lazy(() => import('~/pages/NumberStartPage/NumberStartPage')),
    layout: 'headerNotext',
  },
  {
    path: config.routes.listnumber,
    element: lazy(() => import('~/pages/ListNumberPage/ListNumberPage')),
    layout: 'center',
  },
  {
    path: config.routes.detailnumber,
    element: lazy(() => import('~/pages/NumberDetailPage/NumberDetailPage')),
    layout: 'center',
  },
  // color page
  {
    path: config.routes.colorstartpage,
    element: lazy(() => import('~/pages/ColorStartPage/ColorStartPage')),
    layout: 'headerNotext',
  },
  {
    path: config.routes.listcolor,
    element: lazy(() => import('~/pages/ListColorPage/ListColorPage')),
    layout: 'center',
  },
  {
    path: config.routes.detailcolor,
    element: lazy(() => import('~/pages/ColorDetailPage/ColorDetailPage')),
    layout: 'center',
  },
];

export default publicRoutes;
