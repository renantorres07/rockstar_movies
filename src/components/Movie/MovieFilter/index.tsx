import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { RiMovie2Line, RiSearchLine, RiStarFill } from 'react-icons/ri'
import * as S from './styled'

interface MovieFilterProps {
  currentRating: number
  setCurrentRating: Dispatch<SetStateAction<number>>
  searchIsEnabled: boolean
}

const MovieFilter: React.FC<MovieFilterProps> = ({ currentRating, setCurrentRating, searchIsEnabled }) => {
  const handleClickStar = useCallback((rate: number) => {
    if (rate === currentRating) {
      setCurrentRating(0)
      return
    }
    setCurrentRating(rate)
  }, [currentRating, setCurrentRating])

  const ratingStars = new Array(5).fill(1)

  return (<S.MovieFilterWrapper>
    {searchIsEnabled && <h2><RiSearchLine /> Found Movies: </h2>}
    {(currentRating > 0 && !searchIsEnabled) && <h2><RiStarFill /> Filtered by rating: </h2>}
    {(!searchIsEnabled) && <>
    {currentRating === 0 && <h2><RiMovie2Line /> Most Popular Movies</h2>}
    <div>Filter by rating:
      <S.RatingStarsList>
        {ratingStars.map((star: number, index) => {
          const rate = (index + 1) * 2
          return <li key={index} onClick={() => handleClickStar(rate)}>
            <span className={`fa fa-star ${rate <= currentRating ? 'checked' : null}`} />
          </li>
        })}
      </S.RatingStarsList>
    </div>
    </>}
  </S.MovieFilterWrapper>)
}

export default MovieFilter
