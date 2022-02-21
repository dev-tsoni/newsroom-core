import React from 'react';
import PropTypes from 'prop-types';
import {get} from 'lodash';

import {gettext} from 'utils';
import {isTouchDevice} from '../utils';
import NotificationListItem from './NotificationListItem';

class NotificationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {displayItems: false};

        this.toggleDisplay = this.toggleDisplay.bind(this);
    }

    componentDidMount() {
        if ( !isTouchDevice() ) {
            this.elem && $(this.elem).tooltip && $(this.elem).tooltip();
        }
    }

    componentWillUnmount() {
        this.elem && $(this.elem).tooltip && $(this.elem).tooltip('dispose'); // make sure it's gone
    }

    componentDidUpdate(prevProps) {
        if (this.state.displayItems && this.props.count !== prevProps.count) {
            this.props.loadNotifications();
        }
    }

    toggleDisplay() {
        this.setState({displayItems:!this.state.displayItems});
        if (!this.state.displayItems) {
            this.props.loadNotifications();
            document.getElementById('header-notification').classList.add('notif--open');
        } else {
            document.getElementById('header-notification').classList.remove('notif--open');
        }
    }

    render() {
        return (
            <div className="badge--top-right">
                <h3 className="a11y-only">Notification Bell</h3>
                {this.props.count > 0 &&
                    <div className="badge badge-pill badge-info badge-secondary">
                        {this.props.count}
                    </div>
                }

                <span
                    className="notif__circle"
                    ref={(elem) => this.elem = elem}
                    title={gettext('Notifications')}>
                    <h3 className="a11y-only">Notification bell</h3>
                    <i className='icon--alert icon--white' onClick={this.toggleDisplay} />
                </span>

                {!this.state.displayItems ? null : this.props.count === 0 ? (
                    <div className="notif__list">
                        <div className='notif__list__header d-flex'>
                            <span className='notif__list__header-headline ml-3'>{gettext('Notifications')}</span>
                        </div>
                        <div className='notif__list__message'>
                            {gettext('No new notifications!')}
                        </div>
                    </div>
                ) : (
                    <div className="notif__list">
                        <div className='notif__list__header d-flex'>
                            <span className='notif__list__header-headline ml-3'>{gettext('Notifications')}</span>
                            <button
                                type="button"
                                className="button-pill ml-auto mr-3"
                                onClick={this.props.clearAll}>{gettext('Clear All')}
                            </button>
                        </div>
                        {this.props.loading ? (
                            <div className='notif__list__message'>
                                {gettext('Loading...')}
                            </div>
                        ) : (
                            this.props.notifications.map((notification) => (
                                <NotificationListItem
                                    key={get(this.props.items, `${notification.item}._id`, 'test')}
                                    item={get(
                                        this.props.items,
                                        `${notification.item}`,
                                        get(notification, 'data.item', {})
                                    )}
                                    notification={notification}
                                    clearNotification={this.props.clearNotification}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        );
    }
}

NotificationList.propTypes = {
    items: PropTypes.object,
    count: PropTypes.number,
    notifications: PropTypes.array,
    clearNotification: PropTypes.func,
    clearAll: PropTypes.func,
    loadNotifications: PropTypes.func,
    loading: PropTypes.bool,
};

export default NotificationList;
