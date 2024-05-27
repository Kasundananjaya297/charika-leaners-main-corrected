import React, { useEffect, useState } from 'react';
import {Col, InputGroup, Row} from "react-bootstrap";
import {getAgreement, getExtraSessionNotInAgreement} from "../../ApiService/api";
import Form from "react-bootstrap/Form";

const Session = () => {
    const [packageData, setPackageData] = useState([]);

    const [extrasID,setExtrasID] = useState('');
    const [extrasCount,setExtrasCount] = useState('');
    const [extrasPricePerLesson,setExtrasPricePerLesson] = useState('');
    const [extrasDataToSave,setExtrasDataToSave] = useState([]);
    const [isButtonDisabled,setIsButtonDisabled] = useState(true);
    const [extraTypeID,setExtraTypeID] = useState();
    const [extraSessionNotINAgreement,setExtraSessionNotInAgreement] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = sessionStorage.getItem("username");
                if (!username) {
                    return;
                }
                const response = await getAgreement(username);
                setPackageData(response?.data?.content[0]?.packageAndVehicleType);
                console.log(response?.data?.content);
            } catch (e) {
                console.error("An error occurred:", e);
            }
        };

        fetchData();
    }, []);
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await getExtraSessionNotInAgreement(sessionStorage.getItem("username"),packageData[0]?.packageID);
                console.log(response)
                setExtraSessionNotInAgreement(response?.data?.content);
                setExtrasDataToSave(response?.data?.content);
            }catch (e){
                console.log(e)
            }
        }
        fetchData();
    },[packageData])

    return (
        <div className=''>
            <div className="text-lg font-medium text-gray-700 my-2 mb-4 flex-1 fixed h-24 pl-4">
                Participation & Agreement
            </div>
            <div className='flex overflow-y-scroll flex-row mt-12'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Total
                            Sessions
                        </th>
                        <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Participated</th>
                        <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>

                        <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions
                            Agreed
                        </th>
                        <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Extras</th>
                        <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Price per
                            Lesson
                        </th>
                        <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>

                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {packageData?.map((data, i) => (
                        <tr key={i}>
                            <td className="px-3 py-2 whitespace-nowrap">{data.typeID}-{data?.typeName}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{data.autoOrManual}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{data.totalLessons}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{data.participatedLessons}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{data.totalLessons - data.participatedLessons}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{data.lessons}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{data.extraLessons}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{data.price}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{data.extraLessons * data.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="text-lg font-medium text-gray-700 my-2 mt-4 flex-1 fixed h-24 pl-4">
                Additional Sessions & participation
            </div>
            <div className='flex overflow-y-scroll flex-row mt-16'>
                <div>
                    <table className='min-w-full divide-y'>
                        <thead className='bg-gray-50'>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Extras</th>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Participated</th>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Remain</th>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Price_per_Lesson</th>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>

                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200 text-xs'>
                        {extraSessionNotINAgreement?.map((data, i) => (
                            <tr key={i}>
                                <td className='px-3 py-2 whitespace-nowrap'>{data?.typeID} - {data?.typeName}</td>
                                <td className='px-3 py-2 whitespace-nowrap'>{data?.extraLessonVehicleType}</td>
                                <td className='px-3 py-2 whitespace-nowrap'>{data?.extraLessons}</td>
                                <td className='px-3 py-2 whitespace-nowrap'>{data?.participatedLessons}</td>
                                <td className='px-3 py-2 whitespace-nowrap'>{data?.extraLessons - data?.participatedLessons}</td>
                                <td className='px-3 py-2 whitespace-nowrap'>{data?.price}</td>
                                <td className='px-3 py-2 whitespace-nowrap'>{data?.extraLessons * data?.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Session;
