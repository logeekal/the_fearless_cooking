import React, {
  Children,
  createContext,
  forwardRef,
  HTMLProps,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useForwardedRef } from '../../components/hooks/use_forwarded_ref'
import useKeyPress from '../../components/hooks/use_key_press'

type ComboboxProps = PropsWithChildren<{
  autoSelectFirstOption?: boolean
  onSelectionChange?: (currentSelectionIdx: number) => void
  onSelect?: (currentSelectionIdx: number) => void
}>

type ComboboxContext = {
  inputValue: string
  setInputValue: (value: string) => void
  currentSelection: number
  setCurrentSelection: (value: number) => void
  resultCount: number
  setResultCount: (value: number) => void
  autoSelectFirstOption: boolean
  onSelectHandler: () => void
}

const stub = () => null
const initialContext: ComboboxContext = {
  inputValue: '',
  currentSelection: -1,
  resultCount: 0,
  setResultCount: stub,
  setInputValue: stub,
  autoSelectFirstOption: true,
  setCurrentSelection: stub,
  onSelectHandler: stub,
}

export const ComboboxContext = createContext<ComboboxContext>(initialContext)

const Combobox = (props: ComboboxProps) => {
  const {
    children,
    autoSelectFirstOption = true,
    onSelectionChange,
    onSelect,
  } = props
  const [inputValue, setInputValue] = useState('')

  const [resultCount, setResultCount] = useState(0)

  const defaultSelection = useMemo(
    () => (autoSelectFirstOption ? 0 : -1),
    [autoSelectFirstOption]
  )

  const [currentSelection, setCurrentSelection] = useState(defaultSelection)

  useEffect(() => {
    if (onSelectionChange) onSelectionChange(currentSelection)
  }, [currentSelection, onSelectionChange])

  const [downArrowPressed] = useKeyPress('arrowdown')
  const [upArrowPressed] = useKeyPress('arrowup')

  const [enterPressed] = useKeyPress('enter')

  const handleDownArrow = useCallback(() => {
    if (!downArrowPressed) return
    if (currentSelection === resultCount - 1) {
      setCurrentSelection(0)
    } else {
      setCurrentSelection(currentSelection + 1)
    }
  }, [downArrowPressed, currentSelection, resultCount])

  const handleUpArrow = useCallback(() => {
    if (!upArrowPressed) return
    if (currentSelection === 0) {
      setCurrentSelection(resultCount - 1)
    } else {
      setCurrentSelection(currentSelection - 1)
    }
  }, [upArrowPressed, currentSelection, resultCount])

  const onSelectHandler = useCallback(() => {
    if (onSelect) onSelect(currentSelection)
  }, [currentSelection, onSelect])

  const handleEnter = useCallback(() => {
    if (!enterPressed) return
    onSelectHandler()
  }, [enterPressed, onSelectHandler])

  useEffect(() => {
    handleUpArrow()
    handleDownArrow()
    handleEnter()
  }, [handleUpArrow, handleDownArrow, handleEnter])

  const contextValue = useMemo(
    () => ({
      inputValue,
      setInputValue,
      currentSelection,
      setCurrentSelection,
      resultCount,
      setResultCount,
      autoSelectFirstOption,
      onSelectHandler,
    }),
    [
      inputValue,
      currentSelection,
      resultCount,
      autoSelectFirstOption,
      onSelectHandler,
    ]
  )

  return (
    <ComboboxContext.Provider value={contextValue}>
      {children}
    </ComboboxContext.Provider>
  )
}

export default Combobox

type ComboboxInputProps = HTMLProps<HTMLInputElement>

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  (props, ref) => {
    const { className, value, ...rest } = props

    const { setInputValue } = useContext(ComboboxContext)

    useEffect(() => {
      setInputValue(String(value))
    }, [value, setInputValue])

    return (
      <input
        className={`combobox__input ${className ?? ''}`}
        ref={ref}
        {...rest}
      />
    )
  }
)

ComboboxInput.displayName = 'ComboboxInput'

export type ComboboxOptionsProps = HTMLProps<HTMLDivElement>

export const ComboboxOptionList = forwardRef<
  HTMLDivElement,
  ComboboxOptionsProps
>((props, ref) => {
  const { className, children, ...rest } = props

  const { setResultCount, autoSelectFirstOption, setCurrentSelection } =
    useContext(ComboboxContext)

  const uniqueKeys = useMemo(() => {
    return Children.toArray(children).map((child) => {
      if (React.isValidElement(child)) {
        return (child.props as OptionProps)['data-key']
      }
    })
  }, [children])

  const uniqKeysCombination = useMemo(() => {
    return uniqueKeys.join('')
  }, [uniqueKeys])

  const childrenCount = useMemo(() => Children.count(children), [children])

  useEffect(() => {
    setResultCount(childrenCount)
    if (autoSelectFirstOption) {
      setCurrentSelection(0)
    } else {
      setCurrentSelection(-1)
    }
  }, [
    uniqKeysCombination,
    childrenCount,
    setResultCount,
    autoSelectFirstOption,
    setCurrentSelection,
  ])

  return (
    <div className={`combobox__options ${className ?? ''}`} ref={ref} {...rest}>
      {children}
    </div>
  )
})

ComboboxOptionList.displayName = 'ComboboxOptions'

export type OptionProps = HTMLProps<HTMLDivElement> & {
  'data-key': string
  'data-index': number
}

export const ComboboxOption = forwardRef<HTMLDivElement, OptionProps>(
  (props, ref) => {
    const { children, className, 'data-index': dataIndex, ...rest } = props

    const { setCurrentSelection, onSelectHandler } = useContext(ComboboxContext)

    const combinedRef = useForwardedRef<HTMLDivElement>(ref)

    useEffect(() => {
      if (!combinedRef || !combinedRef.current) {
        return
      }
      const el = combinedRef.current

      const selectCurrentOption = () => {
        setCurrentSelection(dataIndex)
      }

      const cleanup = () => {
        el.removeEventListener('mouseover', selectCurrentOption)
      }

      el.addEventListener('mouseover', selectCurrentOption)

      return cleanup
    }, [combinedRef, dataIndex, setCurrentSelection])

    return (
      <div
        className={`combobox__option ${className ?? ''}`}
        ref={combinedRef}
        onClick={onSelectHandler}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

ComboboxOption.displayName = 'ComboboxOption'
