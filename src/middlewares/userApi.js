import axios from 'axios';
import { toast } from 'react-toastify'

import { LOGIN, 
  saveUser, 
  SUBMIT, 
  saveUserRegistration, 
  MODIFY, 
  saveModifyUser,
  saveUserFriends,f
} from 'src/actions/user';

import { LOAD_RECIPES_FROM_API, 
  saveRecipes, 
  LOAD_RECIPES_FROM_API_PRIVATE, 
  saveRecipesPrivate, 
  ADD_NEW_RECIPE, 
  saveModifyRecipe,
  DELETE_RECIPE_ALL, 
  deleteARecipe,
  ADD_MODIFY_RECIPE,
  modifyARecipe,
  // MODIFY_A_RECIPE,
} from 'src/actions/recipes';

import {  LOAD_FRIENDS_FROM_API,
  saveFriends,
  HANDLE_ADD_FRIENDS,
  HANDLE_DELETE_FRIENDS, 
 } from 'src/actions/friends';

const api = axios.create({
  baseURL: 'http://ec2-35-175-104-202.compute-1.amazonaws.com/api/',
});

export default (store) => (next) => (action) => {
  switch(action.type) {
    
    case LOGIN: {
     
      const state = store.getState();
      const { username, password, pseudonym, id, friends, avatar } = state.user;

      api
        .post(
          'login_check',
          {
            id,
            username,
            password,
            pseudonym,
            friends,
            avatar,
          },
        )
        .then((response) => {
          const userData = response.data;
          console.log(userData);
          api.defaults.headers.common.Authorization = `Bearer ${userData.token}`;

          store.dispatch(saveUser(userData));

          toast.success('🦄 Connexion réussie !', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    
      })
      .catch(function(error) {
        console.log('erreur', error);

        toast.error('Vous êtes pas inscrits !', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
    
        });
      });
      next(action);
      break;
    }
    
    case SUBMIT: { 
      const state = store.getState();
      console.log(state.user)
      const { email, password, status, pseudonym } = state.user;

      api
        .post('/v1/public/users',
          {
            email,
            password,
            status,
            pseudonym,
          },
        )
        .then((response) => {
          console.log(response);

          const userData = response.data;
          console.log(userData);
          api.defaults.headers.common.Authorization = `Bearer ${userData.token}`;

          store.dispatch(saveUserRegistration(userData));

          toast.success('L\'inscription c\'est bien passée !', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
      
          });
      })
    }

    case MODIFY: { 
      const state = store.getState();
      const { id, email, password, status, pseudonym } = state.user;
      console.log(state.user)
     
      api
        .put(`v1/private/users/${id}`,
          {
            email,
            password,
            status,
            pseudonym,
          },
        )
        .then((response) => {
          console.log(response);

          const userData = response.data;
          console.log(userData);
          api.defaults.headers.common.Authorization = `Bearer ${userData.token}`;

          store.dispatch(saveModifyUser(userData));

          toast.success('🦄 Mise à jour réussie !', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
      });
      next(action);
      break;
    }

    case LOAD_RECIPES_FROM_API: {
      api
      .get(
        'v1/public/recipes',
        )
        .then((response) => {

          const recipes = response.data;
          console.log(recipes);
          
          store.dispatch(saveRecipes(recipes));
        });
        next(action);
        break;
    }

    case LOAD_RECIPES_FROM_API_PRIVATE: {
      api
      .get(
        'v1/private/recipes',
        )
        .then((response) => {
         
          const recipes = response.data;
          console.log(recipes);
          
      
          store.dispatch(saveRecipesPrivate(recipes));
        });
        next(action);
        break;
     }

     case ADD_NEW_RECIPE: { 
      const state = store.getState();
      const { title, description, status, ingredients, instructions, category } = state.recipes;
      console.log(state.recipes)

      api
        .post(`/v1/private/recipes`,
          {
            title,
            description,
            status,
            ingredients,
            instructions,
            category
          },
        )
        .then((response) => {
          console.log(response);

          const recipe = response.data;
          console.log(recipe);
          // api.defaults.headers.common.Authorization = `Bearer ${userData.token}`;

          store.dispatch(saveModifyRecipe(recipe));

          toast.success('🦄 Recette ajoutée !', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
      });
      next(action);
      break;
    }

    case DELETE_RECIPE_ALL: { 
      
      const state = store.getState();
      const {id} = state.recipes;
      console.log(id);

      api
        .delete(`/v1/private/recipes/${id}`)      
        .then((response) => {
          
          console.log(response);

          const recipe = response.data;
          // api.defaults.headers.common.Authorization = `Bearer ${userData.token}`;

          store.dispatch(deleteARecipe(recipe));

          toast.error('La recette a été supprimée !', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
      
          });
      });
      next(action);
      break;
    }

    case ADD_MODIFY_RECIPE: { 
      const state = store.getState();
      const { id, title, description, status, ingredients, instructions, category } = state.recipes;
      console.log(state.recipes)

      api
        .put(`/v1/private/recipes/${id}`,
          {
            title,
            description,
            status,
            ingredients,
            instructions,
            category
          },
        )
        .then((response) => {
          console.log(response);
          
          const recipe = response.data;
          console.log(recipe);
          // api.defaults.headers.common.Authorization = `Bearer ${userData.token}`;

          store.dispatch(modifyARecipe(recipe));

          toast.success('🦄 Recette modifiée !', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
      })
      .catch(function(error) {
        console.log('erreur', error);

        toast.error('Veuillez remplir tous les champs !', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
    
        });
      });
      next(action);
      break;
    }

    case LOAD_FRIENDS_FROM_API: { 
     
      api
        .get(`v1/private/users`)
        .then((response) => {
          console.log(response);

          const userDataFriends = response.data;
          console.log(userDataFriends);
          // api.defaults.headers.common.Authorization = `Bearer ${userData.token}`;

          store.dispatch(saveFriends(userDataFriends));

      });
      next(action);
      break;
    }

    case HANDLE_ADD_FRIENDS: { 
      const state = store.getState();
      // console.log(state.user)
      const { id } = state.user;
      const { friend } = state.friends;
      // console.log(state.friends);

      api
        .post(`http://ec2-35-175-104-202.compute-1.amazonaws.com/api/v1/private/users/${id}/friend`,
          {
            friend,
          },
        )
        .then((response) => {
          console.log(response);

          const userData = response.data;
          console.log(userData);
         

          store.dispatch(saveUserFriends(userData));
      })
      next(action);
      break;
    }


    case HANDLE_DELETE_FRIENDS: { 

      const state = store.getState();
      console.log(state.user)
      const { id, friends } = state.user;
      const { friendToRemove } = state.friends;
      console.log(state.friends);

      api
      .post(`http://ec2-35-175-104-202.compute-1.amazonaws.com/api/v1/private/users/${id}/friend`,
          {
            friendToRemove,
            friends,
          },
        )
        .then((response) => {
          
          const userData = response.data;
          console.log(userData);

          store.dispatch(saveUserFriends(userData));

      })
      next(action);
      break;
    }

    default:
      console.log('auth');
      next(action);
    }
};
