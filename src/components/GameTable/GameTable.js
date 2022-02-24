import styled, {
    css} from 'styled-components';
  import React from 'react';
  import cardDeck from '../../cardDeck';
  import arrayImages, {deck_back} from '../../cardimages/index';

  const Wrapper = styled.div`
  margin: 2em auto;
  text-align: center;
  `

  const GameArea = styled.div`
  background-color: #EDEDED;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  `
  const PlayArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  margin: 1em 0;
  `
  
  const getCardStyle = props => css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left:0;
  &.carta-distribuita {
    background-color: ${props.backgroundCardColor};
    background-image: url( ${props.backgroundImage});
    color: ${props.textColor};
    background-size: cover;
  }
  &.carta-da-distribuire {
    color: transparent;
    background-image: url( ${deck_back});
    background-size: cover;
  }
  
  `
  
  const getDeckStyle = props => css`
  width: 110px;
  height: 150px;
  margin: 1em;;
  position: relative;
  border: 2px solid rgba(33,33,33, 0.5);
  `

  const getButtonStyle = props => css`
  background-color: ${props.backgroundColor};
  width: 150px;
  padding: 0.5em;
  color: ${props.distributedCard ? 'rgba(255,255,255,1)' : 'rgba(255,255,255, 0.5)'};
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.1em;
  `

  const getPlayerAreaStyle = props => css`
  margin: 0.5em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `
  const getPlayerStyle = props => css`
  width: 110px;
  height: 150px;
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px solid rgba(68,133,139, 0.5);
  &.drag-over {
    border: 2px dashed rgba(68,133,139, 0.5);
  };
  &.slush-pile {
    border: 2px solid rgba(33,33,33, 0.5);
    background-color: rgb(33,33,33, 0.1);
  };
  `

  const getPointsBadgeStyle = props => css`
  background-color: #44858B;
  color: white;
  margin: 0 1em;
  padding: 0.25em 0.5em;
  border-radius: 0.5em;
  `

  const getInfoWrapperStyle = props => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 4em;
  `

  
  const Card = styled.div`${getCardStyle}`;
  const PlayerArea = styled.div`${getPlayerAreaStyle}`;
  const CardDecks = styled.div`${getDeckStyle}`;
  const MazzoScarti = styled.div`${getPlayerStyle}`;
  const Player1 = styled.div`${getPlayerStyle}`;
  const Player2 = styled.div`${getPlayerStyle}`;
  const PointsBadge = styled.p`${getPointsBadgeStyle}`;
  const InfoWrapper = styled.div`${getInfoWrapperStyle}`;
  const Button = styled.button`${getButtonStyle}`;
  const Title = styled.h1`
    color: rgb(68,133,139);
  `;

  class GameTable extends React.PureComponent {
    constructor(props) {
      super(props);
      this.props = props;
      this.getTemplateCard = this.getTemplateCard.bind(this);
      this.getDeck = this.getDeck.bind(this);
      // draggable
      this.onDragEnd = this.onDragEnd.bind(this);
      this.onDragStart = this.onDragStart.bind(this);
      //droppable
      this.onDragEnter = this.onDragEnter.bind(this);
      this.onDragOver = this.onDragOver.bind(this);
      this.onDragLeave = this.onDragLeave.bind(this);
      this.onDrop = this.onDrop.bind(this);
      // general
      this.onClick = this.onClick.bind(this);
      
      this.arrayImmagini = arrayImages;

      this.state = {
        distributed: 0,
        cards: this.getDeck(),
        playerName1: 'Player 1',
        playerName2: 'Player 2',
        playerPoints1: 0,
        playerPoints2: 0,
      };
    }
    
    onDragEnd(e) {
      console.log('drag ends...');
    }
    
    onDragStart(e) {
        console.log('drag starts...');
        e.dataTransfer.setData('text/plain', e.target.id);
    }
  
    //  droppable
    onDragEnter(e) {
        console.log('onDragEnter');
        e.target.classList.add('drag-over');
        e.preventDefault();
  
    }
    onDragOver(e) {
        console.log('onDragOver');
        e.target.classList.add('drag-over');
        e.preventDefault();
  
    }

    onDragLeave(e) {
        e.target.classList.remove('drag-over');
        e.preventDefault();
  
    }

    // create the shuffled cards deck
    getDeck() {
        function getRandomInt(max) {
          return Math.floor(Math.random() * max);
        }
  
        const orderedDeck = [];
        cardDeck.forEach((element, index) => {
          const card = this.getTemplateCard(element, index);
          orderedDeck.push(card);  
        })
  
        const shuffledDeck = [];
        let deckIndex = orderedDeck.length;
        
        // get a randomCard and push in a newDeck and remove it from the old deck
        while (deckIndex !== 0) {
          const numberIndex = getRandomInt(deckIndex);
          const randomCard = orderedDeck[numberIndex];
          
          shuffledDeck.push(randomCard);
          orderedDeck.splice(numberIndex, 1);
          deckIndex = deckIndex -1;
        }
        
        return shuffledDeck;
      }


    // create the template of the card
    getTemplateCard(element, index) {
        return <Card
            className='carta-da-distribuire'
            id={`card-player-${index}`}
            backgroundImage={this.arrayImmagini[index]}
            key={`${index}`}
            title={`${index}`}
            draggable
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
            cardInfo={element}
          >
        </Card>
    }
  
    onDrop(e) {
      e.target.classList.remove('drag-over');
      // get the draggable element
      const id = e.dataTransfer.getData('text/plain');
      const draggable = document.getElementById(id);

      // add it to the drop target
      e.target.appendChild(draggable);
  
      // display the draggable element in correct way
      draggable.classList.add('carta-distribuita');
      draggable.classList.remove('carta-da-distribuire');

       // count the distribuited cards
       this.setState({
        distributed: this.state.distributed + 1
      })
      
    }
  
    onClick(){
        const cartaplayer1 = document.querySelectorAll('.player1 .carta-distribuita')[0];
        const cartaplayer2 = document.querySelectorAll('.player2 .carta-distribuita')[0];
        const mazzoScarti = document.getElementById('slush-pile-id');

        // take the index from the stored date in the title
        const index1 = cartaplayer1.getAttribute('title');
        const index2 = cartaplayer2.getAttribute('title');

        // search the cards' data
        const card1 = cardDeck[index1];
        const card2 = cardDeck[index2];

        // take the cards' value
        const value1 = card1.value;
        const value2 = card2.value;

        // take the cards' suit
        const suit1 = card1.suit;
        const suit2 = card2.suit;

        let winnerNameMessage;
        // check which is the biggest value beetween the two player's cards
        if (value1 > value2) {
            winnerNameMessage = `${this.state.playerName1} wins!`
            this.setState({
                playerPoints1: this.state.playerPoints1 + 1
            })
        } else if (value1 < value2) {
            winnerNameMessage = `${this.state.playerName2} wins!`
            this.setState({
                playerPoints2: this.state.playerPoints2 + 1
            })
        } else {
            // check which is the biggest suit value beetween the two player's cards when the values are the same
            switch (suit1) {
                case 'C':
                    winnerNameMessage = `${this.state.playerName1} wins!`
                    this.setState({
                        playerPoints1: this.state.playerPoints1 + 1
                    })
                    break;
                case 'Q':
                    if (suit2 === 'C') {
                        winnerNameMessage = `${this.state.playerName2} wins!`
                        this.setState({
                            playerPoints2: this.state.playerPoints2 + 1
                        })
                    }
                    else {
                        winnerNameMessage = `${this.state.playerName1} wins!`
                        this.setState({
                            playerPoints1: this.state.playerPoints1 + 1
                        })
                    }
                    break;
                case 'F':
                    if (suit2 === 'C' || suit2 === 'Q') {
                        winnerNameMessage = `${this.state.playerName2} wins!`
                        this.setState({
                            playerPoints2: this.state.playerPoints2 + 1
                        })
                    }
                    else {
                        winnerNameMessage = `${this.state.playerName1} wins!`
                        this.setState({
                            playerPoints1: this.state.playerPoints1 + 1
                        })
                    }
                    break;
                case 'P':
                        winnerNameMessage = `${this.state.playerName2} wins!`
                        this.setState({
                            playerPoints2: this.state.playerPoints2 + 1
                        })
                    break;
                default: winnerNameMessage = 'Nobody wins...:('
            }
            
        }

        alert(winnerNameMessage);

        // discard the used card
        mazzoScarti.appendChild(cartaplayer1);
        mazzoScarti.appendChild(cartaplayer2);
        
        // set the number of distribuited card to 0 again (as initial state)
        this.setState({
            distributed: 0
        })

    }
    
  
    render() {
    return (
    <Wrapper>
        <GameArea className='game-area-card'>  
         <Title>Card game</Title>
            <PlayArea className='play-area'>
                <PlayerArea>
                    <CardDecks
                    >   
                    {this.state.cards}
                    </CardDecks>
                </PlayerArea>
                <PlayerArea>
                    <Player1 
                        className={'player1'}
                        onDragEnter={this.onDragEnter}
                        onDragOver={this.onDragOver}
                        onDragLeave={this.onDragLeave}
                        onDrop={this.onDrop}>
                    </Player1>
                    <InfoWrapper>
                            {this.state.playerName1}
                        <PointsBadge>
                            {this.state.playerPoints1}
                        </PointsBadge>
                    </InfoWrapper>
                </PlayerArea>   
                <PlayerArea> 
                    <Player2 
                        className={'player2'}
                        onDragEnter={this.onDragEnter}
                        onDragOver={this.onDragOver}
                        onDragLeave={this.onDragLeave}
                        onDrop={this.onDrop}> 
                    </Player2>
                    <InfoWrapper>
                            {this.state.playerName2}
                        <PointsBadge>
                            {this.state.playerPoints2}
                        </PointsBadge>
                    </InfoWrapper>
                </PlayerArea>
                <PlayerArea>  
                    <MazzoScarti
                        id='slush-pile-id'
                        className='slush-pile'>
                    </MazzoScarti>
                    <InfoWrapper>
                        Mazzo degli scarti
                    </InfoWrapper>
            </PlayerArea> 
            </PlayArea>

            <Button
                className='fight-button'
                backgroundColor={this.state.distributed < 2 ? 'rgba(68,133,139, 0.5)' : 'rgba(68,133,139, 1)'}
                distributedCard={this.state.distributed >= 2}
                disabled={this.state.distributed < 2}
                onClick={this.onClick
                }>
                Fight!
            </Button>
        
        </GameArea>
      </Wrapper>
    );
  }
}
  
  GameTable.defaultProps = {
  
  };
  
  export default GameTable;