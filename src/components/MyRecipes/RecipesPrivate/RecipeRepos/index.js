import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './recipeRepos.scss';

import cook from 'src/assets/image-fonds.png';

const RecipeRepo = ({title, category, slug, image}) => (
  <>

  <div className="recipes-cards">
    <Card>
    <Image src={`http://ec2-35-175-104-202.compute-1.amazonaws.com/images/recipes/${image}`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>
        <NavLink
            className="recipe-repo__link"
            to={`recette-perso/${slug}`}
          >
            {title}
          </NavLink>
      </Card.Header>
    </Card.Content>
    <Card.Meta>
        <span className='category-recipe'>{category['name']}</span>
    </Card.Meta>
  </Card>

 
  </div>

   
</>


);

RecipeRepo.propTypes = {
  title: PropTypes.string.isRequired,
  // category: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}

export default RecipeRepo;
