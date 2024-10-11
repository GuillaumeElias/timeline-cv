import { toTs, tsToShortStr } from "./dateutil";
import { Event, TYPES } from "./types";

export const timelineData: Event[] = [
  {
    label: "A Hard Day's Night",
    startDate: toTs("2009-09-01"),
    endDate: toTs("2012-09-01"),
    type: "EDUCATION",
    line: 0,
    description: "Completed the journey in Software Engineering (Bachelor's degree)",
    place: "Strawberry Fields University, Liverpool",
    country: "Belgium",
    fullTime: true,
    timePercentage: 100,
    selfEmployed: false,
  },
  {
    label: "Ticket to Ride at Penny Lane",
    startDate: toTs("2012-10-01"),
    endDate: toTs("2016-08-30"),
    type: "IT_WORK",
    line: 0,
    place: "Penny Lane Technologies, London",
    country: "UK",
    description: "Worked on various projects involving software development and integration.",
    fullTime: true,
    timePercentage: 100,
    selfEmployed: false,
  },
  {
    label: "Lucy in the Sky with C++",
    startDate: toTs("2016-10-01"),
    endDate: toTs("2018-09-30"),
    type: "IT_WORK",
    line: 0,
    place: "Lucy's Software House, Liverpool",
    country: "UK",
    description: "Developed C++ applications for various clients, contributing to innovative solutions.",
    fullTime: true,
    timePercentage: 100,
    selfEmployed: false,
  },
  {
    label: "Teacher's Pet Sounds",
    startDate: toTs("2018-09-01"),
    endDate: toTs("2019-06-30"),
    type: "EDUCATION",
    hideDate: true,
    line: 2,
    place: "Abbey Road Institute, London",
    country: "UK",
    description: "Attended teacher training program focusing on modern educational techniques and pedagogy.",
    fullTime: false,
    timePercentage: 20,
    selfEmployed: false,
  },
  {
    label: "I Am the Walrus - Computer Science Edition",
    startDate: toTs("2018-10-01"),
    endDate: toTs("2019-06-30"),
    type: "SCHOOL",
    line: 0,
    place: "Magical Mystery University, Liverpool",
    country: "UK",
    description: "Taught computer science courses to undergraduate students, emphasizing practical skills and problem-solving.",
    fullTime: false,
    timePercentage: 66,
    selfEmployed: false,
  },
  {
    label: "Help! - Remote Consultant",
    startDate: toTs("2019-01-01"),
    endDate: toTs("2024-06-30"),
    hideDate: true,
    type: "IT_WORK",
    line: 1,
    place: "Help Desk, [remote]",
    country: "UK",
    description: "Provided remote consultancy services for software development projects, troubleshooting and advising on technical issues.",
    fullTime: false,
    timePercentage: 33,
    selfEmployed: true,
  },
  {
    label: "Here Comes the Sun: Coordinator",
    startDate: toTs("2019-10-01"),
    endDate: toTs("2021-08-25"),
    type: "SCHOOL",
    line: 0,
    place: "Here Comes the Sun Institute, Liverpool",
    country: "UK",
    description: "Coordinated educational programs and activities, overseeing curriculum development and student engagement initiatives.",
    fullTime: false,
    timePercentage: 50,
    selfEmployed: false,
  },
  {
    label: "Hey Jude, I'm a Teacher",
    startDate: toTs("2021-09-01"),
    endDate: toTs("2023-06-30"),
    type: "SCHOOL",
    line: 0,
    place: "Hey Jude High School, Liverpool",
    country: "UK",
    description: "Taught mathematics and computer science courses to high school students, fostering critical thinking and analytical skills.",
    fullTime: false,
    timePercentage: 60,
    selfEmployed: false,
  },
  {
    label: "Yesterday: Teacher in Canada",
    startDate: toTs("2023-09-01"),
    endDate: toTs("2024-06-30"),
    type: "SCHOOL",
    line: 0,
    place: "Yesterday High School, Ontario, Canada",
    country: "Canada",
    description: "Embarked on a teaching journey in Canada, imparting knowledge and nurturing young minds in mathematics and computer science.",
    fullTime: false,
    timePercentage: 50,
    selfEmployed: false,
  },
];



export const getFlagPath = (event: Event) : string => {
  if(event.flagFilename && event.flagFilename.length > 0){
    return `images/${event.flagFilename}.gif`;
  }

  if(event.country){
    if(event.country.startsWith("[")){
      return event.country;
    }else{
      return `images/${event.country.toLowerCase()}.gif`;
    }
  }else{
    return ""
  }
}