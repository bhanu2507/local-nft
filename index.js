const Rarepress = require('rarepress');
(async () => {
  // 1. initialize
  const rarepress = new Rarepress()
  await rarepress.init({ network: "mainnet" });
  // 2. import a web image to fs
  let cid = await rarepress.fs.add("https://gateway.pinata.cloud/ipfs/QmSamcxdC3rhdZLo32g4zy2HD3ND1ich64quz33H2e4Emj")
  // 3. create a token and save to local rarepress, referencing the image
  let signedToken = await rarepress.token.create({
    type: "ERC721",
    metadata: {
      name: "??",
      description: "Lone Pink Flower",
      image: "/ipfs/" + cid
    },
  })
  console.log("signedToken", signedToken)

  // 4. publish the image file to IPFS
  await rarepress.fs.push(cid)
  // 5. publish the metadata file to IPFS
  await rarepress.fs.push(signedToken.tokenURI)

  // 6. publish the signed token to rarible
  let sent = await rarepress.token.send(signedToken)
  console.log("# SENT", sent)
  console.log(`Check your token at: https://rarible.com/token/${sent.id}`)

  // 7. Exit the program
  process.exit()
})();