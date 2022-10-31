export type Position = [number, number]

export type ResultMetadata = {
  [term: string]: {
    [field: string]: {
      position: Array<Position>
    }
  }
}

export type FieldPositionMetadata = {
  [field: string]: {
    position: Array<Position>
  }
}

export type FieldResultMetadata = {
  [field: string]: string
}

export type Segment = {
  segment?: [number, number]
  positions: Array<Position>
}
