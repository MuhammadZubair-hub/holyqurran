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
        screenname:'PrayerTime',
        name:'Namaz Time'
    }
] 

export const translatedata = [
      {
        edition:'ur.ahmedali',
        language:'Urdu'
      },
      {
        edition:'en.asad',
        language:'English'
      },
      {
        edition:'bn.bengali',
        language:'Banglli'
      },
      {
        edition:'fr.hamidullah',
        language:'French'
      },
      {
        edition:'hi.hindi',
        language:'Hindi'
      },
      {
        edition:'en.asad',
        language:'English'
      },
      {
        edition:'en.asad',
        language:'English'
      },
    ]