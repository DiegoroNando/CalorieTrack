import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"


type ActivityListProps ={
    activities: Activity[]
}

export default function ActivityList({activities} :ActivityListProps ) {
    const categoryName = useMemo (() => 
    (category: Activity['category']) => 
        console.log(category) , 
    [activities])
  return (
   <>
    <h2 
    className="text-4xl font-bold text-slate-600 text-center"> 
    Comida y Actividades
    </h2>

    {activities.map(Activity =>
        <div key={Activity.id} className="px-5 py-10 bg-white mt-5 flex justify between">
            <div className="space-y-2 relative">
                <p>
                   {categoryName(Activity.category)}
                    </p>
                <p className="text-2xl font-bold pt-5">{Activity.name}</p>
                <p className="font-black text-4xl text-lime-500">
                    {Activity.calories}
                    <span>Calorias</span>
                    </p>
            </div>
            <div>

            </div>
        </div>
    )}

   </>
  )
}
