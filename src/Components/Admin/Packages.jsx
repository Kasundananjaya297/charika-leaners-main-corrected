import React,{useEffect,useState} from 'react'
import PackageNavBar from './Common/PackageNavBar'
import PackageCard from './Common/PackageCard'
import { getPackages } from '../ApiService/api'

export default function () {
    const [packages, setPackages] = useState([]);
    useEffect(() =>{
        const fetchPackages = async () =>{
            try{
                const response = await getPackages();
                console.log(response.data);
                setPackages(response.data?.content);
            }
            catch(error){
                console.log(error);
            }
            
            
        }
        fetchPackages();
    },[])
  return (
    <div className="flex flex-col h-dvh mb-2">
        <div className="bg-neutral-50">
        <PackageNavBar/>
      </div>
        
        <div className="flex flex-col overflow-y-scroll h-full">
        <div className="flex flex-wrap">
            {packages?.map((data,i)=>(
            <div className="pl-20 mt-4 gap-x-16 gap-y-6 mb-9" key={i}>
                <PackageCard packeData={data}/>
            </div>)
            )}
            
        </div>
            
        </div>
      </div>
  )
}
