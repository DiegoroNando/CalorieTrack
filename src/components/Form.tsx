
import { useState, ChangeEvent, FormEvent, Dispatch } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Activity } from '../types'
import { categories } from '../data/categories'
import type { ActivityAction } from '../reducers/activityReducer'

  type FormProps ={
    dispatch: Dispatch<ActivityAction>
      }

const initialState: Activity ={
    id: uuidv4(),
    category:1,
    name:'',
    calories:0
}

export default function Form({dispatch}: FormProps) {


  const [Activity, setActivity] = useState <Activity>(initialState)


  const handleChange = (e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
    
    setActivity({
      ...Activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }


  const isValidActivity = () =>{
    const {name, calories } = Activity
    return name !== '' && calories > 0
  }

  const handleSubmit=(e : FormEvent<HTMLFormElement> )=>{
    e.preventDefault()

    dispatch({type: 'save-activity', 'payload': {newActivity:Activity}})
    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }
    


  return (
   <form 
   className='space-y-5 bg-white shadow p-10 rounded-lg'
   onSubmit={handleSubmit}
   >
    <div className='grid grid-cols-1 gap-3'>
        <label htmlFor="category" className='font-bold'>Categoria: </label>
        <select 
        className='border border-slate-300 p-2 rounded-lg w-full bg-white' 
        id="category"
        value={Activity.category}
        onChange={handleChange}
        >
          {categories.map(category => (
            <option 
            key={category.id}
            value={category.id}
            >
                {category.name}
            </option>
          ))}  
        </select>
    </div>
    
    <div className='grid grid-cols-1 gap-3'>
        <label htmlFor=" name" className='font-bold'>Actividad:</label>
        <input 
        id='name'
        type='text'
        className='border borderslate-300 p-2 rounded-lg'
        placeholder='Ej. Comida, Juego de Naranja, Enssalada, Ejercicio, pesas, Bicicleta '
        value={Activity.name}
        onChange={handleChange}
         />
    </div>

        <div className='grid grid-cols-1 gap-3'>
        <label htmlFor="calories" className='font-bold'>Calorias:</label>
        <input 
        id='calories'
        type='number'
        className='border borderslate-300 p-2 rounded-lg'
        placeholder='Calorias. ej. 300 o 500 '
        value={Activity.calories}
        onChange={handleChange}
         />
    </div>

    <input
     type="submit" 
     className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
     value={Activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
     disabled={!isValidActivity()}
     />


   </form>
  )
}
