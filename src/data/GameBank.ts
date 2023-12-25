interface Category {
  title: string;
  words: string[];
}

interface Hint {
  [key: string]: string;
}

export interface ConnectionsGame {
  categories: Category[];
  hints: Hint;
  difficulties: {
    [key: string]: string;
  };
}

export const Christmas2023: ConnectionsGame = {
  categories: [
    { title: "Gifts you've gotten me", words: ["Sunglasses", "Sweater", "Hoodie", "Cookbook"] },
    { title: "First words of our songs", words: ["Blueberry", "Golden", "What", "Slow"] },
    { title: "Dates we've been on twice or more", words: ["Dinner", "Escape room", "Movie", "Museum"] },
    { title: "Our date in New York", words: ["Ice", "High comedians", "Bubbles", "Paintings"] },
  ],
  hints: {
    "Gifts you've gotten me": "Think about my birthday and christmas",
    "First words of our songs": "Lemons and that one embarrassing picture of you",
    "Dates we've been on twice or more": "1, 2, 3, 4, who can keep count anymore?",
    "Our date in New York": "Thinking about cities may help",
  },
  difficulties: {
    "Gifts you've gotten me": "yellow",
    "Our date in New York": "lightgreen",
    "Dates we've been on twice or more": "lightblue",
    "First words of our songs": "violet",
  }
}