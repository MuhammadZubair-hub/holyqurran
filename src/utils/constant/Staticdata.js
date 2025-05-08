import { useSelector } from "react-redux";
import { getqurandetialdata } from "../shared/redux/Userslice";

export const HomeWidgets = [
    {
        screenname:'QuranDetial',
        name:'Quran detials'
    },
    {
        screenname:'ReciteQuran',
        name:'Recite Quran'
    },
    {
        screenname:'ReciteQuran',
        name:'Read quran'
    }
] 

// const getredux = useSelector(getqurandetialdata);

// export const detialsData =[
//     {
//         id:'1',
//         name:'Surah',
//         count : getredux?.surahs?.count
//     },
//     {
//         id:'2',
//         name:'Juz',
//         count : getredux?.juzs?.count
//     },
//     {
//         id:'3',
//         name:'Ayyat',
//         count : getredux?.ayahs?.count
//     },
//     {
//         id:'4',
//         name:'Sajdas',
//         count : getredux?.sajdas?.count
//     },
//     {
//         id:'5',
//         name:'Rukus',
//         count : getredux?.rukus?.count
//     },
// ]

   
