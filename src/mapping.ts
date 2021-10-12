import { Address, BigInt, ipfs, json, JSONValue, JSONValueKind, Value } from "@graphprotocol/graph-ts"
import {
  avaxTreezNft,
  Approval,
  ApprovalForAll,
  ItemCreated,
  OwnershipTransferred,
  SaleStatusChanged,
  Transfer
} from "../generated/avaxTreezNft/avaxTreezNft"
import {avaxTreezNftMarket,itemSold,bidAddedToSale,itemAddedToSales} from "../generated/avaxTreezNftMarket/avaxTreezNftMarket";
import { Attribute, Nft, User , Trait, ItemsForSale } from "../generated/schema"
import {getIpfsString , parseJsonFromIpfs, typedMapToJson} from "../utils/data"



export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  



  // BigInt and BigDecimal math are supported
  

  // Entities can be written to the store with `.save()`

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.Items(...)
  // - contract.balanceOf(...)
  // - contract.baseUri(...)
  // - contract.claimedReward(...)
  // - contract.currentClaimRatio(...)
  // - contract.getApproved(...)
  // - contract.isAdmin(...)
  // - contract.isApprovedForAll(...)
  // - contract.isBlackListed(...)
  // - contract.itemLastClaimRatioAt(...)
  // - contract.mintingFee(...)
  // - contract.mintingFeePrice(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.ownerOf(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.totalReward(...)
  // - contract.totalSupply(...)
  // - contract.userCollection(...)
  // - contract.viewUserReward(...)
  // - contract.getHasSaleStarted(...)
  // - contract.mintedSupply(...)
  // - contract.tokenURI(...)
  // - contract.userCollections(...)
  // - contract.tokenCreator(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}
/* export function processAvaxTreezMetadata(value: JSONValue, userData: Value): void {
  const protonNftId = userData.toString();
  const avaxTreezMetadata = value.toObject();
  if (protonMetadata == null) { return; }


const attributes = avaxTreezMetadata.get('attributes').toArray();
for (let i = 0; i < attributes.length; i++) {
  const attrMap = attributes[i].toObject();

  let attrName = '';
  let attrValue = '';
  if (attrMap.isSet('trait_type')) {
    attrName = attrMap.get('trait_type').toString();
    attrValue = attrMap.get('value').toString();
  }

  const nftAttr = new Attribute(protonNftId.toString()+);
  nftAttr.protonNft = protonNftId;
  nftAttr.name = attrName;
  nftAttr.value = attrValue;
  nftAttr.save();
}
} */

export function handleItemCreated(event: ItemCreated): void {

 /*    let appleCount=new Trait("Apple Count")
    appleCount.name="Apple Count"
    appleCount.save()

     let bodyType=new Trait("Body Type")
    bodyType.name="Body Type"
    bodyType.save()

    let background=new Trait("Background")
    background.name="Background"
    background.save()

    let bodyTexture=new Trait("Body Texture")
    bodyTexture.name="Body Texture"
    bodyTexture.save()

    let stoneType=new Trait("Stone Type")
    stoneType.name="Stone Type"
    stoneType.save()

    let leafTexture=new Trait("Leaf Texture")
    leafTexture.name="Leaf Texture"
    leafTexture.save()

    let appleTexture=new Trait("Apple Texture")
    appleTexture.name="Apple Texture"
    appleTexture.save()

    let rarityScore=new Trait("Rarity Score")
    rarityScore.name="Rarity Score"
    rarityScore.save()
    let tier=new Trait("Tier")
    tier.name="Tier"
    tier.save()

    let animal=new Trait("Animal")
    animal.name="Animal"
    animal.save()

    let rank=new Trait("Rank")
    rank.name="Rank"
    rank.save()

  */


    let user= User.load(event.params.creator.toHex())
if(user==null){
user= new User(event.params.creator.toHex())
user.address=event.params.creator
}



  let nft= new Nft(event.params.tokenId.toString())
let contract= avaxTreezNft.bind(event.address)
  nft.owner=event.params.creator.toHex()
  nft.creator=event.params.creator.toHex()
  nft.token_id=event.params.tokenId
 nft.token_uri=contract.tokenURI(event.params.tokenId)

  // let cid=tokenUri.split("ipfs://")
/*   let realCid=cid[1]


 let tokenIpfs= parseJsonFromIpfs(realCid)


 


if(tokenIpfs){
 
  let nftTraits=nft.attributes
  nftTraits.push(tokenIpfs)
 */
    /* 
        
         let nftTraits=nft.attributes
       
       
       let attributesJson = tokenData['attributes']
       
       attributesJson.forEach(element => {
        let attribute= new Attribute(event.params.tokenId.toString()+element['trait_type'])
        let trait=new Trait(element['trait_type'])
        trait.name=element['trait_type']
        trait.save()
       
        attribute.trait_type=element['trait_type']
        attribute.value=element['value']
        attribute.save()
        nftTraits.push(attribute.id)
       }); */
 /*      nft.attributes=nftTraits
       nft.save() */
  // }

  

    nft.save()
let usernfts=user.nfts
usernfts.push(event.params.tokenId.toString())
user.nfts=usernfts
user.save()




}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleSaleStatusChanged(event: SaleStatusChanged): void {}

export function handleTransfer(event: Transfer): void {
  let user= User.load(event.params.to.toHex())
  if(user==null){
  user= new User(event.params.to.toHex())
  user.address=event.params.to
  }
  
  user.save()  

  let nft= Nft.load(event.params.tokenId.toString())
  if(nft){

    nft.owner=event.params.to.toHex()
    nft.save()
  }
  let user2= User.load(event.params.to.toHex())
let usernfts=user2.nfts
usernfts.push(event.params.tokenId.toString())
user2.nfts=usernfts
user2.save()

  


}

export function handleItemAddedToSales(event: itemAddedToSales): void {

   let contract = avaxTreezNftMarket.bind(event.address)
   let itemOnSale= contract.itemsForSale(event.params.saleID)
   let user= User.load(event.params.seller.toHex())
   

  let entity = Nft.load(itemOnSale.value2.toString())    
 
  let itemsOnSale= ItemsForSale.load(event.params.saleID.toString())
  if(itemsOnSale==null){
    itemsOnSale= new ItemsForSale(event.params.saleID.toString())
   
 
  }
  itemsOnSale.owner=event.params.seller.toHex()
  itemsOnSale.tokenID=entity.token_id
  itemsOnSale.tokenAddress=Address.fromString("0x0f720D665D55837baDF21a80721d0b8bb6A81b4F")
  itemsOnSale.askingPrice=event.params.askingPrice
  itemsOnSale.acceptedPaymentMethod=Address.fromString("0x0000000000000000000000000000000000000000")
  itemsOnSale.isSold=false
  itemsOnSale.save()

  entity.owner=event.params.seller.toHex()
  entity.price=event.params.askingPrice
  entity.sale_status=true
  entity.save()
  
  }
  export function handleBidAddedToSale(event: bidAddedToSale): void {

  }


  export function handleItemSold(event: itemSold): void {

    let itemsOnSale= ItemsForSale.load(event.params.saleID.toString())
    itemsOnSale.isSold=true
    itemsOnSale.owner=event.params.buyer.toHex()
    itemsOnSale.save()

    let nft= Nft.load(itemsOnSale.tokenID.toString())
    nft.sale_status=false
    nft.owner=event.params.buyer.toHex()
    nft.save()


  }