import React from "react";
import querystring from "querystring";
import Span from "../components/span/Span";
import moment from "moment-timezone";
import { requestGet } from "./network";
import { saveAs } from "file-saver";

export const setItem = (k, v) => window.localStorage.setItem(k, v);
export const getItem = (k) => window.localStorage.getItem(k);

export const excelDownload = ({ url, query }) => {
  requestGet({
    url,
    query: {
      ...query,
      download: "excel",
    },
  })
    .then((x) => {
      const a = url.split("/").pop();
      const unit8arr = new Buffer.from(x.data);
      saveAs(new Blob([unit8arr]), a + ".xlsx");
    })
    .catch((e) => {
      alert(e.message || e);
    });
};

export const renderFileSelector = (ref, onChange) => {
  return (
    <input
      style={{ display: "none" }}
      type="file"
      onChange={(e) => {
        if (e.target.files) {
          const file = e.target.files[0];
          if (file) {
            const r = new FileReader();
            r.onloadend = () => {
              file.uri = r.result;
              onChange(file);
            };
            r.readAsDataURL(file);
          }
        }
        e.target.value = "";
      }}
      ref={ref}
    />
  );
};

export const getStreamUsed = (x) => {
  return x.startTime !== null ? (x.isUsed === 0 ? "green" : "gray") : "";
};

export const getUseStateLabel = (useState) => {
  switch (useState) {
    case "all":
      return "전체";
    case "member":
      return "회원";
    default:
      return "null";
  }
};

export const getKoTime = (date) => {
  if (date) {
    return moment(date).utc();
  }
};

export const defaultQuery = (obj) => ({
  limit: 15,
  page: 1,
  ...obj,
});

export const getMomentBefore = (v, unit) => {
  return moment().subtract(v, unit);
};

export const formatTime = (time, format) => {
  let m;
  if (time === "init") {
    m = moment();
  } else if (time === "agoWeek") {
    m = moment().subtract(7, "d");
  } else if (time) {
    m = moment(time);
  } else if (!time) {
    return "";
  }
  return m.format(format);
};

export const getGender = (gender) => {
  return gender === "male" ? "남자" : gender === "female" ? "여자" : "무";
};


export const queryStrToObj = (str) => {
  let result;
  if (!str) {
    result = {};
  } else {
    if (String(str).startsWith("?")) {
      str = str.replace("?", "");
    }
    result = querystring.decode(str);
  }
  return result;
};

export const replaceQuery = (history, location, obj, didmount) => {
  const existQuery = queryStrToObj(location.search);
  history.replace({
    pathname: location.pathname,
    search: querystring.encode(
      didmount ? { ...obj, ...existQuery } : { ...existQuery, ...obj }
    ),
    state: location.state,
  });
};
export const formatNum = (num) => {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num !== undefined ? num.toString().replace(regexp, ",") : "";
};

export const phoneFomatter = (num, type) => {
  if (!num) {
    return "";
  }
  var formatNum = "";

  if (num.length === 11) {
    if (type === 0) {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
    } else {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
  } else if (num.length === 8) {
    formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
  } else {
    if (num.indexOf("02") === 0) {
      if (type === 0) {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-****-$3");
      } else {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
      }
    } else {
      if (type === 0) {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-***-$3");
      } else {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      }
    }
  }

  return formatNum;
};

export const phoneExts = [
  "UnitedStatesofAmerica +1",
  "Afghanistan +93",
  "Albania +355",
  "Algeria +213",
  "AmericanSamoa +1-684",
  "Andorra +376",
  "Angola +244",
  "Anguilla +1-264",
  "Antarctica +672",
  "Antigua +1-268",
  "Argentina +54",
  "Armenia +374",
  "Aruba +297",
  "Ascension +247",
  "Australia +61",
  "AustralianExternalTerritories +672",
  "Austria +43",
  "Azerbaijan +994",
  "Bahamas +1-242",
  "Bahrain +973",
  "Bangladesh +880",
  "Barbados +1-246",
  "Barbuda +1-268",
  "Belarus +375",
  "Belgium +32",
  "Belize +501",
  "Benin +229",
  "Bermuda +1-441",
  "Bhutan +975",
  "Bolivia +591",
  "Bosnia&Herzegovina +387",
  "Botswana +267",
  "Brazil +55",
  "BritishVirginIslands +1-284",
  "BruneiDarussalam +673",
  "Bulgaria +359",
  "BurkinaFaso +226",
  "Burundi +257",
  "Cambodia +855",
  "Cameroon +237",
  "Canada +1",
  "CapeVerdeIslands +238",
  "CaymanIslands +1-345",
  "CentralAfricanRepublic +236",
  "Chad +235",
  "ChathamIsland(NewZealand) +64",
  "Chile +56",
  "China(PRC) +86",
  "ChristmasIsland +61-8",
  "Cocos-KeelingIslands +61",
  "Colombia +57",
  "Comoros +269",
  "Congo +242",
  "Congo,Dem.Rep.of(formerZaire) +243",
  "CookIslands +682",
  "CostaRica +506",
  "CôtedIvoire(IvoryCoast) +225",
  "Croatia +385",
  "Cuba +53",
  "Cuba(GuantanamoBay) +5399",
  "Curaçao +599",
  "Cyprus +357",
  "CzechRepublic +420",
  "Denmark +45",
  "DiegoGarcia +246",
  "Djibouti +253",
  "Dominica +1-767",
  "DominicanRepublic +1-809and +1-829",
  "EastTimor +670",
  "EasterIsland +56",
  "Ecuador +593",
  "Egypt +20",
  "ElSalvador +503",
  "Ellipso(MobileSatelliteservice) +8812and +8813",
  "EMSAT(MobileSatelliteservice) +88213",
  "EquatorialGuinea +240",
  "Eritrea +291",
  "Estonia +372",
  "Ethiopia +251",
  "FalklandIslands(Malvinas) +500",
  "FaroeIslands +298",
  "FijiIslands +679",
  "Finland +358",
  "France +33",
  "FrenchAntilles +596",
  "FrenchGuiana +594",
  "FrenchPolynesia +689",
  "GaboneseRepublic +241",
  "Gambia +220",
  "Georgia +995",
  "Germany +49",
  "Ghana +233",
  "Gibraltar +350",
  "GlobalMobileSatelliteSystem(GMSS) +881",
  "ICOGlobal +8810and +8811",
  "Ellipso8812 +8813",
  "Iridium8816 +8817",
  "Globalstar8818and8819",
  "Globalstar(MobileSatelliteService) +8818and +8819",
  "Greece +30",
  "Greenland +299",
  "Grenada +1-473",
  "Guadeloupe +590",
  "Guam +1-671",
  "GuantanamoBay +5399",
  "Guatemala +502",
  "Guinea-Bissau +245",
  "Guinea +224",
  "Guyana +592",
  "Haiti +509",
  "Honduras +504",
  "HongKong +852",
  "Hungary +36",
  "ICOGlobal(MobileSatelliteService) +8810and +8811",
  "Iceland +354",
  "India +91",
  "Indonesia +62",
  "Inmarsat(AtlanticOcean-East) +871",
  "Inmarsat(AtlanticOcean-West) +874",
  "Inmarsat(IndianOcean) +873",
  "Inmarsat(PacificOcean) +872",
  "InmarsatSNAC +870",
  "InternationalFreephoneService +800",
  "InternationalSharedCostService(ISCS) +808",
  "Iran +98",
  "Iraq +964",
  "Ireland +353",
  "Iridium(MobileSatelliteservice) +8816and +8817",
  "Israel +972",
  "Italy +39",
  "IvoryCoast +225",
  "Jamaica +1-876",
  "Japan +81",
  "Jordan +962",
  "Kazakhstan +7",
  "Kenya +254",
  "Kiribati +686",
  "Korea(North) +850",
  "Korea(South) +82",
  "Kuwait +965",
  "KyrgyzRepublic +996",
  "Laos +856",
  "Latvia +371",
  "Lebanon +961",
  "Lesotho +266",
  "Liberia +231",
  "Libya +218",
  "Liechtenstein +423",
  "Lithuania +370",
  "Luxembourg +352",
  "Macao +853",
  "Macedonia(FormerYugoslavRepof.) +389",
  "Madagascar +261",
  "Malawi +265",
  "Malaysia +60",
  "Maldives +960",
  "MaliRepublic +223",
  "Malta +356",
  "MarshallIslands +692",
  "Martinique +596",
  "Mauritania +222",
  "Mauritius +230",
  "MayotteIsland +269",
  "Mexico +52",
  "Micronesia(FederalStatesof) +691",
  "MidwayIsland +1-808",
  "Moldova +373",
  "Monaco +377",
  "Mongolia +976",
  "Montenegro +382",
  "Montserrat +1-664",
  "Morocco +212",
  "Mozambique +258",
  "Myanmar +95",
  "Namibia +264",
  "Nauru +674",
  "Nepal +977",
  "Netherlands +31",
  "NetherlandsAntilles +599",
  "Nevis +1-869",
  "NewCaledonia +687",
  "NewZealand +64",
  "Nicaragua +505",
  "Niger +227",
  "Nigeria +234",
  "Niue +683",
  "NorfolkIsland +672",
  "NorthernMarianasIslands(Saipan,Rota&Tinian) +1-670",
  "Norway +47",
  "Oman +968",
  "Pakistan +92",
  "Palau +680",
  "PalestinianSettlements +970",
  "Panama +507",
  "PapuaNewGuinea +675",
  "Paraguay +595",
  "Peru +51",
  "Philippines +63",
  "Poland +48",
  "Portugal +351",
  "PuertoRico +1-787or +1-939",
  "Qatar +974",
  "RéunionIsland +262",
  "Romania +40",
  "Russia +7",
  "RwandeseRepublic +250",
  "St.Helena +290",
  "St.Kitts/Nevis +1-869",
  "St.Lucia +1-758",
  "St.Pierre&Miquelon +508",
  "St.Vincent&Grenadines +1-784",
  "Samoa +685",
  "SanMarino +378",
  "SãoToméandPrincipe +239",
  "SaudiArabia +966",
  "Senegal +221",
  "Serbia +381",
  "SeychellesRepublic +248",
  "SierraLeone +232",
  "Singapore +65",
  "SlovakRepublic +421",
  "Slovenia +386",
  "SolomonIslands +677",
  "SomaliDemocraticRepublic +252",
  "SouthAfrica +27",
  "Spain +34",
  "SriLanka +94",
  "Sudan +249",
  "Suriname +597",
  "Swaziland +268",
  "Sweden +46",
  "Switzerland +41",
  "Syria +963",
  "Taiwan +886",
  "Tajikistan +992",
  "Tanzania +255",
  "Thailand +66",
  "Thuraya(MobileSatelliteservice) +88216",
  "TimorLeste +670",
  "TogoleseRepublic +228",
  "Tokelau +690",
  "TongaIslands +676",
  "Trinidad&Tobago +1-868",
  "Tunisia +216",
  "Turkey +90",
  "Turkmenistan +993",
  "TurksandCaicosIslands +1-649",
  "Tuvalu +688",
  "Uganda +256",
  "Ukraine +380",
  "UnitedArabEmirates +971",
  "UnitedKingdom +44",
  "UnitedStatesofAmerica +1",
  "USVirginIslands +1-340",
  "UniversalPersonalTelecommunications(UPT) +878",
  "Uruguay +598",
  "Uzbekistan +998",
  "Vanuatu +678",
  "VaticanCity +39and +379",
  "Venezuela +58",
  "Vietnam +84",
  "WakeIsland +808",
  "WallisandFutunaIslands +681",
  "Yemen +967",
  "Zambia +260",
  "Zanzibar +255",
  "Zimbabwe +263",
];
