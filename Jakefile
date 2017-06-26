desc ('候補者一覧の取得');
task('default', (params) => {
  let client = require('cheerio-httpcli');

  console.log("選挙区,定員,立候補者氏名,\"立候補者氏名（かな）\",性別,年齢,党派,新 現 元,ウェブサイト,Twitter ID,Facebook ID,LINE ID,YouTube URL,Instagram ID");

  client.fetch('http://www.h29togisen.metro.tokyo.jp/election/list.html', (err, $, res) => {
    $('section').each((idx) => {
      if ($(this).attr('id') == null) { return; }
      console.log($('h2', this).text().replace('選挙区', '') + ",,,,,,,,,,,,,"); 

      $('tbody tr', this).each(function(idx) {
        let cols = $('td', this);
        console.log(
          ',,'+
          $(cols[1]).text() + ',' +
          $(cols[2]).text() + ',' +
          $(cols[3]).text() + ',' +          
          $(cols[4]).text() + ',' +                    
          $(cols[5]).text() + ',' +                              
          $(cols[6]).text() + ',' +                                        
          $(cols[7]).text().replace(' ', '') + 
          ',,,,,'                                                  
        );
      });
    });
  }); 
  
});