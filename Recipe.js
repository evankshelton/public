import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as recipeService from '../services/recipe.js';

// Styled components
const RecipeCard = styled.div`
  width: 200px;
  height: 400px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const RecipeContent = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const RecipeName = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
`;

const RecipeDescription = styled.p`
  margin: 0 0 8px;
  font-size: 14px;
  color: #666;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const RecipeRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Star = styled.span`
  color: ${props => props.filled ? '#ffc107' : '#e0e0e0'};
  font-size: 18px;
`;

const RecipeReview = styled.p`
  margin: 0;
  font-size: 12px;
  font-style: italic;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Recipe component
const Recipe = ({ recipe }) => {
  const { name, description, image, rating, review } = recipe;

  // Handle click event
  const handleClick = () => {
    recipeService.logRecipe(recipe);
  };

  return (
    <RecipeCard onClick={handleClick}>
      <RecipeImage src={image} alt={name} />
      <RecipeContent>
        <RecipeName>{name}</RecipeName>
        <RecipeDescription>{description}</RecipeDescription>
        <RecipeRating>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} filled={star <= rating}>
              ★
            </Star>
          ))}
        </RecipeRating>
        <RecipeReview>{review}</RecipeReview>
      </RecipeContent>
    </RecipeCard>
  );
};

// PropTypes for type checking
Recipe.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipe;