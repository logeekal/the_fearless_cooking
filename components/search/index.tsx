import { debounce } from 'mini-debounce'
import { useRouter } from 'next/router'
import { usePlausible } from 'next-plausible'
import React, {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { getWindow } from 'ssr-window'

import { ApiService } from '../../services/ApiService'
import { AnalyticsEvents, SearchResultType } from '../../types/common'
import Combobox, {
  ComboboxInput,
  ComboboxOption,
  ComboboxOptionList,
} from '../Combobox'
import useKeyPress from '../hooks/use_key_press'
import { useOutsideClickDetector } from '../hooks/use_outside_click_detector'
import { useLayout } from '../layout/use_layout'
import Loader from '../loading'
import {
  comboboxOption,
  comboboxOptionList,
  searchContainer,
  searchInput,
  searchInputContainer,
  searchInputLabel,
  searchLoader,
  searchResultContainer,
  searchResultImage,
  searchStartCTA,
} from './search.css'

const window = getWindow()

//type Props = Record<string, never>

const Search = () => {
  const [apiService] = useState(() => new ApiService())
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const plausible = usePlausible<AnalyticsEvents>()
  const inputRef = useRef<HTMLInputElement>(null)
  const { ref, outSideClick } = useOutsideClickDetector<HTMLDivElement>()

  const { closeSearch } = useLayout()

  const [escapePressed] = useKeyPress('escape')

  useEffect(() => {
    if (!escapePressed) return
    closeSearch()
  }, [escapePressed, closeSearch])

  useEffect(() => {
    if (outSideClick) {
      closeSearch()
    }
  }, [outSideClick, closeSearch])

  const [results, setResults] = useState<Array<SearchResultType>>([])

  const [currentSelected, setCurrentSelected] = useState(-1)

  const urlQueryChangeHandler = useCallback(
    (term: string) => {
      router
        .replace(
          {
            pathname: window.location.pathname,
            query: { q: term },
          },
          undefined,
          { shallow: true }
        )
        .then()
        .catch((err) => console.error(err))
    },
    [router]
  )

  const asyncSearch = useCallback(
    (term: string) => {
      apiService
        .search(term)
        .then((response) => {
          if (Array.isArray(response)) {
            setResults(response)
          } else {
            setResults([])
          }
          setLoading(false)
        })
        .catch(() => console.error('Nothing found'))
    },
    [apiService]
  )

  const onSelectionChange = useCallback((currentSelection: number) => {
    setCurrentSelected(currentSelection)
  }, [])

  const debouncedSearch = useMemo(
    () => debounce(asyncSearch, 200),
    [asyncSearch]
  )

  const onSearchTermChange: KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        const term = e.target.value
        urlQueryChangeHandler(term)
        debouncedSearch(term)
        setLoading(true)
      },
      [debouncedSearch, urlQueryChangeHandler]
    )

  const onSelect = useCallback(
    (currentSelectionIdx: number) => {
      const result = results[currentSelectionIdx]
      router
        .push(result.uri)
        .then()
        .catch((err) => console.error(err))
      plausible('Search', {
        props: {
          uri: result.uri,
          keyword: inputRef.current?.value ?? 'unknown',
        },
      })
    },
    [results, router, plausible]
  )

  useEffect(() => {
    if (inputRef.current) {
      const searchParams = new URLSearchParams(window.location.search)
      if (searchParams.has('q')) {
        const term = searchParams.get('q') as string
        inputRef.current.value = term
        debouncedSearch(term)
      }
    }
  }, [inputRef, debouncedSearch])

  const getStartSearchRender = useCallback(() => {
    return (
      <div className="search__starter">
        <p className={`${searchStartCTA}`}>What do you want to eat today?</p>
        <img
          className={`${searchResultImage}`}
          src={'/images/search_start.png'}
          alt={'please start searching'}
          width={'100%'}
        />
      </div>
    )
  }, [])

  const genNothingFoundRender = useCallback(() => {
    return (
      <div className="search__empty">
        <p className={`${searchStartCTA}`}>
          Oops! looks like we forgot to prepare this dish.
        </p>
        <img
          className={`${searchResultImage}`}
          src={'/images/empty_plate.svg'}
          alt={'Oops! nothing found.'}
          width={'100%'}
        />
      </div>
    )
  }, [])

  const getLoadingRender = useCallback(() => {
    return (
      <div className={`search__loader ${searchLoader}`}>
        <Loader />
      </div>
    )
  }, [])

  const getResultsRender = useCallback(() => {
    if (!inputRef.current) return
    if (results.length === 0) {
      if (inputRef.current.value === '') {
        return getStartSearchRender()
      } else {
        if (loading) {
          //return getLoadingRender()
          return <> </>
        }
        return genNothingFoundRender()
      }
    } else {
      return (
        <ComboboxOptionList className={`${comboboxOptionList}`}>
          {results.map((result, idx) => {
            const selected = idx === currentSelected ? 'selected' : ''
            return (
              <ComboboxOption
                className={`${selected} ${comboboxOption}`}
                key={result.id}
                data-key={result.id}
                data-index={idx}
              >
                <p dangerouslySetInnerHTML={{ __html: result.title }} />
              </ComboboxOption>
            )
          })}
        </ComboboxOptionList>
      )
    }
  }, [
    results,
    currentSelected,
    loading,
    genNothingFoundRender,
    getStartSearchRender,
  ])

  return (
    <div className={`${searchContainer}`} ref={ref}>
      <Combobox onSelectionChange={onSelectionChange} onSelect={onSelect}>
        <div className={`search__input--container ${searchInputContainer}`}>
          <label id="search_input" className={`${searchInputLabel}`}>
            <img
              width="25px"
              height="25px"
              className={'link img img__search'}
              src="/images/search-green.svg"
              alt="search"
            />
          </label>
          <ComboboxInput
            id={'search_input'}
            placeholder={'Search The Fearless Cooking'}
            className={`${searchInput}`}
            type="text"
            ref={inputRef}
            autoFocus
            onChange={onSearchTermChange}
          />
        </div>
        <hr />
        <div className={`search__results ${searchResultContainer}`}>
          {getResultsRender()}
        </div>
      </Combobox>
    </div>
  )
}

export default Search
