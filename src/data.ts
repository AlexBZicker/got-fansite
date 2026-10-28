// Données non traduisibles (noms propres, acteurs, images). Les textes sont dans src/locales/<langue>.json.
export type Perso = { nom: string; maison: string; acteur: string }

export const maisons = ['Stark', 'Lannister', 'Targaryen', 'Baratheon', 'Greyjoy', 'Martell', 'Tyrell', 'Tully', 'Arryn']

const p = (nom: string, maison: string, acteur: string): Perso => ({ nom, maison, acteur })
export const persos: Perso[] = [
  p('Jon Snow', 'Stark / Garde de Nuit', 'Kit Harington'),
  p('Daenerys Targaryen', 'Targaryen', 'Emilia Clarke'),
  p('Tyrion Lannister', 'Lannister', 'Peter Dinklage'),
  p('Cersei Lannister', 'Lannister', 'Lena Headey'),
  p('Jaime Lannister', 'Lannister', 'Nikolaj Coster-Waldau'),
  p('Arya Stark', 'Stark', 'Maisie Williams'),
  p('Sansa Stark', 'Stark', 'Sophie Turner'),
  p('Ned Stark', 'Stark', 'Sean Bean'),
  p('Bran Stark', 'Stark', 'Isaac Hempstead Wright'),
  p('Brienne de Torth', 'Tarth', 'Gwendoline Christie'),
  p('Theon Greyjoy', 'Greyjoy', 'Alfie Allen'),
  p('Petyr Baelish', 'Baelish', 'Aidan Gillen'),
  p('Stannis Baratheon', 'Baratheon', 'Stephen Dillane'),
  p('Rhaenyra Targaryen', 'Targaryen (HotD)', "Emma D'Arcy / Milly Alcock"),
  p('Daemon Targaryen', 'Targaryen (HotD)', 'Matt Smith'),
  p('Alicent Hightower', 'Hightower (HotD)', 'Olivia Cooke / Emily Carey'),
  p('Robb Stark', 'Stark', 'Richard Madden'),
  p('Catelyn Stark', 'Stark', 'Michelle Fairley'),
  p('Joffrey Baratheon', 'Baratheon', 'Jack Gleeson'),
  p('Robert Baratheon', 'Baratheon', 'Mark Addy'),
  p('Tywin Lannister', 'Lannister', 'Charles Dance'),
  p('Samwell Tarly', 'Tarly / Garde de Nuit', 'John Bradley'),
  p('Davos Mervault', 'Mervault', 'Liam Cunningham'),
  p('Melisandre', 'Prêtresse rouge', 'Carice van Houten'),
  p('Sandor Clegane', 'Clegane', 'Rory McCann'),
  p('Gregor Clegane', 'Clegane', 'Hafþór Júlíus Björnsson'),
  p('Jorah Mormont', 'Mormont', 'Iain Glen'),
  p('Margaery Tyrell', 'Tyrell', 'Natalie Dormer'),
  p('Oberyn Martell', 'Martell', 'Pedro Pascal'),
  p('Viserys Targaryen', 'Targaryen (HotD)', 'Paddy Considine'),
  p('Corlys Velaryon', 'Velaryon (HotD)', 'Steve Toussaint'),
]

export const series = [
  { img: 'got', titre: 'Game of Thrones' },
  { img: 'hotd', titre: 'House of the Dragon' },
  { img: 'aknight', titre: 'A Knight of the Seven Kingdoms' },
]

export const livres = ['asoiaf', 'fireblood', 'dunkegg', 'worldoficeandfire']

export const sources = [
  ['Wikipedia — Game of Thrones', 'https://en.wikipedia.org/wiki/Game_of_Thrones'],
  ['Wikipedia — House of the Dragon', 'https://en.wikipedia.org/wiki/House_of_the_Dragon'],
  ['Wikipedia — A Knight of the Seven Kingdoms', 'https://en.wikipedia.org/wiki/A_Knight_of_the_Seven_Kingdoms_(TV_series)'],
  ['Wikipedia — A Song of Ice and Fire', 'https://en.wikipedia.org/wiki/A_Song_of_Ice_and_Fire'],
  ['Wikipedia — List of Game of Thrones characters', 'https://en.wikipedia.org/wiki/List_of_Game_of_Thrones_characters'],
  ['A Wiki of Ice and Fire', 'https://awoiaf.westeros.org/'],
]
