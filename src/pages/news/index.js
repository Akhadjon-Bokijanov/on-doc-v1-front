import React from "react";
import News from "../../components/news";
const news=[
    {
        id:1,
        title:'26 Апреля | Понедельник ',
        time:'13.00',
        content:'sgrjtyjЕсли после применения правила Лопиталя неопределённость типа 0 / 0 осталась, детерминант  принципе неопределённость'
    },
    {
        id:2,
        title:'26 Апреля | Понедельник ',
        time:'13.00',
        content:'Если после применения правила Лопиталя неопределённость типа 0 / 0 осталась, детерминант  принципе неопределённость'
    },
    {
        id:3,
        title:'26 Апреля | Понедельник ',
        time:'13.00',
        content:'Реферат по правоведению\n' +
            'Тема: «Диспозитивный задаток: предпосылки и развитие»\n' +
            'Информация гарантирует причиненный ущерб. Еще в ранних речах А.Ф.Кони показано, что судебное решение подведомственно арбитражному суду. Еще в ранних речах А.Ф.Кони показано, что фрахтование поручает законодательный умысел. Ответственность теоретически вознаграждает субъект.\n' +
            '\n' +
            'Кодекс, как можно доказать с помощью не совсем тривиальных допущений, своевременно исполняет казенный Кодекс. Новация законодательно подтверждает Указ. В соответствии со сложившейся правоприменительной практикой акционерное общество своевременно исполняет суд.\n' +
            '\n' +
            'Регрессное требование, как неоднократно наблюдалось при чрезмерном вмешательстве государства в данные правоотношения, представляет собой уставный причиненный ущерб. Взаимозачет возмещает штраф. Конфиденциальность индоссирует судебный закон. В отличие от решений судов, имеющих обязательную силу, регрессное требование доказывает гарант.'
    },
    {
        id:4,
        title:'26 Апреля | Понедельник ',
        time:'13.00',
        content:'Если после применения правила Лопиталя неопределённость типа 0 / 0 осталась, детерминант  принципе неопределённость'
    },
    {
        id:5,
        title:'26 Апреля | Понедельник ',
        time:'13.00',
        content:'Если после применения правила Лопиталя неопределённость типа 0 / 0 осталась, детерминант  принципе неопределённость'
    },
    {
        id:6,
        title:'26 Апреля | Понедельник ',
        time:'13.00',
        content:'Если после применения правила Лопиталя неопределённость типа 0 / 0 осталась, детерминант  принципе неопределённость'
    },
    {
        id:7,
        title:'26 Апреля | Понедельник ',
        time:'13.00',
        content:'Если после применения правила Лопиталя неопределённость типа 0 / 0 осталась, детерминант  принципе неопределённость'
    }
]
export default function NewsPage() {
    return(
        <>
            <News data={news}/>
        </>
    )
}