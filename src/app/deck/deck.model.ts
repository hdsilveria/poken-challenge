import { Card } from "../../models/card.model"

export interface Deck {
    name: string
    items: Card[]
}