import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { FaSearch, FaHome } from 'react-icons/fa'
import * as S from './styled'
import { Movie } from '../../../services/types'
import { searchMovies } from '../../../services/requests'
import { Link } from 'react-router-dom'

interface HeaderProps {
  setSearchedMovies?: Dispatch<SetStateAction<Movie[] | null>>
  goToHomeLink?: boolean
}

const Header: React.FC<HeaderProps> = ({ setSearchedMovies, goToHomeLink }) => {
  const handleSearchMovies = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    if (query.length > 0) {
      searchMovies(query)
        .then(data => setSearchedMovies!!(data.results))
        .catch(error => console.log(error))
    } else {
      setSearchedMovies!!(null)
    }
  }

  return (<S.HeaderWrapper>
    <h1>Rockstar Movies</h1>
    <p>All about your favorite movies ... in one place!</p>
    {setSearchedMovies && <S.SearchWrapper>
      <FaSearch />
      <input type={'search'} onChange={(event => handleSearchMovies(event))} placeholder={'Search for a movie...'} />
    </S.SearchWrapper>}
    {goToHomeLink && <S.GoToHome>
      <Link to={'/'} ><FaHome /> Go to Home</Link>
    </S.GoToHome>}
  </S.HeaderWrapper>)
}

export default Header
