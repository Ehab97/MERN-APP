import { ReactEventHandler, useState } from 'react';
import { useTypedSelector } from '../utlis/helpers/hooks/useTypeSelector';
import { useAction } from '../utlis/helpers/hooks/useAction';

export const RepositoriesList:React.FC=()=>{
  const [term,setTerm]=useState<string>('')
  const {data,error,loading} = useTypedSelector((state) => state.repositories)
  const {searchRepositories}=useAction()

  const onChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
      setTerm(event.target.value)
  }
  const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    searchRepositories(term);
  }
  return(
    <div className='flex justify-center w-full'>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={term} className='border-solid border-2 p-2 border-indigo-600 rounded' />
        <button type='submit' className='bg-slate-300 rounded p-2 mx-2'>Search</button>
      </form>
      {error&&<h3>{error}</h3>}
      {loading&&<h3>loading....</h3>}
      {!error&&!loading&&(<ul>
        {data.map((item)=><li key={item}>{item}</li>)}
        </ul>)
        }
    </div>
  )
}