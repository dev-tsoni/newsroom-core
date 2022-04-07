import React from 'react';
import PropTypes from 'prop-types';
import AgendaFeaturedStoriesToogle from './AgendaFeaturedStoriesToogle.jsx';

import ListViewOptions from 'components/ListViewOptions';

function AgendaListViewControls({activeView, setView, hideFeaturedToggle, toggleFeaturedFilter, featuredFilter, featuredItemsCount}) {
    return(
        <div className='content-bar__right'>
            {!hideFeaturedToggle && (featuredItemsCount > 0) && <AgendaFeaturedStoriesToogle onChange={toggleFeaturedFilter} featuredFilter={featuredFilter}/>}
            <ListViewOptions setView={setView} activeView={activeView} />
        </div>
    );
}


AgendaListViewControls.propTypes = {
    activeView: PropTypes.string,
    setView: PropTypes.func.isRequired,
    toggleFeaturedFilter: PropTypes.func.isRequired,
    hideFeaturedToggle: PropTypes.bool,
    featuredFilter: PropTypes.bool,
    featuredItemsCount: PropTypes.number,
};

export default AgendaListViewControls;
