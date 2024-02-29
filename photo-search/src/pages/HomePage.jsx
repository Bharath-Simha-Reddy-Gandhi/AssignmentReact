import { useState } from "react"
import { Header } from "../components/Header"
import {RandomImages} from '../components/RandomImages'


export const HomePage = () =>{
    const [triggerRandomImages,setTriggerRandomImages] = useState(false)

    return (
        <>
        <Header setTriggerRandomImages={setTriggerRandomImages}/>
        <RandomImages triggerRandomImages={triggerRandomImages}/>
        </>
    )
}