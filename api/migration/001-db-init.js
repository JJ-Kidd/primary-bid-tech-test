let res = [
  db.url.drop(),
  db.url.createIndex({ long_url: 1 }),
  db.url.createIndex({ short_url: 1 }, {unique: true }),
  db.url.insert({ long_url: 'www.google.com', short_url: '65qz4hva' }),
]

printjson(res)