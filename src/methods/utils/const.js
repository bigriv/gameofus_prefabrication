export const games = [
  {
    id: 1,
    label: "minchat",
    name: "みんなでチャット",
  },
  {
    id: 2,
    label: "othello",
    name: "ただのオセロ",
  },
  {
    id: 3,
    label: "numberplace",
    name: "数独やるマン",
  },
];

export const getGameByLabel = (label) => {
  return games.find((game) => game.label === label);
};

export const getGameById = (id) => {
  return games.find((game) => game.id === id);
};

export const messageType = [
  {
    value: 1,
    label: "システムメッセージ",
    color: "gray",
  },
  {
    value: 2,
    label: "WARNメッセージ",
    color: "orangered",
  },
  {
    value: 1,
    label: "ERRORメッセージ",
    color: "red",
  },
  {
    value: 11,
    label: "個人メッセージ",
    color: "darkslateblue",
  },
  {
    value: 12,
    label: "一部に公開１",
    color: "darkgreen",
  },
  {
    value: 13,
    label: "一部に公開２",
    color: "maroon",
  },
  {
    value: 14,
    label: "一部に公開３",
    color: "darksalmon",
  },
  {
    value: 15,
    label: "一部に公開４",
    color: "darkviolet",
  },
  {
    value: 16,
    label: "一部に公開５",
    color: "darkred",
  },
  {
    value: 99,
    label: "全員に公開",
    color: "black",
  },
];
