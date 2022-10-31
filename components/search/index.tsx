import { debounce } from 'mini-debounce'
import { useRouter } from 'next/router'
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
import { SearchResultType } from '../../types/common'
import Combobox, {
  ComboboxInput,
  ComboboxOption,
  ComboboxOptionList,
} from '../Combobox'
import { useOutsideClickDetector } from '../hooks/use_outside_click_detector'
import { useLayout } from '../layout/use_layout'
import {
  comboboxOption,
  comboboxOptionList,
  searchContainer,
  searchInput,
  searchInputContainer,
} from './search.css'

const window = getWindow()

//type Props = Record<string, never>

const Search = () => {
  const [apiService] = useState(() => new ApiService())
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  const { ref, outSideClick } = useOutsideClickDetector<HTMLDivElement>()

  const { closeSearch } = useLayout()

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
    },
    [results, router]
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

  return (
    <div className={`${searchContainer}`} ref={ref}>
      <Combobox onSelectionChange={onSelectionChange} onSelect={onSelect}>
        <div className={`search__input--container ${searchInputContainer}`}>
          <label id="search_input">🔎</label>
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
        <div className={'search__results'}>
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
                  <p>#</p>
                  <p dangerouslySetInnerHTML={{ __html: result.title }} />
                </ComboboxOption>
              )
            })}
          </ComboboxOptionList>
        </div>
      </Combobox>
    </div>
  )
}

export default Search
