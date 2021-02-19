import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharactersPage from '../pages/charactersPage';
import HousesPage from '../pages/housesPage';
import BooksPage from '../pages/booksPage';
import styled from 'styled-components';
import ErrorMsg from '../error';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BookItem from '../pages/bookItem';
import CharacterItem from '../pages/characterItem';
import HouseItem from '../pages/houseItem';
import gotService from '../../services/gotService';
import './app.css';

const Button = styled.div`
    background-color: black;
    border: 1px solid #00008B;
    width: 200px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 0 auto;
    margin-bottom: 20px;
    cursor: pointer;
    transition: .5s all;
    &:hover {
        transform: scale(1.1);
        transition: .5s all;
        color: black;
        background-color: #fff;
    }
`;

export default class App extends Component{

    gotService = new gotService();

    state = {
        showRandomChar: false,
        error: false
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar : !state.showRandomChar
                }
        });
    }

    render(){
        
        if(this.state.error){
            return <ErrorMsg/>
        }        

        const intro = document.querySelector('.intro'),
              app = document.querySelector('.app'),
              video = document.querySelector('.video');

        if(this.state.showRandomChar){
            intro.classList.add('app-height');
            app.classList.add('app-height');
            video.classList.add('app-height');
        } 

        const RandChar = this.state.showRandomChar ? <RandomChar getData={this.gotService.getCharacter}/>: null;


        return (
            <Router>
                    <div className="intro">
                        <div className="video">
                            <video src="video/got.mp4" className="video__media" autoPlay muted loop></video>
                        </div>
                        <div className="app">
                            <Container>
                                <Header />
                            </Container>
                            <Container>
                                <Row>
                                    <Col lg={{size: 6, offset: 3}} xs={{ size: 8, offset: 2 }} className="col">
                                        {RandChar}
                                        <Button onClick={this.toggleRandomChar}>Toggle RandomChar</Button>
                                    </Col>
                                </Row>
                                <Route path='/' exact render={() => {
                                    return (
                                            <>
                                                <h1 className="greetings main">I greet you, my dear Friend!</h1>
                                                <h2 className="greetings sub">Welcome to Game Of Thrones Universe<br></br>
                                                In this DataBase you can know all
                                                Resources of this world!</h2>
                                                <p className="greetings text">Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss for HBO. It is an adaptation of A Song of Ice and Fire, a series of fantasy novels by George R. R. Martin, the first of which is A Game of Thrones. The show was shot in the United Kingdom, Canada, Croatia, Iceland, Malta, Morocco, and Spain. It premiered on HBO in the United States on April 17, 2011, and concluded on May 19, 2019, with 73 episodes broadcast over eight seasons.<br></br><br></br>
                                                Set on the fictional continents of Westeros and Essos, Game of Thrones has a large ensemble cast and follows several story arcs throughout the course of the show. A major arc concerns the Iron Throne of the Seven Kingdoms of Westeros and follows a web of alliances and conflicts among the noble dynasties, either vying to claim the throne or fighting for independence from it. Another focuses on the last descendant of the realm's deposed ruling dynasty, who has been exiled to Essos and is plotting a return to the throne. A third story arc follows the Night's Watch, a military order defending the realm against threats from the North.<br></br><br></br>
                                                Game of Thrones attracted a record viewership on HBO and has a broad, active, and international fan base. Critics have praised the series for its acting, complex characters, story, scope, and production values, although its frequent use of nudity and violence (including sexual violence) has been subject to criticism. The final season received significant critical backlash for its reduced length and creative decisions, with many considering it a disappointing conclusion.</p>
                                            </>
                                            )
                                        }
                                    }/>
                                <Route path='/characters' component={CharactersPage} exact/>
                                <Route path='/characters/:id' render={({match}) => {
                                    const {id} = match.params;
                                    return <CharacterItem characterId={id}/>
                                }}/>
                                <Route path='/houses' component={HousesPage} exact/>
                                <Route path='/houses/:id' render={({match}) => {
                                    const {id} = match.params;
                                    return <HouseItem housesId={id}/>
                                }}/>
                                <Route path='/books' component={BooksPage} exact/>
                                <Route path='/books/:id' render={
                                    ({match, history, location}) => {
                                        console.log(history);
                                        console.log(location);
                                        console.log(match);
                                    const {id} = match.params;
                                    return <BookItem bookId={id}/>
                                }}/>
                            </Container>
                        </div>
                    </div>
            </Router>
        );
    }
}
