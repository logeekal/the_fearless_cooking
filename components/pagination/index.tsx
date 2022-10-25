/*
 *  Should accept
 *  - intial list of items
 *  - logic to retrieve more as pass to Lower order component
 *  - caching Dependency InMemory vs LocalStorage
 *   -
 *
 *
 *
 *
 * */

import { ComponentType, FC } from 'react'

type WithPaginationProps<ItemType> = {
  pageSize: string
  fechMoreHandler: (after: string) => void
  onNextClick: () => Array<ItemType>
  itemList: Array<ItemType>
  mode?: 'infinite' | 'pages'
}

export function withPagination<ItemType, T>(
  Comp: ComponentType<T>
): FC<T & WithPaginationProps<ItemType>> {
  const Pagination = (props: T & WithPaginationProps<ItemType>) => {
    const {
      pageSize,
      fechMoreHandler,
      onNextClick,
      itemList,
      mode = 'infinite',
      ...wrappedCompProps
    } = props

    return (
      <div>
        <div className={`page__footer ${''}`}>
          <img
            alt={'Load more posts'}
            className={`${''}`}
            src="/images/chevron-down-double.svg"
            width="50px"
            height={'50px'}
          />
        </div>
      </div>
    )
  }

  Pagination.displayName = 'Pagination'
  return Pagination
}

//function usePagination<DataType extends {pageInfo:  Recipe>(
//pageSize: number,
//onNextHandler: (after: string) =>  ,
//intialList: DataType
//) {
//const [items, setItems] = useState(itemList)

//const onNext = useCallback(() => {
//onNextHandler()
//})
//}
