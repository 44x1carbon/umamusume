import database from "../assets/database.json";

export const state = () => ({
  hasSupportCardNames: [],
  supportCards: database
});

export const mutations = {
  addHasSupportCards(state, cardName) {
    state.hasSupportCardNames.push(cardName);
  },
  removeHasSupportCards(state, cardName) {
    const index = state.hasSupportCardNames.indexOf(cardName);
    state.hasSupportCardNames.splice(index, 1);
  }
};

export const getters = {
  hasSupportCardNames: state => {
    return state.hasSupportCardNames;
  },
  supportCards: state => {
    return state.supportCards;
  },
  hasSupportCards: state => {
    return state.supportCards.filter(supportCard =>
      state.hasSupportCardNames.includes(supportCard.name)
    );
  }
};
