import React from 'react';
import { StyledSearchbar } from './Styled';
import { HiSearch } from 'react-icons/hi';

export const Searchbar = ({ onSubmit }) => {
  return (
    <StyledSearchbar>
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchFormButton">
          <HiSearch size={24} className="SearchFormButtonLabel" />
        </button>

        <input
          className="SearchFormInput"
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </StyledSearchbar>
  );
};
