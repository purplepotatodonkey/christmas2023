interface Category {
  title: string;
  words: string[];
}

interface Hint {
  [key: string]: string;
}

export interface ConnectionsGame {
  categories: Category[];
  hints: Hint[];
}

export const Christmas2023: ConnectionsGame = {
  categories: [
    { title: "Gifts you've gotten me", words: ["Sunglasses", "Sweater", "Hoodie", "Cookbook"] },
    { title: "First words of our songs", words: ["Blueberry", "Golden", "What", "Slow"] },
    { title: "Dates we've been on twice or more", words: ["Dinner", "Escape room", "Movie", "Art museum"] },
    { title: "Dates we've only been on once", words: ["Ice skating", "Standup show", "Aquarium", "Painting"] },
  ],
  hints: [
    {"Gifts you've gotten me": "Think about my birthday and christmas",},
    {"First words of our songs": "Lemons and that one embarrassing picture of you"},
    {"Dates we've been on twice or more": "This one's hard. Think about what makes these dates different"},
    {"Dates we've only been on once": "This one's hard. Think about numbers or counting"},
  ]
}