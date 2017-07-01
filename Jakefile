let client = require('cheerio-httpcli')
let Twitter = require('twitter')
let FB = require('fb')

const MAX_BATCH_REQUEST = 50

desc('facebook')
task('facebook', () => {
  /*
  let fb = new Facebook.Facebook({
    access_token: process.env.FACEBOOK_ACCESS_TOKEN,    
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    version: '2.9'
  })
  */

  FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN)
  FB.api('https://www.facebook.com/profile.php?id=100008945136346', { metadata: 1 })
    .then((res) => {
      console.log('res: ', res.metadata.type);
    })
    .catch((error) => {
      console.error("error: ", error);
    })
})


desc('候補者一覧の取得')
task('default', (format = 'json', max = 3) => {
  client.fetch('http://www.h29togisen.metro.tokyo.jp/election/list.html', (err, $, res) => {

    let promises = [];
    let delay = 0;

    $('.contents section').each(function (idx) {
      if ($(this).attr('id') == null) { return; }

      if (format == 'debug' && idx > max) {
        format = 'json';
        return false;
      }

      // 選挙区
      promises.push(new Promise((resolve, error) => {
        resolve({
          area: $('h2', this).text().replace('選挙区', '')
        });
      }));

      // 選挙区ごとの候補者
      $('tbody tr', this).each(function (idx) {
        let candidate = parseCandidate($, $('td', this));
        let twitter_match = candidate.url.match(/Twitterのユーザー名　(.+)/);

        candidate.url = candidate.url == 'なし' ? '' : candidate.url

        if (candidate.url && twitter_match) {
          candidate.twitter_url = twitter_match[1];
          candidate.twitter_url = 'https://twitter.com/' + twitter_match[1];
          promises.push(new Promise((resolve, error) => {
            resolve(candidate);
          }));
        } else if (candidate.url) {
          promises.push(fetchHomePage(candidate, delay));
          delay += 200;
        } else {
          promises.push(new Promise((resolve, error) => {
            resolve(candidate);
          }));
        }
      });
    });

    Promise.all(promises)
      .then((candidates) => {
        return fetchTwitterProfile(candidates);
      })
      .then((candidates) => {
        return fetchFacebookProfile(candidates);
      })
      .then((candidates) => {
        if (format == 'csv') {
          formatCSV(candidates);
        } else {
          formatJSON(candidates);
        }
      })
      .catch((error) => {
        console.error("Promise.all error", error);
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

function parseLinks($, candidate) {
  $('a').each(function (idx) {
    let url = $(this).url();
    switch (true) {
      case /facebook\.com\/.+/.test(url):
        if (!/facebook\.com\/sharer/.test(url))
          candidate.facebook_url = url;
        break;
      case /twitter\.com\/.+/.test(url):
        if (!/twitter\.com\/share/.test(url) && !/twitter\.com\/intent/.test(url) && !/twitter\.com\/search/.test(url) && !/twitter\.com\/.+\/status/.test(url)) {
          if (!candidate.twitter_url)
            candidate.twitter_url = url.replace('@', '');
        }
        break;
      case /instagram\.com\/.+/.test(url):
        candidate.instagram_url = url;
        break;
      case /youtube\.com\/.+/.test(url):
        candidate.youtube_url = url;
        break;
      case /plus\.google\.com\/.+/.test(url):
        if (!/plus\.google\.com\/share/.test(url))
          candidate.googleplus_url = url;
        break;
    }
  });
}

function parseMeta($, candidate) {
  $('meta').each(function (idx) {
    switch (true) {
      case /twitter:site/.test($(this).attr('name')):
        candidate.twitter_url = 'https://twitter.com/' + $(this).attr('content').replace('@', '');
        break;
      case /og:description/.test($(this).attr('property')):
        if (!candidate.homepage_description)
          candidate.homepage_description = $(this).attr('content');
        break;
      case /description/.test($(this).attr('name')):
        if (!candidate.homepage_description)
          candidate.homepage_description = $(this).attr('content');
        break;
    }
  });
}

function fetchHomePage(candidate, delay) {
  return new Promise((resolve, error) => {
    setTimeout(() => {
      console.error("fetching: " + candidate.url);

      client.fetch(candidate.url)
        .then((result) => {
          if (result.err) {
            console.error("fetch url error: ", candidate.url);
            candidate.error = true;
            return resolve(candidate)
          }

          parseMeta(result.$, candidate)

          parseLinks(result.$, candidate)

          resolve(candidate)
        })
        .catch((error) => {
          console.error("client.fetch error: ", error)
          resolve(candidate)
        });
    }, delay);
  });
}

function fetchFacebookProfile(candidates) {
  FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN)

  facebook_users = candidates
    .filter((candidate) => {
      return candidate.facebook_url
    })

  let promises = []
  let delay = 0

  // check if the url is 'Page' or 'People'
  facebook_users.forEach((user) => {
    promises.push(fetchFacebookMeta(user, delay))
    delay += 500
  })

  return Promise.all(promises)
    .then((facebook_metas) => {
      let counter = facebook_metas.length
      let profiles = {}
      let delay = 0
      let promises = []
      let sliceIdx = 1
      let orig_facebook_metas = JSON.parse(JSON.stringify(facebook_metas))

      while (counter > 0) {
        promises.push(fetchFacebookProfileInfo(facebook_metas, orig_facebook_metas, profiles, delay))
        delay += 1000
        sliceIdx += MAX_BATCH_REQUEST
        counter -= MAX_BATCH_REQUEST
      }

      return Promise.all(promises)
        .then((facebook_profiles) => {

          return new Promise((resolve, error) => {
            let updated = candidates.map((candidate) => {
              if (candidate.facebook_url) {
                if (facebook_profiles[0][candidate.facebook_url]) {
                  candidate.facebook_profile = facebook_profiles[0][candidate.facebook_url].description
                }
              }
              return candidate
            })

            resolve(updated)
          })

        })
        .catch((error) => {
          console.error("twitter fetch error: ", error);
        })

    })
    .catch((error) => {
      console.error("facebook meta update error: ", error)
    })

}

function fetchFacebookMeta(user, delay) {
  return new Promise((resolve, error) => {
    console.error("fetching Facebook meta information: " + user.facebook_url)

    setTimeout(() => {
      FB.api(user.facebook_url, { metadata: 1 })
        .then((res) => {
          if (res.metadata.type == 'page') {
            resolve({
              id: res.id,
              orig_url: user.facebook_url,
              name: res.name,
              type: 'page',
              url: user.facebook_url
            })
          } else {
            resolve({
              id: res.id,
              orig_url: user.facebook_url,
              name: res.name,
              type: res.metadata.type,
              url: user.facebook_url
            })
          }
        })
        .catch((error) => {
          console.error("fetch meta error: " + user.facebook_url, error)
          resolve({
            id: null,
            orig_url: user.facebook_url,
            name: user.name,
            type: 'page',
            url: user.facebook_url
          })
        })
    }, delay)
  })
}

function fetchFacebookProfileInfo(facebook_metas, orig_facebook_metas, profiles, delay) {
  return new Promise((resolve, error) => {
    setTimeout(() => {
      let sliced_facebook_metas = facebook_metas.splice(0, MAX_BATCH_REQUEST)

      let batch_requests = sliced_facebook_metas.map((meta) => {
        if (meta.type == 'page') {
          return {
            method: 'get',
            relative_url: meta.id + '?fields=id,name,bio,about,mission,personal_info,affiliation,description'
          }
        } else {
          return {
            method: 'get',
            relative_url: meta.id,
            body: 'fields=id,name,bio,about,mission,personal_info,affiliation,description'
          }
        }

      })

      FB.api('', 'post', {
        batch: batch_requests
      })
        .then((responses) => {
          responses.forEach((res, idx) => {
            body = JSON.parse(res.body)
            if (body.personal_info) {
              console.error("body.personal_info: ", body.personal_info)
            }
            profiles[orig_facebook_metas[idx].orig_url] = {
              description: body.bio || body.personal_info || body.description || body.about
            }
          })

          resolve(profiles)
        })
        .catch((error) => {
          console.error("Facebook batch request error: ", error)
        })

    }, delay)
  })
}

function fetchTwitterProfile(candidates) {
  twitter_users = candidates.filter((candidate) => {
    return candidate.twitter_url
  })

  twitter_ids = twitter_users.map((user) => {
    return user.twitter_url.replace(/https?:\/\/twitter\.com\/(#!\/)?/, '');
  });

  let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  let promises = []
  let counter = twitter_ids.length
  const WINDOW = 50
  let profiles = {}
  let delay = 0

  while (counter > 0) {

    promises.push(new Promise((resolve, error) => {
      setTimeout(() => {
        sliced_twitter_ids = twitter_ids.splice(0, WINDOW)

        let options = { screen_name: sliced_twitter_ids.join(',') }

        client.post('users/lookup', options, (error, response) => {
          console.error("Twitter users/lookup: ", options)

          if (error) {
            console.error(error)
            throw error
          }

          response.forEach((twitter_user) => {
            profiles[twitter_user.screen_name.toLowerCase()] = {
              description: twitter_user.description,
              profile_image_url: twitter_user.profile_image_url
            }
          })

          resolve(profiles)
        })
      }, delay)
    }))
    delay += 1000
    counter -= WINDOW
  }

  return Promise.all(promises)
    .then((twitter_profiles) => {
      twitter_profiles = twitter_profiles[0]

      return new Promise((resolve, error) => {
        let updated = candidates.map((candidate) => {
          if (candidate.twitter_url) {
            let twitter_id = candidate.twitter_url.replace(/https?:\/\/twitter\.com\/(#!\/)?/, '').toLowerCase()

            if (twitter_profiles[twitter_id]) {
              candidate.twitter_profile = twitter_profiles[twitter_id].description
              candidate.twitter_profile_image_url = twitter_profiles[twitter_id].profile_image_url
            } else {
            }
          }
          return candidate
        })
        resolve(updated)
      })
    })
    .catch((error) => {
      console.error("twitter fetch error: ", error);
    })
}

function formatJSON(lines = []) {
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
