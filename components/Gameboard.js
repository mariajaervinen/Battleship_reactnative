import React, {useState, useEffect, useRef} from 'react';
import { Text, View, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../style/style.js';

const START = 'plus'; //ei avattu
const CROSS = 'cross'; //ei laivaa
const CIRCLE = 'circle'; //laiva upotettu

const startCOLS = 5;
const startROWS = 5;
const BOMBS = 15;
const ships = 3;
let startBoard = new Array(startCOLS * startROWS).fill(START);
let shipPositions = [];

export default function Gameboard() {

    const timerRef = useRef();
    const [isShip, setShip] =useState(false);//onko siellä laiva?
    const [board, setBoard]=useState(startBoard); //pelikenttä
    const [status, setStatus] = useState('Game has not started');
    const [bombsLeft, setBombsLeft] = useState(BOMBS); //montako pommia(siirtoa) jäljellä
    const [shipLeft, setShipLeft] = useState(ships);//montako laivaa jäljellä
    const [seconds, setSeconds] = useState(0) //aika
    const [gameOn, setGameOn] = useState(false); //onko peli käynnissä
    const [buttonText, setButtonText] =useState('Start Game'); //napin teksti
    const [hit, setHit] = useState (0); //osumat


    const items =[]; //tämä tulostaa pelilaudan näytölle
    //rivit
    for (let x=0; x < startROWS; x++){
        const cols=[];
        //sarakkeet
        for(let y = 0; y < startCOLS; y++){
            cols.push(
                <Pressable
                    key = {x * startCOLS + y}
                    style={styles.item}
                    onPress={() => dropBomb(x * startCOLS + y)}>
                    <Entypo 
                    key={x * startCOLS + y}
                    name={board[x * startCOLS + y]}
                    size={28}
                    color={chooseItemColor(x*startCOLS+y)}/>    
                </Pressable>
            );
        }//sarakkeet päättyy
        let row =
            <View key={'row'+x}>
                {cols.map((item) => item)}
            </View>
        items.push(row);
    }//rivit loppuu

    function startGame(){ 
        shipPositions=[];
        setGameOn(true);
        placeShips();
        setButtonText('New Game');
        setStatus('Game On...');
    }
    

    function placeShips(){
        for(let i = 0; i < ships; i++){ //kolme laivaa kentälle
            let randomNumber = Math.floor(Math.random() * (startROWS * startCOLS));
            if(shipPositions.indexOf(randomNumber) === -1){ //jos ei ole
                shipPositions.push(randomNumber);
            }else{ //jos on jo
                randomNumber = Math.floor(Math.random() * (startROWS * startCOLS));
                shipPositions.push(randomNumber);
            }
        }   
    }

    function startTime(){
        const timer = setTimeout(() => setSeconds(seconds + 1), 1000);
        timerRef.current=timer;
    }; 
    
    function stopTime(){
        clearTimeout(timerRef.current);
    }; 
 
    useEffect(() => { //one step behind korjataan tässä functioratkaisussa
        winGame();
        if(bombsLeft === BOMBS && gameOn === false){
            setStatus('Game has not started'); //alkuarvo statukselle täällä
        }  
        if (seconds < 30 && gameOn === true) {
            startTime();
        }
        if(bombsLeft === 0){
            stopTime();
        }else if (shipLeft === 0){
            stopTime();
        }

        if(bombsLeft === 0 && shipLeft > 0){
            setStatus('Game over. Ships remaining.');
        }
        if (seconds===30 && shipLeft > 0) {
            setStatus('TimeOut. Ships remaining.');
        }
    },[bombsLeft, gameOn, seconds]); //aina kun tämä muuttuu niin tehdään useEffect

    function resetGame(){
        startBoard = new Array(startCOLS * startROWS).fill(START);
        setBoard(startBoard); //uusi pelilauta
        setBombsLeft(BOMBS); 
        setHit(0);
        setShipLeft(ships);
        setSeconds(0);
        //stopTime();
        startGame();

    }

    function winGame(){
        //kaikki laivat upotettu, pommeja ja aikaa vielä jäljellä
        if (hit === ships && bombsLeft >= 0 && seconds < 30){ 
          setStatus('You have sinked all ships. Gongrats!');
            stopTime();        
        }
        if(bombsLeft === 0){
            stopTime();
        }
        if (shipLeft === 0){
            stopTime();
        }
    } 

    function dropBomb(number){
        //täällä estetään pommien pudottaminen jos..
        if(gameOn === false){//yrittää pudottaa pommin mutta peliä ei vielä aloitettu
            setStatus('Click the start button first!')
        }else if(seconds === 30 && shipLeft >0){//aika on loppu
            setGameOn(false);//ei voi enää pudottaa pommeja
        }else if (bombsLeft=== 0 && seconds < 30){
            setGameOn(false);
        }
        else{
            if(board[number] === START ){ //jos ei ole vielä "pommitettu"
                if(shipPositions.indexOf(number) !== -1){ //jos on laiva
                    board[number] = CIRCLE;
                    setBombsLeft(bombsLeft-1);
                    setHit(hit + 1);
                    setShipLeft(shipLeft - 1);
                }else{
                    board[number] = CROSS;
                    setBombsLeft(bombsLeft-1);
                }
                //setShip(!isShip);
            }
        }  
    }

    function chooseItemColor(number){
        if (board[number] === CROSS){ //rasti on punainen
            return '#FF3031'
        }
        else if(board[number] === CIRCLE){ //ymp vihreä
            return '#45CE30'
        }else{
            return 'grey' // plus sininen
        }
    }

    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{items}</View>
            <Text style={styles.gameinfo}>Hits: {hit} Bombs: {bombsLeft} Ships: {shipLeft} </Text>
            <Text style={styles.gameinfo}>Time: {seconds} sec </Text>
            <Text style={styles.gameinfo}>Status: {status}</Text>
            <Pressable style={styles.button} 
                onPress={()=> gameOn ? resetGame() : startGame()}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>
        </View>
    );
}