export default class gotService {
    constructor(){
        this._api = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._api}${url}`);

        if(!res.ok){
            throw new Error(`Coudnt fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const characters = await this.getResource(`/characters?page=5&pageSize=12`);
        return characters.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const char = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(char);
    }

    getAllHouses = async () =>{
        const houses = await this.getResource('/houses');
        return houses.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    getAllBooks = async () => {
        const books = await this.getResource('/books');
        return books.map(this._transformBook);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    checkData(data){
        if(data){
            return data
        } else {
            return 'Sorry No-Data):'
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.checkData(char.name),
            gender: this.checkData(char.gender),
            born: this.checkData(char.born),
            died: this.checkData(char.died),
            culture: this.checkData(char.culture)
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.checkData(house.name),
            region: this.checkData(house.region),
            words: this.checkData(house.words),
            titles: this.checkData(house.titles),
            overlord: this.checkData(house.overlord),
            ancestralWeapons: this.checkData(house.ancestralWeapons)
        };
    }
    
    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.checkData(book.name),
            numberOfPages: this.checkData(book.numberOfPages),
            publisher: this.checkData(book.publisher),
            released: this.checkData(book.released)
        };
    }
}