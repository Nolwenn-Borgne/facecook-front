import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import List from 'src/containers/List';

import './friends.scss';

const Friends = ({loadFriends, friendsUser}) => { 
  useEffect(
    loadFriends,
    [],
  );
  
  
  return (

    <div className="friends">
    
      <List friends={friendsUser}/>
  
    </div>
  );
};
Friends.propTypes = {
  loadFriends: PropTypes.func.isRequired,
}

export default Friends;
