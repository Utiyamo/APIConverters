const express = require('express'),
app = express(),
port = process.env.PORT || 3000;

const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());


app.get('/binary', (req, res, next) => {
    const query = req.query;

    if(query){
        if(query.binaryNumber){
            const arrayNumbers = [];
            for(let i = 0; i < query.binaryNumber.length; i++){
                arrayNumbers.push(query.binaryNumber.substring(i, i+1));
            }

            const arrayResultSet = [];
            let count = arrayNumbers.length;
            arrayNumbers.map((number) => {
                arrayResultSet.push(number * (2**(count-1)));
                count--;
            });

            let result = 0;
            arrayResultSet.map(results => {
                result += results;
            });

            res.status(200);
            res.send(`Number_Decimal: ${result}`);
            return next();
        }
        else{
            res.status(400);
            res.send("Message: Error in BinaryNumber. Is Invalid");
            return next();
        }
    }
    else{
        res.status(400);
        res.send("Message: Error in queryParams");
        return next();
    }
})

app.get('/hexadecimal', (req, res, next) => {
    const query = req.query;

    if(query){
        if(query.hexadecimal){
            const enumHexa = [
                {text: '0',value: 0},
                {text: '1', value: 1},
                {text: '2', value: 2},
                {text: '3', value: 3},
                {text: '4', value: 4},
                {text: '5', value: 5},
                {text: '6', value: 6},
                {text: '7', value: 7},
                {text: '8', value: 8},
                {text: '9', value: 9},
                {text: 'A', value: 10},
                {text: 'B', value: 11},
                {text: 'C', value: 12},
                {text: 'D', value: 13},
                {text: 'E', value: 14},
                {text: 'F', value: 15}
            ];

            const array = [];
            for(let i = 0; i < query.hexadecimal.length; i++){
                array.push(query.hexadecimal.substring(i, i+1).toUpperCase());
            }

            const arrayNumbers = [];
            let count = query.hexadecimal.length;
            array.map((hexNumber) => {
                let index = enumHexa.find(e => e.text === hexNumber);
                arrayNumbers.push(index.value * (16 ** (count - 1)));
                count--;
            });

            let result = 0;
            arrayNumbers.map((results) => {
                result += results;
            });

            res.status(200);
            res.send(`Number Decimal: ${result}`);
        }
        else{
            res.status(400);
            res.send("Message: Error in hexadecimal Number");
            return next();
        }
    }
    else{
        res.status(400);
        res.send("Mesage: Error in query");
        return next();
    }
})

app.listen((port), () => {
    console.log(`Server started on port ${port}`);
});