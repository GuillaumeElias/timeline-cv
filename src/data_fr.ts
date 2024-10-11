import { toTs, tsToShortStr } from "./dateutil";
import { Event, TYPES } from "./types";

export const timelineDataFr: Event[] = [
  {
    label: "Découverte des mystères de la pluie",
    startDate: toTs("2009-09-01"),
    endDate: toTs("2012-09-01"),
    type: "EDUCATION",
    line: 0,
    description: "J'ai entrepris une quête pour découvrir les mystères de la pluie. J'ai étudié ses différentes formes, son impact sur la vie quotidienne et les meilleures techniques pour rester au sec.",
    place: "Université de la Pluviologie, Manchester",
    country: "Royaume-Uni",
    fullTime: true,
    timePercentage: 100,
    selfEmployed: false,
    flagFilename: "uk"
  },
  {
    label: "Stage en expérimentation de tasses de thé",
    shortLabel: "Stage de thé",
    startDate: toTs("2012-02-01"),
    endDate: toTs("2012-05-01"),
    type: "INTERNSHIP",
    line: 1,
    description: "J'ai eu l'opportunité de participer à un stage d'expérimentation de tasses de thé dans les collines brumeuses de l'Angleterre. Mon travail consistait à évaluer les différentes saveurs, arômes et températures du thé, tout en perfectionnant ma technique de préparation de scones.",
    place: "Manoir du Thé, Oxfordshire",
    country: "Royaume-Uni",
    fullTime: true,
    timePercentage: 100,
    selfEmployed: false,
    hideDate: true,
    flagFilename: "uk"
  },
  {
    label: "Développeur de jeux vidéo surréalistes",
    startDate: toTs("2012-10-01"),
    endDate: toTs("2016-08-30"),
    type: "IT_WORK",
    line: 0,
    description: "J'ai plongé dans l'univers des jeux vidéo surréalistes en travaillant sur des projets innovants. J'ai exploré des mondes fantastiques, créé des personnages étranges et développé des scénarios qui défient la logique.",
    place: "Studio des Rêves, Bruxelles",
    country: "Belgique",
    fullTime: true,
    timePercentage: 100,
    selfEmployed: false,
    flagFilename: "belgium"
  },
  {
    label: "Explorateur de la poutine authentique",
    startDate: toTs("2016-10-01"),
    endDate: toTs("2018-09-30"),
    type: "IT_WORK",
    line: 0,
    description: "Pendant deux ans, j'ai voyagé à travers le Canada à la recherche de la poutine parfaite. J'ai exploré les régions les plus reculées, goûté à une multitude de variations et rencontré des chefs de renom pour percer les secrets de ce plat emblématique.",
    place: "Routes du Canada",
    country: "Canada",
    fullTime: true,
    timePercentage: 100,
    selfEmployed: false,
    flagFilename: "canada"
  },
];
