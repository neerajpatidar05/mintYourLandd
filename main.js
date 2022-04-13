import "./style.css";
import { Feature, Map, View } from "ol";
import VectorTileLayer from "ol/layer/VectorTile";
import OSM from "ol/source/OSM";
import { createXYZ, wrapX } from "ol/tilegrid";
import { getArea } from "ol/sphere";
import { getBottomLeft, getTopRight } from "ol/extent";
import { transformExtent } from "ol/proj";
import apply from "ol-hashed";
import { fromExtent } from "ol/geom/Polygon";
import VectorTileSource from "ol/source/VectorTile";
import TileLayer from "ol/layer/Tile";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import { getKey } from "ol/tilecoord";
import axios from "axios";
import Contract from "./Contract";
import { popup } from "leaflet";

const mintData = {};
let activeMintKey;
const windowObj = window;
let currentAccount;
function getTileCoord(coordinate) {
  return wrapX(
    tileGrid,
    tileGrid.getTileCoordForCoordAndZ(coordinate, 18),
    map.getView().getProjection()
  );
}

function getMintKey(tileCoord) {
  return tileCoord.slice(1, 3).join("/");
}

async function mint(tileCoord, add) {
  const mintKey = getMintKey(tileCoord);
  const tileExtent = transformExtent(
    tileGrid.getTileCoordExtent(tileCoord),
    map.getView().getProjection(),
    "EPSG:4326"
  );
  if (add) {
    mintData[mintKey] = {
      squarefeet:
        getArea(fromExtent(tileExtent), {
          projection: "EPSG:4326",
        }) * 10.764,
      sw: getBottomLeft(tileExtent),
      ne: getTopRight(tileExtent),
    };
    console.log("mintdaaaaatatat11111", mintData[mintKey]);
    let ab = getKey(tileCoord);
    let [z, x, y] = ab.split("/");
    let tile = {
      x: x,
      y: y,
      z: z,
      lat: mintData[mintKey].sw[0],
      lng: mintData[mintKey].sw[1],
    };
    // alert(JSON.stringify(tile));
    var popupdisplay = document.getElementById("popupdisplay");
    popupdisplay.style.visibility = "visible";
    popupOnclick(tile, mintData[mintKey].squarefeet);
      console.log("mint");
      let callMintDom = document.getElementById("mint");
      console.log("mintdom",callMintDom);

      callMintDom.onclick = () => {
        axios
          .post("http://192.168.1.168:5001/api/ipfs", { tile })

          .then(async (res) => {
            console.log("res", res.data.ipfsHash);
            console.log("res", tile);
            if (windowObj.ethereum) {
              windowObj.ethereum
                .request({ method: "eth_requestAccounts" })
                .then(handleAccountsChanged)
                .catch((err) => {
                  if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log("Please connect to MetaMask.");
                  } else {
                    console.error(err);
                  }
                });
            }
            let url = "https://gateway.pinata.cloud/ipfs/" + res.data.ipfsHash;
            console.log("url", url);

            let callMintFunc = await Contract.safeMint(
              tile.x + "",
              tile.y + "",
              tile.z + "",
              tile.lat + "",
              tile.lng + "",
              url,
              { value: "1000000000000000000" }
            );
            console.log("callalalalalallalaal---- ", callMintFunc);
            alert("Transaction successful")
          })
          .catch((err) => {
            alert( err.data.message);
            console.log("err", err.data.message);
          });
      };

    let bcd = await Contract.getTileInfo(
      "0xcEEd5CCd6091aCb11c33577d21528cE793d79676"
    );
    console.log("bcd", bcd);
  } else {
    alert(`unminted ${JSON.stringify(mintData[mintKey])}`);
    delete mintData[mintKey];
  }
  mintedLayer.changed();
}

const tileGrid = createXYZ({ minZoom: 18, maxZoom: 18 });

const mintSource = new VectorTileSource({
  tileGrid: tileGrid,
  tileLoadFunction: function (tile) {
    const feature = new Feature(
      fromExtent(tileGrid.getTileCoordExtent(tile.tileCoord))
    );
    feature.setId(getMintKey(tile.tileCoord));
    tile.setFeatures([feature]);
  },
  url: "{z}/{x}/{y}",
});

const mintGridLayer = new VectorTileLayer({
  minZoom: 18,
  source: mintSource,
  style: new Style({
    stroke: new Stroke({
      width: 0.55,
      color: "red",
    }),
  }), 
});
 
console.log("mineeee", mintGridLayer);
const mintedLayer = new VectorTileLayer({
  minZoom: 18,
  source: mintSource,
  renderMode: "vector",
  style: function (feature) {
    const mintKey = feature.getId();
    return mintKey === activeMintKey
      ? new Style({
          stroke: new Stroke({
            width: 10,
            color: mintData[mintKey] ? "gray" : "green",
          }),
        }) 
      : undefined;
  },
}); 

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    mintGridLayer,
    mintedLayer,
  ],
  view: new View({
    center: [0, 0],
    maxZoom: 19,
    zoom: 3,
  }),
});

apply(map);
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log("Please connect to MetaMask.");
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // Do any other work!
  }
}

function popupOnclick(tile, sqFt) {
  console.log("pup", tile);
  var e = document.getElementById("popup");
  console.log("ee", e);
  e.innerHTML =
    "<div>Bounds</div> <div> SW: " +
    tile.lat +
    "," +
    tile.lng +
    ";, </div>\n <div> Size: " +
    sqFt +
    ",";
}

map.on("singleclick", function (event) {
  const tileCoord = getTileCoord(event.coordinate);
  const mintKey = getMintKey(tileCoord);
  mint(tileCoord, !(mintKey in mintData));
});

map.on("pointermove", function (event) {
  const tileCoord = getTileCoord(event.coordinate);
  activeMintKey = getMintKey(tileCoord);
  mintedLayer.changed();
});
