import { connect } from 'react-redux';
import { selectMyChannelUrls } from 'redux/selectors/claims';
import * as SETTINGS from 'constants/settings';
import { doSetPlayingUri } from 'redux/actions/content';
import { doSetClientSetting } from 'redux/actions/settings';
import { selectLanguage, selectClientSetting } from 'redux/selectors/settings';
import { selectUserVerifiedEmail } from 'redux/selectors/user';

import SettingContent from './view';

const select = (state) => ({
  isAuthenticated: selectUserVerifiedEmail(state),
  floatingPlayer: selectClientSetting(state, SETTINGS.FLOATING_PLAYER),
  autoplayMedia: selectClientSetting(state, SETTINGS.AUTOPLAY_MEDIA),
  autoplayNext: selectClientSetting(state, SETTINGS.AUTOPLAY_NEXT),
  hideReposts: selectClientSetting(state, SETTINGS.HIDE_REPOSTS),
  hideScheduledLivestreams: selectClientSetting(state, SETTINGS.HIDE_SCHEDULED_LIVESTREAMS),
  myChannelUrls: selectMyChannelUrls(state),
  instantPurchaseEnabled: selectClientSetting(state, SETTINGS.INSTANT_PURCHASE_ENABLED),
  instantPurchaseMax: selectClientSetting(state, SETTINGS.INSTANT_PURCHASE_MAX),
  enablePublishPreview: selectClientSetting(state, SETTINGS.ENABLE_PUBLISH_PREVIEW),
  language: selectLanguage(state),
});

const perform = (dispatch) => ({
  setClientSetting: (key, value) => dispatch(doSetClientSetting(key, value)),
  clearPlayingUri: () => dispatch(doSetPlayingUri({ uri: null })),
});

export default connect(select, perform)(SettingContent);
