import * as React from 'react'

type Props = {
  items: []
  isAuthenticated: boolean
}

const CardGame = ({ items, isAuthenticated }: Props) => (
  <ul>
    verify : {`${isAuthenticated}`}
    {items && items.map((item) => (
      <li key={item}>
      </li>
    ))}
  </ul>
)

export default CardGame
