desc('候補者一覧の取得');
task('default', (format = 'json') => {
  let client = require('cheerio-httpcli');

  client.fetch('http://www.h29togisen.metro.tokyo.jp/election/list.html', (err, $, res) => {

    let promises = [];
    let timeout = 0;

    $('.contents section').each(function (idx) {
      if ($(this).attr('id') == null) { return; }

      promises.push(new Promise((resolve, error) => {
        resolve({
          area: $('h2', this).text().replace('選挙区', '')
        });
      }));

      $('tbody tr', this).each(function (idx) {
        let candidate = parseCandidate($, $('td', this));
        let twitter_match = candidate.url.match(/Twitterのユーザー名　(.+)/);

        if (candidate.url && twitter_match) {
          candidate.twitter_url = twitter_match[1];
          candidate.twitter_url = 'https://twitter.com/' + twitter_match[1];
          promises.push(new Promise((resolve, error) => {
            resolve(candidate);
          }));
        } else if (candidate.url && candidate.url != 'なし') {
          promises.push(new Promise((resolve, error) => {
            setTimeout(() => {
              client.fetch(candidate.url, (err, $, res) => {
                if (err) {
                  console.error("fetch url error: ", candidate.url);
                  candidate.error = true;
                  return resolve(candidate);
                }

                $('a').each(function (idx) {
                  let url = $(this).url();
                  switch (true) {
                    case /facebook\.com/.test(url):
                      candidate.facebook_url = url;
                      break;
                    case /twitter\.com/.test(url):
                      if (!/twitter\.com\/share/.test(url))
                        candidate.twitter_url = url;
                      break;
                    case /instagram\.com/.test(url):
                      candidate.instagram_url = url;
                      break;
                    case /youtube\.com/.test(url):
                      candidate.youtube_url = url;
                      break;
                    case /plus\.google\.com/.test(url):
                      candidate.googleplus_url = url;
                      break;
                  }
                });
                resolve(candidate);
              });
            }, timeout);
            timeout += 200;
          }));
        } else {
          promises.push(new Promise((resolve, error) => {
            resolve(candidate);
          }));
        }
      });
    });

    Promise.all(promises).then((lines) => {
      if (format == 'csv') {
        formatCSV(lines);
      } else {
        formatJSON(lines);
      }
    });
  });
});

function parseCandidate($, cols) {
  return {
    id: $(cols[0]).text(),
    name: $(cols[1]).text(),
    kana: $(cols[2]).text(),
    sex: $(cols[3]).text(),
    age: $(cols[4]).text(),
    party: $(cols[5]).text(),
    type: $(cols[6]).text(),
    url: $(cols[7]).text().replace(' ', '')
  };
}

function formatJSON(lines) {
  let results = { data: [] };
  let current = null;

  lines.forEach((line) => {
    if (line && line.area) {
      current = {
        area: line.area,
        candidates: []
      };
      results.data.push(current);
    } else if (current) {
      current.candidates.push(line);
    }
  });

  console.log(JSON.stringify(results, null, 2));
}

function formatCSV(lines) {
  console.log("選挙区,定員,立候補者氏名,\"立候補者氏名（かな）\",性別,年齢,党派,新 現 元,ウェブサイト,Twitter URL,Facebook ID,YouTube URL,Instagram ID,Google+ URL,処理エラー");
  lines.forEach((line) => {
    if (line && line.area) {
      console.log(line.area + ',,,,,,,,,,,,,,');
    } else if (line) {
      console.log(
        ',,' +
        (line.name || '') + ',' +
        (line.kana || '') + ',' +
        (line.sex || '') + ',' +
        (line.age || '') + ',' +
        (line.party || '') + ',' +
        (line.type || '') + ',' +
        (line.url || '') + ',' +
        (line.twitter_url || '') + ',' +
        (line.facebook_url || '') + ',' +
        (line.youtube_url || '') + ',' +
        (line.instagram_url || '') + ',' +
        (line.googleplus_url || '') + ',' +
        (line.error || '')
      );
    }
  });
}
