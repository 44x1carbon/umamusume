import database from "./assets/database.json";
import G from "generatorics";

// TODO storeに移す

const uniq = (list, fn) => {
  const result = {};
  list.forEach(item => {
    result[fn(item)] = item;
  });

  return Object.values(result);
};

export const skillList = supportCards => {
  return uniq(
    [].concat(
      ...supportCards.map(supportCard =>
        [].concat(
          supportCard.possessionSkills,
          supportCard.trainingEventsSkills
        )
      )
    ),
    item => item.name
  );
};

export const skillTagList = () => {
  return uniq(
    skillList()
      .map(skill => skill.description.match(/＜.*＞/))
      .filter(match => match)
      .map(match => match[0]),
    item => item
  );
};

const combinationPoint = combination =>
  combination
    .map(supportCard => rankToPoint(supportCard.rank))
    .reduce((sum, element) => sum + element, 0);

const rankToPoint = rank => {
  switch (rank) {
    case "SSR":
      return 3;
    case "SR":
      return 2;
    case "R":
      return 1;
    default:
      return 0;
  }
};

export const calcCombination = (skills, supportCards) => {
  if (skills.length === 0) {
    return [];
  }
  const supportCardWithSkills = skills.map(skill =>
    supportCards.filter(supportCard => hasSkill(supportCard, skill))
  );

  const combinationList = [];
  for (let a of G.cartesian(...supportCardWithSkills)) {
    combinationList.push([...a]);
  }

  return uniq(
    combinationList
      .map(combination => uniq(combination, item => item.name))
      .filter(combination => combination.length <= 6),
    combination =>
      combination
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(supportCard => supportCard.name)
        .join()
  )
    .sort((a, b) => combinationPoint(a) - combinationPoint(b))
    .reverse();
};

export const hasSkill = (supportCard, skill) => {
  return []
    .concat(supportCard.possessionSkills, supportCard.trainingEventsSkills)
    .some(item => item.name === skill.name);
};
