import { useEffect } from 'react'
import logo from './img/loading.png'
import './Style/Loading.css'

export default function Loading(){
    const load = document.getElementById('loading')

    const writeLoad = ()=>{
        let dots = ['.','.','.','.','.'];
        let cont = 0
        let write = setInterval(()=>{
            if(load){
                if(cont < 5){
                    load.innerHTML += dots[cont]
                    cont++
                }else{
                    load.innerHTML = ''
                    cont = 0
                }
            }else{
                clearInterval(write)
            }

        },200)
    }
    useEffect(()=>{
        writeLoad()
    })
    return(
        <div id='cont-loading'>
            <img src={logo} alt='logo-loading'/>
            <div>
                <h1 id='loading'></h1>
            </div>
        </div>
    )
}