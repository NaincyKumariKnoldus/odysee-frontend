import { connect } from 'react-redux';
import { doFetchLastActiveSubs } from 'redux/actions/subscriptions';
import { selectActiveChannelStakedLevel } from 'redux/selectors/app';
import { selectLastActiveSubscriptions, selectSubscriptions } from 'redux/selectors/subscriptions';
import { doClearClaimSearch } from 'redux/actions/claims';
import { doClearPurchasedUriSuccess } from 'redux/actions/file';
import { selectFollowedTags } from 'redux/selectors/tags';
import { selectUserVerifiedEmail, selectUser } from 'redux/selectors/user';
import { selectHomepageData, selectWildWestDisabled } from 'redux/selectors/settings';
import { doSignOut } from 'redux/actions/app';
import { selectUnseenNotificationCount } from 'redux/selectors/notifications';
import { selectPurchaseUriSuccess } from 'redux/selectors/claims';

import SideNavigation from './view';

const select = (state) => ({
  subscriptions: selectSubscriptions(state),
  lastActiveSubs: selectLastActiveSubscriptions(state),
  followedTags: selectFollowedTags(state),
  email: selectUserVerifiedEmail(state),
  purchaseSuccess: selectPurchaseUriSuccess(state),
  unseenCount: selectUnseenNotificationCount(state),
  user: selectUser(state),
  homepageData: selectHomepageData(state),
  activeChannelStakedLevel: selectActiveChannelStakedLevel(state),
  wildWestDisabled: selectWildWestDisabled(state),
});

export default connect(select, {
  doClearClaimSearch,
  doSignOut,
  doClearPurchasedUriSuccess,
  doFetchLastActiveSubs,
})(SideNavigation);
