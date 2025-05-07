import { useSelector } from "react-redux";
import { getqurandetialdata } from "../shared/redux/Userslice";

export const HomeWidgets = [
    {
        //screen:'QuranDetial',
        name:'Quran detials'
    },
    {
        //screen:'Qurand',
        name:'readquran'
    },
    {
        //screen:'detial',
        name:'Read quran'
    }
] 

const getredux = useSelector(getqurandetialdata);

export const detialsData =[
    {
        id:'1',
        name:'Surah',
        count : getredux?.surahs?.count
    },
    {
        id:'2',
        name:'Juz',
        count : getredux?.juzs?.count
    },
    {
        id:'3',
        name:'Ayyat',
        count : getredux?.ayahs?.count
    },
    {
        id:'4',
        name:'Sajdas',
        count : getredux?.sajdas?.count
    },
    {
        id:'5',
        name:'Rukus',
        count : getredux?.rukus?.count
    },
]

   
