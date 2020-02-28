import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import axios from 'axios';

function Cardpile() {
    const timerId = useRef();
    const [cards, setCards] = useState([]);
    const [deckId, setDeckId] = useState(null);
    const [cardCounter, setCardCounter] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false)

    let cardsDisplay = cards.map(card =>
        <Card key={card.name} style={card.style} src={card.src} name={card.name} />
    );

    const handleClick = () => {
        isDrawing ? setIsDrawing(false) : setIsDrawing(true);
    }

    useEffect(() => {
        const getCard = async () => {

            try {
                let resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);

                const rotate = 45 - (Math.floor(Math.random() * 90));
                const translateX = 40 - (Math.floor(Math.random() * 80));
                const translateY = 40 - (Math.floor(Math.random() * 80));

                const newCard = {
                    src: resp.data.cards[0].image,
                    name: resp.data.cards[0].code,
                    style: {
                        position: "absolute",
                        top: "150px",
                        transform: `rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`
                    }
                }

                setCards(drawCards => [...drawCards, newCard]);

            } catch (err) {
                clearInterval(timerId.current);
            }
        }

        if (deckId && isDrawing) {
            timerId.current = setInterval(() => {
                getCard()
            }, 100)
        }

        return () => {
            clearInterval(timerId.current);
        }

    }, [isDrawing]
    );

    useEffect(() => {
        const getDeck = async () => {
            let resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            setDeckId(resp.data.deck_id);
        }
        getDeck();
    }, []);

    return (
        <div style={{ position: "relative" }}>

            <button onClick={handleClick}>{(isDrawing) ? "STAAHP NO MORE" : "GIMME A CARD BETCH!"}</button>

            <div>
                {cardsDisplay}
            </div>
        </div>
    )

}

export default Cardpile;