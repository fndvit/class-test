<script>
import * as d3 from 'd3'
import Streamgraph from './Streamgraph.svelte'
import Scroller from '@sveltejs/svelte-scroller';


let width = 1200;
let height = 500;

const normalizedCountries = [{"jhu":"Aruba","long":"Aruba","short":"Aru.","iso":"ABW","region":"PAHO"},
{"jhu":"Afghanistan","long":"Afghanistan","short":"Afg.","iso":"AFG","region":"EMRO"},
{"jhu":"Angola","long":"Angola","short":"An.","iso":"AGO","region":"AFRO"},
{"jhu":"Albania","long":"Albania","short":"Alb.","iso":"ALB","region":"EURO"},
{"jhu":"Andorra","long":"Andorra","short":"And.","iso":"AND","region":"EURO"},
{"jhu":"United Arab Emirates","long":"United Arab Emirates","short":"U.A.E.","iso":"ARE","region":"EMRO"},
{"jhu":"Argentina","long":"Argentina","short":"Arg.","iso":"ARG","region":"PAHO"},
{"jhu":"Armenia","long":"Armenia","short":"Arm.","iso":"ARM","region":"EURO"},
{"jhu":"Antigua and Barbuda","long":"Antigua and Barbuda","short":"A. and B.","iso":"ATG","region":"PAHO"},
{"jhu":"Australia","long":"Australia","short":"Aus.","iso":"AUS","region":"WPRO"},
{"jhu":"Austria","long":"Austria","short":"Au.","iso":"AUT","region":"EURO"},
{"jhu":"Azerbaijan","long":"Azerbaijan","short":"Aze.","iso":"AZE","region":"EURO"},
{"jhu":"Burundi","long":"Burundi","short":"Buru.","iso":"BDI","region":"AFRO"},
{"jhu":"Belgium","long":"Belgium","short":"Bel.","iso":"BEL","region":"EURO"},
{"jhu":"Benin","long":"Benin","short":"Benin","iso":"BEN","region":"AFRO"},
{"jhu":"Burkina Faso","long":"Burkina Faso","short":"B.F.","iso":"BFA","region":"AFRO"},
{"jhu":"Bangladesh","long":"Bangladesh","short":"Bangl.","iso":"BGD","region":"SEARO"},
{"jhu":"Bulgaria","long":"Bulgaria","short":"Bu.","iso":"BGR","region":"EURO"},
{"jhu":"Bahrain","long":"Bahrain","short":"Bah.","iso":"BHR","region":"EMRO"},
{"jhu":"Bahamas, The","long":"Bahamas, The","short":"Bah.","iso":"BHS","region":"PAHO"},
{"jhu":"Bosnia and Herzegovina","long":"Bosnia and Herzegovina","short":"B. and H.","iso":"BIH","region":"EURO"},
{"jhu":"Belarus","long":"Belarus","short":"Bela.","iso":"BLR","region":"EURO"},
{"jhu":"Belize","long":"Belize","short":"Belize","iso":"BLZ","region":"PAHO"},
{"jhu":"Bolivia","long":"Bolivia","short":"Bol.","iso":"BOL","region":"PAHO"},
{"jhu":"Brazil","long":"Brazil","short":"Brazil","iso":"BRA","region":"PAHO"},
{"jhu":"Barbados","long":"Barbados","short":"Barb.","iso":"BRB","region":"PAHO"},
{"jhu":"Brunei","long":"Brunei Darussalam","short":"Bru.","iso":"BRN","region":"WPRO"},
{"jhu":"Bhutan","long":"Bhutan","short":"Bhu.","iso":"BTN","region":"SEARO"},
{"jhu":"Botswana","long":"Botswana","short":"Bots.","iso":"BWA","region":"AFRO"},
{"jhu":"Central African Republic","long":"Central African Republic","short":"C.A.F.","iso":"CAF","region":"AFRO"},
{"jhu":"Canada","long":"Canada","short":"Can.","iso":"CAN","region":"PAHO"},
{"jhu":"Switzerland","long":"Switzerland","short":"Switz.","iso":"CHE","region":"EURO"},
{"jhu":"Chile","long":"Chile","short":"Chile","iso":"CHL","region":"PAHO"},
{"jhu":"China","long":"China","short":"China","iso":"CHN","region":"WPRO"},
{"jhu":"Cote d'Ivoire","long":"Cote d'Ivoire","short":"Ivo. Co.","iso":"CIV","region":"AFRO"},
{"jhu":"Cameroon","long":"Cameroon","short":"Cam.","iso":"CMR","region":"AFRO"},
{"jhu":"Congo (Kinshasa)","long":"Congo, Dem. Rep.","short":"D.R.C.","iso":"COD","region":"AFRO"},
{"jhu":"Congo (Brazzaville)","long":"Congo, Rep.","short":"Congo","iso":"COG","region":"AFRO"},
{"jhu":"Colombia","long":"Colombia","short":"Col.","iso":"COL","region":"PAHO"},
{"jhu":"Comoros","long":"Comoros","short":"Como.","iso":"COM","region":"AFRO"},
{"jhu":"Cabo Verde","long":"Cabo Verde","short":"C. Verde","iso":"CPV","region":"AFRO"},
{"jhu":"Cape Verde","long":"Cabo Verde","short":"C. Verde","iso":"CPV","region":"AFRO"},
{"jhu":"Costa Rica","long":"Costa Rica","short":"Co. Rica","iso":"CRI","region":"PAHO"},
{"jhu":"Cuba","long":"Cuba","short":"Cuba","iso":"CUB","region":"PAHO"},
{"jhu":"Cyprus","long":"Cyprus","short":"Cyprus","iso":"CYP","region":"EURO"},
{"jhu":"Czechia","long":"Czech Republic","short":"Cz. Rep.","iso":"CZE","region":"EURO"},
{"jhu":"Germany","long":"Germany","short":"Ger.","iso":"DEU","region":"EURO"},
{"jhu":"Djibouti","long":"Djibouti","short":"Dji.","iso":"DJI","region":"EMRO"},
{"jhu":"Dominica","long":"Dominica","short":"Domin.","iso":"DMA","region":"PAHO"},
{"jhu":"Denmark","long":"Denmark","short":"Den.","iso":"DNK","region":"EURO"},
{"jhu":"Dominican Republic","long":"Dominican Republic","short":"Dom. Rep.","iso":"DOM","region":"PAHO"},
{"jhu":"Algeria","long":"Algeria","short":"Alg.","iso":"DZA","region":"AFRO"},
{"jhu":"Ecuador","long":"Ecuador","short":"Ecu.","iso":"ECU","region":"PAHO"},
{"jhu":"Egypt","long":"Egypt, Arab Rep.","short":"Egy.","iso":"EGY","region":"EMRO"},
{"jhu":"Eritrea","long":"Eritrea","short":"Eri.","iso":"ERI","region":"AFRO"},
{"jhu":"Spain","long":"Spain","short":"Spa.","iso":"ESP","region":"EURO"},
{"jhu":"Estonia","long":"Estonia","short":"Est.","iso":"EST","region":"EURO"},
{"jhu":"Ethiopia","long":"Ethiopia","short":"Ethi.","iso":"ETH","region":"AFRO"},
{"jhu":"Finland","long":"Finland","short":"Fin.","iso":"FIN","region":"EURO"},
{"jhu":"Fiji","long":"Fiji","short":"Fiji","iso":"FJI","region":"WPRO"},
{"jhu":"France","long":"France","short":"Fra.","iso":"FRA","region":"EURO"},
{"jhu":"Micronesia","long":"Micronesia, Fed. Sts.","short":"Micr.","iso":"FSM","region":"WPRO"},
{"jhu":"Gabon","long":"Gabon","short":"Gabon","iso":"GAB","region":"AFRO"},
{"jhu":"United Kingdom","long":"United Kingdom","short":"U.K.","iso":"GBR","region":"EURO"},
{"jhu":"Georgia","long":"Georgia","short":"Geo.","iso":"GEO","region":"EURO"},
{"jhu":"Ghana","long":"Ghana","short":"Gha.","iso":"GHA","region":"AFRO"},
{"jhu":"Guinea","long":"Guinea","short":"Guinea","iso":"GIN","region":"AFRO"},
{"jhu":"Gambia, The","long":"Gambia, The","short":"Gamb.","iso":"GMB","region":"AFRO"},
{"jhu":"Guinea-Bissau","long":"Guinea-Bissau","short":"Gui.-B.","iso":"GNB","region":"AFRO"},
{"jhu":"Equatorial Guinea","long":"Equatorial Guinea","short":"Eq. Gui.","iso":"GNQ","region":"AFRO"},
{"jhu":"Greece","long":"Greece","short":"Gr.","iso":"GRC","region":"EURO"},
{"jhu":"Grenada","long":"Grenada","short":"Gre.","iso":"GRD","region":"PAHO"},
{"jhu":"Guatemala","long":"Guatemala","short":"Gua.","iso":"GTM","region":"PAHO"},
{"jhu":"Guyana","long":"Guyana","short":"Guy.","iso":"GUY","region":"PAHO"},
{"jhu":"Hong Kong","long":"Hong Kong SAR, China","short":"H.K.","iso":"HKG","region":"WPRO"},
{"jhu":"Honduras","long":"Honduras","short":"Hon.","iso":"HND","region":"PAHO"},
{"jhu":"Croatia","long":"Croatia","short":"Cro.","iso":"HRV","region":"EURO"},
{"jhu":"Haiti","long":"Haiti","short":"Haiti","iso":"HTI","region":"PAHO"},
{"jhu":"Hungary","long":"Hungary","short":"Hun.","iso":"HUN","region":"EURO"},
{"jhu":"Indonesia","long":"Indonesia","short":"Indo.","iso":"IDN","region":"SEARO"},
{"jhu":"India","long":"India","short":"India","iso":"IND","region":"SEARO"},
{"jhu":"Ireland","long":"Ireland","short":"Ire.","iso":"IRL","region":"EURO"},
{"jhu":"Iran","long":"Iran","short":"Iran","iso":"IRN","region":"EMRO"},
{"jhu":"Iraq","long":"Iraq","short":"Iraq","iso":"IRQ","region":"EMRO"},
{"jhu":"Iceland","long":"Iceland","short":"Ice.","iso":"ISL","region":"EURO"},
{"jhu":"Israel","long":"Israel","short":"Isr.","iso":"ISR","region":"EURO"},
{"jhu":"Italy","long":"Italy","short":"Ita.","iso":"ITA","region":"EURO"},
{"jhu":"Jamaica","long":"Jamaica","short":"Jam.","iso":"JAM","region":"PAHO"},
{"jhu":"Jordan","long":"Jordan","short":"Jor.","iso":"JOR","region":"EMRO"},
{"jhu":"Japan","long":"Japan","short":"Japan","iso":"JPN","region":"WPRO"},
{"jhu":"Cruise Ship","long":"Diamond Princess","short":"D. P. ship","iso":"JPN2","region":"WPRO"},
{"jhu":"Kazakhstan","long":"Kazakhstan","short":"Kaz.","iso":"KAZ","region":"EURO"},
{"jhu":"Kenya","long":"Kenya","short":"Ken.","iso":"KEN","region":"AFRO"},
{"jhu":"Kyrgyzstan","long":"Kyrgyz Republic","short":"Kyr.","iso":"KGZ","region":"EURO"},
{"jhu":"Cambodia","long":"Cambodia","short":"Camb.","iso":"KHM","region":"WPRO"},
{"jhu":"Kiribati","long":"Kiribati","short":"Kiri.","iso":"KIR","region":"WPRO"},
{"jhu":"St. Kitts and Nevis","long":"St. Kitts and Nevis","short":"Kna.","iso":"KNA","region":"PAHO"},
{"jhu":"Korea, South","long":"South Korea","short":"S. Kor.","iso":"KOR","region":"WPRO"},
{"jhu":"Kuwait","long":"Kuwait","short":"Ku.","iso":"KWT","region":"EMRO"},
{"jhu":"Lao PDR","long":"Lao PDR","short":"Laos","iso":"LAO","region":"WPRO"},
{"jhu":"Lebanon","long":"Lebanon","short":"Leb.","iso":"LBN","region":"EMRO"},
{"jhu":"Liberia","long":"Liberia","short":"Libe.","iso":"LBR","region":"AFRO"},
{"jhu":"Libya","long":"Libya","short":"Lib.","iso":"LBY","region":"EMRO"},
{"jhu":"Saint Lucia","long":"St. Lucia","short":"St. L.","iso":"LCA","region":"PAHO"},
{"jhu":"Liechtenstein","long":"Liechtenstein","short":"Lie.","iso":"LIE","region":"EURO"},
{"jhu":"Sri Lanka","long":"Sri Lanka","short":"Sri L.","iso":"LKA","region":"SEARO"},
{"jhu":"Lesotho","long":"Lesotho","short":"Les.","iso":"LSO","region":"AFRO"},
{"jhu":"Lithuania","long":"Lithuania","short":"Lith.","iso":"LTU","region":"EURO"},
{"jhu":"Luxembourg","long":"Luxembourg","short":"Lux.","iso":"LUX","region":"EURO"},
{"jhu":"Latvia","long":"Latvia","short":"Lat.","iso":"LVA","region":"EURO"},
{"jhu":"Macao","long":"Macao SAR, China","short":"Macao","iso":"MAC","region":"WPRO"},
{"jhu":"Morocco","long":"Morocco","short":"Mor.","iso":"MAR","region":"EMRO"},
{"jhu":"Monaco","long":"Monaco","short":"Mo.","iso":"MCO","region":"EURO"},
{"jhu":"Moldova","long":"Moldova","short":"Mold.","iso":"MDA","region":"EURO"},
{"jhu":"Madagascar","long":"Madagascar","short":"Mada.","iso":"MDG","region":"AFRO"},
{"jhu":"Maldives","long":"Maldives","short":"Mald.","iso":"MDV","region":"SEARO"},
{"jhu":"Mexico","long":"Mexico","short":"Mex.","iso":"MEX","region":"PAHO"},
{"jhu":"Marshall Islands","long":"Marshall Islands","short":"Mar. Is.","iso":"MHL","region":"WPRO"},
{"jhu":"North Macedonia","long":"Macedonia, FYR","short":"Mac.","iso":"MKD","region":"EURO"},
{"jhu":"Mali","long":"Mali","short":"Mali","iso":"MLI","region":"AFRO"},
{"jhu":"Malta","long":"Malta","short":"Malta","iso":"MLT","region":"EURO"},
{"jhu":"Myanmar","long":"Myanmar","short":"Mya.","iso":"MMR","region":"SEARO"},
{"jhu":"Montenegro","long":"Montenegro","short":"Mont.","iso":"MNE","region":"EURO"},
{"jhu":"Mongolia","long":"Mongolia","short":"Mon.","iso":"MNG","region":"WPRO"},
{"jhu":"Mozambique","long":"Mozambique","short":"Moz.","iso":"MOZ","region":"AFRO"},
{"jhu":"Mauritania","long":"Mauritania","short":"Mau.","iso":"MRT","region":"AFRO"},
{"jhu":"Martinique","long":"Martinique","short":"Mart.","iso":"MTQ","region":"EURO"},
{"jhu":"Mauritius","long":"Mauritius","short":"Maur.","iso":"MUS","region":"AFRO"},
{"jhu":"Malawi","long":"Malawi","short":"Mala.","iso":"MWI","region":"AFRO"},
{"jhu":"Malaysia","long":"Malaysia","short":"Mal.","iso":"MYS","region":"WPRO"},
{"jhu":"Namibia","long":"Namibia","short":"Nam.","iso":"NAM","region":"AFRO"},
{"jhu":"Niger","long":"Niger","short":"Niger","iso":"NER","region":"AFRO"},
{"jhu":"Nigeria","long":"Nigeria","short":"Nig.","iso":"NGA","region":"AFRO"},
{"jhu":"Nicaragua","long":"Nicaragua","short":"Nic.","iso":"NIC","region":"PAHO"},
{"jhu":"Netherlands","long":"Netherlands","short":"Neth.","iso":"NLD","region":"EURO"},
{"jhu":"Norway","long":"Norway","short":"Nor.","iso":"NOR","region":"EURO"},
{"jhu":"Nepal","long":"Nepal","short":"Nep.","iso":"NPL","region":"SEARO"},
{"jhu":"Nauru","long":"Nauru","short":"Nauru","iso":"NRU","region":"WPRO"},
{"jhu":"New Zealand","long":"New Zealand","short":"N.Z.","iso":"NZL","region":"WPRO"},
{"jhu":"Oman","long":"Oman","short":"Oman","iso":"OMN","region":"EMRO"},
{"jhu":"Pakistan","long":"Pakistan","short":"Pak.","iso":"PAK","region":"EMRO"},
{"jhu":"Panama","long":"Panama","short":"Pan.","iso":"PAN","region":"PAHO"},
{"jhu":"Peru","long":"Peru","short":"Peru","iso":"PER","region":"PAHO"},
{"jhu":"Philippines","long":"Philippines","short":"Phil.","iso":"PHL","region":"WPRO"},
{"jhu":"Palau","long":"Palau","short":"Palau","iso":"PLW","region":"WPRO"},
{"jhu":"Papua New Guinea","long":"Papua New Guinea","short":"Pap. N.G.","iso":"PNG","region":"WPRO"},
{"jhu":"Poland","long":"Poland","short":"Pol.","iso":"POL","region":"EURO"},
{"jhu":"Korea, Dem. People’s Rep.","long":"Korea, Dem. People’s Rep.","short":"N. Kor.","iso":"PRK","region":"WPRO"},
{"jhu":"Portugal","long":"Portugal","short":"Port.","iso":"PRT","region":"EURO"},
{"jhu":"Paraguay","long":"Paraguay","short":"Para.","iso":"PRY","region":"PAHO"},
{"jhu":"Qatar","long":"Qatar","short":"Qatar","iso":"QAT","region":"EMRO"},
{"jhu":"Kosovo","long":"Kosovo","short":"Kos.","iso":"RKS","region":"EURO"},
{"jhu":"Romania","long":"Romania","short":"Rom.","iso":"ROU","region":"EURO"},
{"jhu":"Russia","long":"Russian Federation","short":"Russia","iso":"RUS","region":"EURO"},
{"jhu":"Rwanda","long":"Rwanda","short":"Rwa.","iso":"RWA","region":"AFRO"},
{"jhu":"Saudi Arabia","long":"Saudi Arabia","short":"S. Ara.","iso":"SAU","region":"EMRO"},
{"jhu":"Sudan","long":"Sudan","short":"Sud.","iso":"SDN","region":"EMRO"},
{"jhu":"Senegal","long":"Senegal","short":"Sen.","iso":"SEN","region":"AFRO"},
{"jhu":"Singapore","long":"Singapore","short":"Sin.","iso":"SGP","region":"WPRO"},
{"jhu":"Solomon Islands","long":"Solomon Islands","short":"Solo. Is.","iso":"SLB","region":"WPRO"},
{"jhu":"Sierra Leone","long":"Sierra Leone","short":"S. Leone","iso":"SLE","region":"AFRO"},
{"jhu":"El Salvador","long":"El Salvador","short":"El Sal.","iso":"SLV","region":"PAHO"},
{"jhu":"San Marino","long":"San Marino","short":"S. Mar.","iso":"SMR","region":"EURO"},
{"jhu":"Somalia","long":"Somalia","short":"Som.","iso":"SOM","region":"EMRO"},
{"jhu":"Serbia","long":"Serbia","short":"Ser.","iso":"SRB","region":"EURO"},
{"jhu":"South Sudan","long":"South Sudan","short":"S. Sud.","iso":"SSD","region":"EMRO"},
{"jhu":"Sao Tome and Principe","long":"Sao Tome and Principe","short":"S.T. and P.","iso":"STP","region":"AFRO"},
{"jhu":"Suriname","long":"Suriname","short":"Suri.","iso":"SUR","region":"PAHO"},
{"jhu":"Slovakia","long":"Slovak Republic","short":"Slo. Rep.","iso":"SVK","region":"EURO"},
{"jhu":"Slovenia","long":"Slovenia","short":"Slo.","iso":"SVN","region":"EURO"},
{"jhu":"Sweden","long":"Sweden","short":"Swe.","iso":"SWE","region":"EURO"},
{"jhu":"Eswatini","long":"Eswatini","short":"Swazi.","iso":"SWZ","region":"AFRO"},
{"jhu":"Seychelles","long":"Seychelles","short":"Sey.","iso":"SYC","region":"AFRO"},
{"jhu":"Syrian Arab Republic","long":"Syrian Arab Republic","short":"Syr.","iso":"SYR","region":"EMRO"},
{"jhu":"Turks and Caicos Islands","long":"Turks and Caicos Islands","short":"Tca.","iso":"TCA","region":"PAHO"},
{"jhu":"Chad","long":"Chad","short":"Chad","iso":"TCD","region":"AFRO"},
{"jhu":"Togo","long":"Togo","short":"Togo","iso":"TGO","region":"AFRO"},
{"jhu":"Thailand","long":"Thailand","short":"Tha.","iso":"THA","region":"SEARO"},
{"jhu":"Tajikistan","long":"Tajikistan","short":"Taj.","iso":"TJK","region":"EURO"},
{"jhu":"Turkmenistan","long":"Turkmenistan","short":"Turkm.","iso":"TKM","region":"EURO"},
{"jhu":"East Timor","long":"Timor-Leste","short":"T.L.","iso":"TLS","region":"SEARO"},
{"jhu":"Tonga","long":"Tonga","short":"Tonga","iso":"TON","region":"WPRO"},
{"jhu":"Trinidad and Tobago","long":"Trinidad and Tobago","short":"T. and T.","iso":"TTO","region":"PAHO"},
{"jhu":"Tunisia","long":"Tunisia","short":"Tuni.","iso":"TUN","region":"EMRO"},
{"jhu":"Turkey","long":"Turkey","short":"Tur.","iso":"TUR","region":"EURO"},
{"jhu":"Taiwan*","long":"Taiwan","short":"Tw.","iso":"TWN","region":"WPRO"},
{"jhu":"Tanzania","long":"Tanzania","short":"Tanz.","iso":"TZA","region":"AFRO"},
{"jhu":"Uganda","long":"Uganda","short":"Ug.","iso":"UGA","region":"AFRO"},
{"jhu":"Ukraine","long":"Ukraine","short":"Ukr.","iso":"UKR","region":"EURO"},
{"jhu":"Uruguay","long":"Uruguay","short":"Uru.","iso":"URY","region":"PAHO"},
{"jhu":"US","long":"United States","short":"USA","iso":"USA","region":"PAHO"},
{"jhu":"Uzbekistan","long":"Uzbekistan","short":"Uzb.","iso":"UZB","region":"EURO"},
{"jhu":"Holy See","long":"Vatican","short":"Vatican","iso":"VAT","region":"EURO"},
{"jhu":"Saint Vincent and the Grenadines","long":"St. Vincent and the Grenadines","short":"Vct.","iso":"VCT","region":"PAHO"},
{"jhu":"Venezuela","long":"Venezuela, RB","short":"Ven.","iso":"VEN","region":"PAHO"},
{"jhu":"British Virgin Islands","long":"British Virgin Islands","short":"Br. V. Is.","iso":"VGB","region":"PAHO"},
{"jhu":"Vietnam","long":"Viet Nam","short":"Viet.","iso":"VNM","region":"WPRO"},
{"jhu":"Vanuatu","long":"Vanuatu","short":"Van.","iso":"VUT","region":"WPRO"},
{"jhu":"Samoa","long":"Samoa","short":"Samoa","iso":"WSM","region":"WPRO"},
{"jhu":"Yemen","long":"Yemen, Rep.","short":"Yemen","iso":"YEM","region":"EMRO"},
{"jhu":"South Africa","long":"South Africa","short":"S. Africa","iso":"ZAF","region":"AFRO"},
{"jhu":"Zambia","long":"Zambia","short":"Zambia","iso":"ZMB","region":"AFRO"},
{"jhu":"Zimbabwe","long":"Zimbabwe","short":"Zimb.","iso":"ZWE","region":"AFRO"},
{"jhu":"Timor-Leste","long":"Timor-Leste","short":"T.L.","iso":"TLS","region":"SEARO"},
{"jhu":"The Bahamas","long":"Bahamas, The","short":"Bah.","iso":"BHS","region":"PAHO"},
{"jhu":"The Gambia","long":"Gambia, The","short":"Gamb.","iso":"GMB","region":"AFRO"},
{"jhu":"Republic of the Congo","long":"Congo, Rep.","short":"Congo","iso":"COG","region":"AFRO"},
{"jhu":"Greenland","long":"Greenland","short":"Greenland","iso":"GRL","region":"EURO"},
{"jhu":"Puerto Rico","long":"Puerto Rico","short":"Puerto Rico","iso":"PRI","region":"PAHO"}]

let dates;
let parsedDeaths;
let stackedData;
let x;
let y;
let area;
let color;

const deathsRaw = d3.csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
.then(data => {
	dates = Object.keys(data[0])
		.slice(11)
		.map(d => new Date(d))

	parsedDeaths = data
	.map((d, i) => ({
		country: d['Country/Region'],
		lat: +d.Lat,
		lon: +d.Long,
		deaths: Object.values(data[i])
		.slice(12)
		.map(n => +n)
		.map((n, i, data) => (i > 0 ? n - data[i - 1] : n))
		.map((n, i, data) => d3.mean(data.slice(i - 6, i + 1)) || 0)
	}))

	const keys = Object.keys(deaths()[0]).slice(1,deaths().length - 1);

	const matchRegions = keys.map(d => {
		const match = normalizedCountries.find(dd => dd.jhu === d)
		const country = (match !== undefined) ? match.long : d;
		const region = (match !== undefined) ? match.region : 'unknown';
		return {country: d, region: region}
	})

	const regions = matchRegions.map(d => d.region)
  		.filter((d, i, a) => a.indexOf(d) === i)

	const sortedKeys = matchRegions.sort((a, b) => a.region == b.region ? 0 : +(a.region > b.region) || -1).map(d => d.country);


	stackedData = d3
		.stack()
		.keys(sortedKeys)
		.offset(d3.stackOffsetWiggle)
		(deaths())

	 x = d3
		.scaleUtc()
		.domain(d3.extent(dates, (d, i) => d))
		.range([0, width])

 	y = d3
		.scaleLinear()
		.domain([
			d3.min(stackedData, d => d3.min(d, d => d[0])),
			d3.max(stackedData, d => d3.max(d, d => d[1]))
		])
		.range([height, 0])

	area = d3
		.area()
		.curve(d3.curveCatmullRomOpen)
		.x((d, i) => x(dates[i]))
		.y1(d => y(d[1]))
		.y0(d => y(d[0]))

	color = d3.scaleSequential(d3.interpolateYlGnBu)
  		.domain([0, sortedKeys.length - 1])

})


function deaths() {

	return dates.map((d, i) => {
    const obj = { date: d };
    parsedDeaths.forEach(c => {
      if (!(c.country in obj)) {
        obj[c.country] = 0;
      }
      obj[c.country] += c.deaths[i];
    });
    return obj;
  }).slice(0, dates.length - 1)
}

let index;
let offset;
let progress;

const array = [...new Array(5)].map((d,i) => `Item ${i}`)

array.forEach((d,i) => {
	if(index === i) {

	}
})

</script>

<main>


<Scroller top={0.2} bottom={0.8} bind:index bind:offset bind:progress>
	<div slot="background">
		{#if stackedData}
			<Streamgraph data={stackedData} {color} {area} {width} {height} />
		{/if}
	  <p>Section {index + 1}, progress:{progress} offset:{offset} is currently active.</p>
	</div>
  
	<div slot="foreground">
		{#each array as d}
			<section>{d}</section>
		{/each}
	</div>
</Scroller>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	section {
		height:80vh;
	}

	:global(.graphic) {
		height:50vh;
		margin-bottom:3rem;
	}
</style>