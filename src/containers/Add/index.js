import { connect } from 'react-redux';

import { handleAddFriends, modifyIdFriend } from 'src/actions/friends';

import Add from 'src/components/Friends/Add';

// connection de props en lecture sur le state
// ces props seront des tableaux, objets, booléens, numériques, string
const mapStateToProps = (state, ownProps) => ({
    friends: state.friends.list,
});

// connection de props fonctions qui déclenchent des actions
// ces props seraont des fonctions
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleAdd: (id) => {
        dispatch(modifyIdFriend(id))
        setTimeout(() => {
            dispatch(handleAddFriends());
        console.log('ami ajouté', id)
        }, 500)
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);