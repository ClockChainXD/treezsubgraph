import { TypedMap, TypedMapEntry, ipfs, Wrapped, JSONValue, Bytes, log, json } from "@graphprotocol/graph-ts";

/* Converts a TypedMap<string, string> to a JSON-encoded string.*/
export function typedMapToJson(t: TypedMap<string, string>): string {
  let keyValues: string[] = [];
  for (let i = 0; i < t.entries.length; i++) {
    let entry: TypedMapEntry<string, string> = t.entries[i];
    keyValues.push('"' + entry.key + '":"' + entry.value + '"');
  }
  return "{" + keyValues.join(",") + "}";
}

export function getIpfsString(uri: string): string {
  
  let content = ipfs.cat(uri);

  return content.toString();
}
export function parseJsonFromIpfs(jsonUri: string): Wrapped<JSONValue> | null {
  const ipfsHash = jsonUri

  if (ipfsHash.length < 1) {
    log.warning('NO IPFS HASH FOUND WITH URI {}', [jsonUri]);
    return null;
  }

  let data = ipfs.cat(ipfsHash);
  if (!data || (data as Bytes).length < 1) {
    log.warning('JSON DATA FROM IPFS IS EMPTY {}', [ipfsHash]);
    return null;
  }

  const jsonData = json.fromBytes(data as Bytes);
  if (jsonData.isNull()) {
    log.warning('JSON DATA FROM IPFS IS NULL {}', [ipfsHash]);
    return null;
  }
  const jsonName=jsonData.toObject().get('name')
  if(jsonName)
  log.warning("show me json name!  : {}", [jsonName.toString()])
  
  return new Wrapped(jsonData);
};