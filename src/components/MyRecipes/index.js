import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import RecipesPrivate from 'src/containers/RecipesPrivate';

import './my-recipes.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

const MyRecipes = ({loadRecipesPrivate}) => {
  useEffect(
    loadRecipesPrivate,
    [],
  );

  return (
    
        <RecipesPrivate />
   
  );
};

MyRecipes.propTypes = {
  loadRecipesPrivate: PropTypes.func.isRequired,
}

export default MyRecipes;
