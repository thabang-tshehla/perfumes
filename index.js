const cheerio = require('cheerio');
const request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function Main (){

    var data = [];

    await request({
        method: 'GET',
        url: 'https://www.dotmade.co.za/product-category/men/men-fragrances/'
    }, (err, res, body) => {

        if (err) return console.error(err);

        let $ = cheerio.load(body);

        // products = $('div.shop-item-inner');
    
        $('div.shop-item-inner').each(function (i, e) {
            console.log($(e).find('.product-name').find('a').attr('href'));
            data.push(
                {
                    name: $(e).find('.product-name').text(),
                    price: $(e).find('bdi').text()
                }
            );
        });
    });

    console.log(data);
// const csvWriter = createCsvWriter({
    
//     path: 'data.csv',
//     header: [
//       {id: 'name', title: 'Name'},
//       {id: 'price', title: 'Price'},
//     ]
//   });

//   const data = [
//     {
//       name: 'John',
//       surname: 'Snow',
//       age: 26,
//       gender: 'M'
//     }, {
//       name: 'Clair',
//       surname: 'White',
//       age: 33,
//       gender: 'F',
//     }, {
//       name: 'Fancy',
//       surname: 'Brown',
//       age: 78,
//       gender: 'F'
//     }
//   ];
  
//   csvWriter
//     .writeRecords(data)
//     .then(()=> console.log('The CSV file was written successfully'));
}
Main();