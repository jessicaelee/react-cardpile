import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

function Cardpile() {
    const [cards, setCards] = useState([]);
    const [deckId, setDeckId] = useState(null);
    const [cardCounter, setCardCounter] = useState(0);

    let cardsDisplay = cards.map(card =>
        <Card key={card.name} style={card.style} src={card.src} name={card.name} />
    );

    useEffect(() => {
        const getCard = async () => {
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

        }
        if (deckId) {
            getCard();
        }
    }, [cardCounter]
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
            {(cardCounter < 52) ? <button onClick={() => setCardCounter(card => card + 1)}>GIMME A CARD BETCH!</button> : ""}
            <div>
                {cardsDisplay}
            </div>
        </div>
    )

}

export default Cardpile;