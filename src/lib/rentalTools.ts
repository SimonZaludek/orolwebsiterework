import demolitionPhoto from '$lib/assets/rental/hilti-demolition.jpg';
// Official Hilti product shots — usable under the company's distribution
// agreement as a licensed Hilti supplier. Only models whose photo really is
// the tool we rent; discontinued ones wait for our own photos (issue #2).
import productTe3000 from '$lib/assets/rental/hilti/te-3000-avr.png';
import productTe1000 from '$lib/assets/rental/hilti/te-1000-avr.png';
import productTe500 from '$lib/assets/rental/hilti/te-500-avr.png';
import productTe70 from '$lib/assets/rental/hilti/te-70.png';
// Hilti only publishes a shot of the AG 230-24D variant; ours is the 27DB
// (see our own photo, catalogued as Pozicovna/uhlová brúska-04).
import productAg230 from '$lib/assets/rental/hilti/ag-230-24d.png';
import productDgh130 from '$lib/assets/rental/hilti/dgh-130.png';
import productVc40 from '$lib/assets/rental/hilti/vc-40l-x.png';
// Manufacturer photos of the tool in use, for the detail-page hero.
import useTe3000 from '$lib/assets/rental/hilti/te-3000-avr-use.jpg';
import useTe1000 from '$lib/assets/rental/hilti/te-1000-avr-use.jpg';
import useTe500 from '$lib/assets/rental/hilti/te-500-avr-use.jpg';
import useTe70 from '$lib/assets/rental/hilti/te-70-use.jpg';
import useAg230 from '$lib/assets/rental/hilti/ag-230-use.jpg';
import useDgh130 from '$lib/assets/rental/hilti/dgh-130-use.jpg';
// Where Hilti no longer publishes the discontinued model, its successor's
// photo stands in — the page still names the model actually rented.
import productDch150 from '$lib/assets/rental/hilti/dch-150-sl.png';
import useDch150 from '$lib/assets/rental/hilti/dch-150-sl-use.jpg';
import cuttingPhoto from '$lib/assets/rental/hilti-cutting.png';
import cleaningPhoto from '$lib/assets/rental/hilti-cleaning.jpg';
// Non-Hilti machines: a product shot for the model plate, plus an action photo
// for the hero where we have one. The Dedra has none yet, so its product shot
// does both jobs.
import productScheppach from '$lib/assets/rental/scheppach-miesacka.png';
import productMixer50 from '$lib/assets/rental/mixer_station.png';
import productHonda from '$lib/assets/rental/honda-hsm1390ietdr.png';
import productDedra from '$lib/assets/rental/dedra-vybracna-zaba.png';
import productDedraSaw from '$lib/assets/rental/table-saw.png';
import productDedraSander from '$lib/assets/rental/dedra-7748-zirafa-bruska.png';
import productDedraHeater from '$lib/assets/rental/dedra-vyhrievac.png';
import productHermanVibrator from '$lib/assets/rental/herman-hve-113-vibrator.png';
import productDedraWasherLarge from '$lib/assets/rental/vysoko-tlakova-vapka.png';
import productDedraWasherCompact from '$lib/assets/rental/pressure-washer.png';
import useScheppach from '$lib/assets/rental/pouring-cement.jpg';
import useHonda from '$lib/assets/rental/freza-frezovanie.webp';
// Our own machine, photographed on site and cut out.
import productSokkia from '$lib/assets/rental/nivelacny-pristroj.webp';
import productSokkiaStaff from '$lib/assets/rental/Sokkia-meracia-lata.png';
import useSokkiaStaff from '$lib/assets/rental/measuring-stick.png';
import productMai from '$lib/assets/rental/mai-omietacka.png';
import dedraLogo from '$lib/assets/logos/Dedra.png';
import hermanLogo from '$lib/assets/logos/Herman.svg';
import sokkiaLogo from '$lib/assets/logos/Sokkia-logo.png';
import hondaLogo from '$lib/assets/logos/Honda.svg';
import scheppachLogo from '$lib/assets/logos/Scheppach.webp';

export interface RentalTool {
	slug: string;
	/** Substring used to link the catalogue list item to this page. */
	match: string;
	name: string;
	model: string;
	/** What the machine does, in two or three words — the model code alone
	 *  tells a visitor nothing, so the catalogue card prints this beneath it. */
	short: string;
	category: string;
	lead: string;
	uses: string[];
	specs: string[];
	/** Official Hilti Slovakia product page. Absent on non-Hilti machines. */
	hiltiUrl?: string;
	/**
	 * The maker, for machines that are not Hilti. Absent means Hilti, which is
	 * what the detail page falls back to — the bulk of the fleet.
	 */
	brand?: { name: string; logo?: string; url?: string };
	/**
	 * Set when this model is discontinued and `hiltiUrl` points at its
	 * successor — the page says so rather than pretending it is the same tool.
	 */
	hiltiSuccessor?: string;
	/** True when `productImage` shows the successor rather than this machine. */
	photoIsSuccessor?: boolean;
	/** Manufacturer photo of the tool in use — fills the detail-page hero. */
	useImage?: string;
	/** Official Hilti product shot, shown as a miniature beside the model. */
	productImage?: string;
	/** YouTube id of the manufacturer's instructional video, if one exists. */
	youtubeId?: string;
	image: string;
	/**
	 * The company's own Hilti photo of this tool, catalogued on Google Drive
	 * (content/google-drive-image-catalogue.jsonl). Swap `image` for it once the
	 * archive is pulled locally — see issue #2. Absent where the catalogue has
	 * no photo of the machine yet.
	 */
	drivePhotoId?: string;
}

export const rentalTools: RentalTool[] = [
	{
		slug: 'te-3000-avr',
		match: 'TE 3000-AVR',
		name: 'Búracie kladivo Hilti TE 3000-AVR',
		model: 'TE 3000-AVR',
		short: 'Búracie kladivo',
		category: 'Búranie a vŕtanie',
		lead: 'Najvýkonnejšie búracie kladivo v našej požičovni. Nahrádza ťažkú demolačnú techniku tam, kde sa s ňou nedá dostať – búranie betónových podláh, základov a priečok.',
		uses: [
			'Búranie betónových podláh a základových dosiek',
			'Demolácia priečok a nosných konštrukcií',
			'Práce, pri ktorých menšie kladivo už nestačí'
		],
		specs: ['Hmotnosť 27,1 kg', 'Energia jedného úderu 85 J', 'Upínanie TE-H (Hilti HEX 28)'],
		hiltiUrl:
			'https://www.hilti.sk/c/CLS_POWER_TOOLS_7124/CLS_DEMOLITION_HAMMER_BREAKER_SUB_7124/CLS_DEMOLITION_HAMMER_BREAKER_7124/r11668382',
		useImage: useTe3000,
		productImage: productTe3000,
		image: demolitionPhoto,
		drivePhotoId: '1aV97iMhaHhLyiNLlQTr1u3WWE8HrLbsd'
	},
	{
		slug: 'te-1000-avr',
		match: 'TE 1000-AVR',
		name: 'Búracie kladivo Hilti TE 1000-AVR',
		model: 'TE 1000-AVR',
		short: 'Búracie kladivo',
		category: 'Búranie a vŕtanie',
		lead: 'Univerzálne búracie kladivo pre podlahy a menšie demolácie. Dobrý pomer výkonu a hmotnosti pri práci v interiéri.',
		uses: [
			'Odstraňovanie dlažby, poterov a mazanín',
			'Búranie priečok a otvorov v murive',
			'Práca v interiéri, kde je dôležitá manipulovateľnosť'
		],
		specs: ['Hmotnosť 12,5 kg', 'Energia jedného úderu 26 J', 'Upínanie TE-S'],
		hiltiUrl:
			'https://www.hilti.sk/c/CLS_POWER_TOOLS_7125/CLS_DEMOLITION_HAMMER_BREAKER_SUB_7125/r9672135',
		useImage: useTe1000,
		productImage: productTe1000,
		image: demolitionPhoto,
		drivePhotoId: '14DpneincikbA4FmGZdZSyLX2-8srf1w-'
	},
	{
		slug: 'te-500-avr',
		match: 'TE 500-AVR',
		name: 'Sekacie kladivo Hilti TE 500-AVR',
		model: 'TE 500-AVR',
		short: 'Sekacie kladivo',
		category: 'Búranie a vŕtanie',
		lead: 'Ľahšie sekacie kladivo na presnú prácu – drážky, otvory a odstraňovanie obkladov bez zbytočného zaťaženia okolitých konštrukcií.',
		uses: [
			'Sekanie drážok pre rozvody',
			'Odstraňovanie obkladov a omietok',
			'Menšie búracie práce v interiéri'
		],
		specs: ['Hmotnosť 6,3 kg', 'Energia jedného úderu 8,5 J', 'Upínanie TE-Y (SDS Max)'],
		hiltiUrl:
			'https://www.hilti.sk/c/CLS_POWER_TOOLS_7125/CLS_DEMOLITION_HAMMER_BREAKER_SUB_7125/r7770032',
		useImage: useTe500,
		productImage: productTe500,
		image: demolitionPhoto,
		drivePhotoId: '1HLrGCBzTwgqa25JkTQKsfN89hIT748vX'
	},
	{
		slug: 'te-70',
		match: 'TE 70',
		name: 'Kombinované kladivo Hilti TE 70',
		model: 'TE 70-ATC/AVR',
		short: 'Kombinované kladivo',
		category: 'Búranie a vŕtanie',
		lead: 'Kombinované kladivo na vŕtanie veľkých priemerov aj sekanie. Jeden stroj pre prestupy, kotvenie aj búracie práce.',
		uses: [
			'Vŕtanie prestupov a otvorov väčších priemerov',
			'Kotvenie do betónu',
			'Sekacie práce bez výmeny stroja'
		],
		specs: ['Hmotnosť 10 kg', 'Energia jedného úderu 14,5 J', 'Vŕtanie 12 – 150 mm, SDS Max'],
		hiltiUrl: 'https://www.hilti.sk/c/CLS_POWER_TOOLS_7125/CLS_ROTARY_HAMMERS_7125/r6851673',
		useImage: useTe70,
		productImage: productTe70,
		image: demolitionPhoto,
		drivePhotoId: '1svCRkVX_xMlOgodLADC0FvOiW1FbZKBx'
	},
	{
		slug: 'ag-230',
		match: 'AG230',
		name: 'Uhlová brúska Hilti AG 230',
		model: 'AG 230-27DB',
		short: 'Uhlová brúska',
		category: 'Rezanie a brúsenie',
		lead: 'Veľká uhlová brúska na rezanie betónu, tehly a ocele. Kotúč 230 mm zvládne aj hrubšie prierezy.',
		uses: [
			'Rezanie betónu, tehál a dlažby',
			'Delenie ocelových profilov a výstuže',
			'Brúsenie a čistenie povrchov'
		],
		specs: ['Príkon 2 400 W', 'Kotúč 230 mm, hĺbka rezu 68 mm', 'Hmotnosť 6,5 kg'],
		hiltiUrl: 'https://www.hilti.sk/c/CLS_POWER_TOOLS_7125/CLS_GRINDERS_SANDERS_7125/r6118333',
		useImage: useAg230,
		productImage: productAg230,
		image: cuttingPhoto,
		drivePhotoId: '1IcljW0w_0Q8EplTd5HippRcw05mq7m45'
	},
	{
		slug: 'dgh-130',
		match: 'DGH 130',
		name: 'Brúska na betón Hilti DGH 130',
		model: 'DGH 130',
		short: 'Brúska na betón',
		category: 'Rezanie a brúsenie',
		lead: 'Brúska na betón na vyrovnávanie a čistenie betónových povrchov. Šesť rýchlostí a odsávanie prachu – oproti uhlovej brúske podstatne rýchlejší postup a takmer bezprašná práca.',
		uses: [
			'Zbrúsenie nerovností a prebytkov betónu',
			'Odstránenie zvyškov lepidla, náterov a stierok',
			'Príprava povrchu pred hydroizoláciou alebo poterom'
		],
		specs: ['Menovitý príkon 1 300 W', '6 rýchlostí, 3 000 – 8 700 ot/min', 'Hriadeľ 22,2 mm'],
		hiltiUrl: 'https://www.hilti.sk/c/CLS_POWER_TOOLS_7125/CLS_GRINDERS_SANDERS_7125/r7650029',
		useImage: useDgh130,
		productImage: productDgh130,
		image: cuttingPhoto
	},
	{
		slug: 'dc-se-20',
		match: 'DC-SE20',
		name: 'Drážkovací stroj Hilti DC-SE 20 DLX',
		model: 'DC-SE 20 DLX',
		short: 'Drážkovací stroj',
		category: 'Rezanie a brúsenie',
		lead: 'Drážkovačka na čisté drážky pre elektroinštaláciu a rozvody v murive a betóne, s odsávaním prachu.',
		uses: [
			'Drážky pre elektroinštaláciu a vodu',
			'Rezanie v tehle, betóne a pórobetóne',
			'Práca s odsávaním – menej prachu v interiéri'
		],
		specs: ['Kotúče 125 mm', 'Drážka do 40 × 46 mm', 'Hmotnosť 6,9 kg'],
		hiltiUrl: 'https://www.hilti.sk/c/CLS_POWER_TOOLS_7125/CLS_CONCRETE_SAWS_7125/r6703894',
		hiltiSuccessor: 'DCH 150-SL',
		photoIsSuccessor: true,
		useImage: useDch150,
		productImage: productDch150,
		image: cuttingPhoto,
		drivePhotoId: '1kVH9LeK5n7hqJ2Fbg5Y1OZRiqg8n78Jv'
	},
	{
		slug: 'vc-40l-x',
		match: 'VC 40L-X',
		name: 'Stavebný vysávač Hilti VC 40L-X',
		model: 'VC 40L-X',
		short: 'Stavebný vysávač',
		category: 'Meranie a čistenie',
		lead: 'Stavebný vysávač triedy L na mokré aj suché vysávanie. Pripája sa priamo k náradiu, automaticky si čistí filter a udrží stavbu bez prachu.',
		uses: [
			'Odsávanie prachu priamo pri náradí',
			'Vysávanie mokrých aj suchých nečistôt',
			'Upratanie stavby po búracích prácach'
		],
		specs: ['Kapacita nádoby 30 l', 'Trieda prašnosti L', 'Sací výkon 74 l/s'],
		hiltiUrl:
			'https://www.hilti.sk/c/CLS_DUST_WATER_MANAGEMENT/CLS_CONSTRUCTION_VACUUMS_DUST_EXTRACTORS/r21748819',
		productImage: productVc40,
		image: cleaningPhoto,
		// Our own photo shows a VC 40-U — same family, different variant.
		drivePhotoId: '1c51CYIRzoSs5GRWV-GgKlLgEw_SiIlo_'
	}
];

/**
 * Machines we rent that are not Hilti. They live apart from `rentalTools` so
 * the Hilti bento on the requester page stays Hilti — but they share the
 * shape, so the detail route serves them from the same template.
 */
export const otherTools: RentalTool[] = [
	{
		slug: 'scheppach-mix-180',
		match: 'MIX 180',
		name: 'Miešačka Scheppach MIX 180',
		model: 'MIX 180',
		short: 'Miešačka',
		category: 'Miešanie a betón',
		lead: 'Stavebná miešačka s objemom bubna 180 litrov na maltu, betón aj poter. Pojazdná na dvoch kolesách, so sklápaním bubna cez ručné koleso.',
		uses: [
			'Miešanie malty a betónu priamo na stavbe',
			'Príprava poteru a väčších dávok zmesi',
			'Dlhšie murárske a betonárske práce'
		],
		specs: ['Objem bubna 180 l', 'Príkon 800 W', 'Napájanie 230 V'],
		brand: { name: 'Scheppach', logo: scheppachLogo, url: 'https://www.scheppach.com' },
		useImage: useScheppach,
		productImage: productScheppach,
		image: useScheppach
	},
	{
		slug: 'battipav-mixer-50-super',
		match: 'MIXER 50 SUPER',
		name: 'Miešač Nuova Battipav MIXER 50 SUPER',
		model: 'MIXER 50 SUPER',
		short: 'Miešač lepidiel',
		category: 'Miešanie a betón',
		lead: 'Jednofázový miešač s núteným obehom na lepidlá, malty, omietky, farby aj epoxidové živice. Mieša priamo v 65-litrovom vedre a sklopná hlava s motorom umožní vedro vymeniť bez rozoberania stroja. Oceľový rám na dvoch kolieskach ho udrží pojazdný po stavbe.',
		uses: [
			'Miešanie lepidiel na obklady a dlažbu',
			'Príprava mált, omietok a samonivelačných zmesí',
			'Farby a epoxidové živice, kde treba rovnomernú zmes'
		],
		specs: [
			'PET vedro s objemom 65 l',
			'Príkon 1200 W, výkon 750 W, 60 ot/min',
			'Napájanie 230 V / 50 Hz, krytie IP 44'
		],
		brand: { name: 'Nuova Battipav', url: 'https://www.battipav.com' },
		useImage: productMixer50,
		productImage: productMixer50,
		image: productMixer50
	},
	{
		slug: 'honda-hsm1390i',
		match: 'HSM1390i',
		name: 'Snehová fréza Honda HSM1390i ETDR',
		model: 'HSM1390i ETDR',
		short: 'Snehová fréza',
		category: 'Sezónna technika',
		lead: 'Pásová snehová fréza s hybridným pohonom – motor poháňa slimák a elektromotory pásy. Poradí si aj s ťažkým mokrým snehom a s väčšími plochami.',
		uses: [
			'Odpratávanie snehu z dvorov a parkovísk',
			'Prejazdy a prístupové cesty k objektom',
			'Ťažký a zľadovatený sneh, kde ručná práca nestačí'
		],
		specs: ['Záberová šírka 92 cm', 'Motor Honda iGX390, 389 cm³', 'Dohoz snehu až 19 m'],
		brand: { name: 'Honda', logo: hondaLogo },
		useImage: useHonda,
		productImage: productHonda,
		image: useHonda
	},
	{
		slug: 'dedra-ded8830',
		match: 'DED8830',
		name: 'Vibračná doska Dedra DED8830',
		model: 'DED8830',
		short: 'Vibračná doska',
		category: 'Murivo a dlažba',
		lead: 'Benzínová vibračná doska na zhutnenie podkladu pod zámkovú dlažbu, chodníky a základy. Nezávislá od elektriny, takže pracuje kdekoľvek na pozemku.',
		uses: [
			'Zhutnenie štrkového lôžka pod zámkovú dlažbu',
			'Príprava podkladu pod chodníky a spevnené plochy',
			'Hutnenie zásypov okolo základov'
		],
		specs: ['Veľkosť dosky 420 × 550 mm', 'Motor Loncin 196 cm³', 'Hmotnosť 88 kg'],
		brand: { name: 'Dedra', logo: dedraLogo, url: 'https://www.dedra.pl' },
		useImage: productDedra,
		productImage: productDedra,
		image: productDedra
	},
	{
		slug: 'sokkia-c41',
		match: 'C41',
		name: 'Optický nivelačný prístroj Sokkia C41',
		model: 'C41',
		short: 'Nivelačný prístroj',
		category: 'Meranie a čistenie',
		lead: 'Optický nivelák na presné výškové merania na stavbe. Postavíte ho na statív, zhruba vyrovnáte podľa krabicovej libely a kompenzátor sa už o vodorovnú rovinu postará sám.',
		uses: [
			'Vytýčenie výšok základov, podláh a parapetov',
			'Kontrola spádu potrubia, dvorov a prístupových ciest',
			'Odmeranie horizontálnych uhlov cez vodorovný kruh'
		],
		specs: [
			'Zväčšenie ďalekohľadu 20×',
			'Presnosť 2,5 mm na 1 km dvojitej nivelácie',
			'Hmotnosť 1 kg'
		],
		brand: { name: 'Sokkia', logo: sokkiaLogo },
		useImage: productSokkia,
		productImage: productSokkia,
		image: productSokkia
	},
	{
		slug: 'mai-pump-m4g',
		match: 'M4G',
		name: 'Strojová omietačka MAI PUMP M4G economy',
		model: 'M4G economy',
		short: 'Strojová omietačka',
		category: 'Miešanie a betón',
		lead: 'Kontinuálna miešacia a čerpacia stanica na strojové omietanie. Suchú zmes premieša s vodou a načerpá hadicou priamo na stenu – za deň spravíte to, čo ručne trvá násobne dlhšie.',
		uses: [
			'Strojové omietanie stien a stropov',
			'Nanášanie vnútorných aj fasádnych omietok',
			'Čerpanie poterov a samonivelačných zmesí'
		],
		specs: ['Napájanie 3N~400 V / 50 Hz', 'Príkon 7,85 kW (17,7 A)', 'Hmotnosť 225 kg'],
		brand: { name: 'MAI', url: 'https://mai.at' },
		useImage: productMai,
		productImage: productMai,
		image: productMai
	},
	{
		slug: 'dedra-ded7823',
		match: 'DED7823',
		name: 'Rezačka obkladov a dlažby Dedra DED7823',
		model: 'DED7823',
		short: 'Rezačka obkladov',
		category: 'Murivo a dlažba',
		lead: 'Stolová rezačka s vodným chladením na obklady, dlažbu a kameň. Materiál vediete na posuvnom hliníkovom stole, takže rez je rovný po celej dĺžke a bez prachu.',
		uses: [
			'Rezanie obkladov, dlažby a prírodného kameňa',
			'Šikmé rezy 45° a 22,5° aj drážkovanie',
			'Dlhé presné rezy na posuvnom stole'
		],
		specs: [
			'Kotúč 250 mm (upínanie 25,4 mm)',
			'Hĺbka rezu 88 mm, dĺžka rezu 610 mm',
			'Príkon 1 650 W, chladenie vodou'
		],
		brand: { name: 'Dedra', logo: dedraLogo, url: 'https://www.dedra.pl' },
		useImage: productDedraSaw,
		productImage: productDedraSaw,
		image: productDedraSaw
	},
	{
		slug: 'dedra-ded7748',
		match: 'DED7748',
		name: 'Brúska na steny a stropy Dedra DED7748',
		model: 'DED7748',
		short: 'Brúska žirafa',
		category: 'Rezanie a brúsenie',
		lead: 'Vysokozdvižná brúska – žirafa – na stierku, sadrokartón a omietky. Kĺbová hlava kopíruje stenu aj strop a odsávanie cez hadicu odvedie väčšinu prachu preč z miestnosti.',
		uses: [
			'Prebrúsenie stierky na stenách a stropoch',
			'Zarovnanie škár a tmelených spojov sadrokartónu',
			'Príprava povrchov pred maľovaním bez lešenia'
		],
		specs: ['Príkon 710 W', 'Brúsny kotúč ⌀ 225 mm', 'Otáčky 1 000 – 2 000 ot./min'],
		brand: { name: 'Dedra', logo: dedraLogo, url: 'https://www.dedra.pl' },
		useImage: productDedraSander,
		productImage: productDedraSander,
		image: productDedraSander
	},
	{
		slug: 'dedra-ded9943',
		match: 'DED9943',
		name: 'Plynový ohrievač Dedra DED9943',
		model: 'DED9943',
		short: 'Plynový ohrievač',
		category: 'Sezónna technika',
		lead: 'Teplovzdušný ohrievač na propán-bután. Pripojíte ho na plynovú fľašu a rozohreje rozostavaný objekt aj halu tam, kde ešte nie je kúrenie.',
		uses: [
			'Vykurovanie rozostavaných objektov a hál v zime',
			'Vysúšanie omietok, poterov a stavebnej vlhkosti',
			'Temperovanie priestoru pred murovaním a maľovaním'
		],
		specs: [
			'Tepelný výkon 35 kW',
			'Prietok vzduchu 750 m³/h',
			'Plyn LPG (G30), spotreba 2,41 kg/h'
		],
		brand: { name: 'Dedra', logo: dedraLogo, url: 'https://www.dedra.pl' },
		useImage: productDedraHeater,
		productImage: productDedraHeater,
		image: productDedraHeater
	},
	{
		slug: 'herman-hve-113',
		match: 'HVE 113',
		name: 'Ponorný vibrátor betónu Herman HVE 113',
		model: 'HVE 113',
		short: 'Ponorný vibrátor',
		category: 'Miešanie a betón',
		lead: 'Pohonná jednotka ponorného vibrátora s ohybným hriadeľom. Vibračná hlavica vytlačí z čerstvého betónu vzduch, takže konštrukcia je celistvá a bez kaverien.',
		uses: [
			'Zhutnenie betónu v základoch a základových pásoch',
			'Vibrovanie vencov, stĺpov a debnených stien',
			'Betonáž dosiek, kde treba dostať vzduch z hmoty'
		],
		specs: ['Príkon 1 300 W', 'Otáčky hriadeľa 15 000 ot./min', 'Napájanie 230 V, hmotnosť 6,5 kg'],
		brand: { name: 'Herman', logo: hermanLogo, url: 'https://www.herman.sk' },
		useImage: productHermanVibrator,
		productImage: productHermanVibrator,
		image: productHermanVibrator
	},
	{
		slug: 'dedra-ded8825',
		match: 'DED8825',
		name: 'Vysokotlakový čistič Dedra DED8825',
		model: 'DED8825',
		short: 'Vysokotlakový čistič',
		category: 'Meranie a čistenie',
		lead: 'Silnejší z našich dvoch čističov. Indukčný motor a hliníkové čerpadlo znesú dlhšiu prácu v kuse, takže zvládne fasádu, dvor aj stroje po stavbe.',
		uses: [
			'Umývanie fasád, soklov a zámkovej dlažby',
			'Čistenie strojov, debnenia a miešačiek po betonáži',
			'Oplach dvorov a spevnených plôch pred kolaudáciou'
		],
		specs: ['Príkon 2 500 W', 'Tlak 130 bar (max. 195 bar)', 'Prietok 420 l/h, hadica 10 m'],
		brand: { name: 'Dedra', logo: dedraLogo, url: 'https://www.dedra.pl' },
		useImage: productDedraWasherLarge,
		productImage: productDedraWasherLarge,
		image: productDedraWasherLarge
	},
	{
		slug: 'dedra-ded8821',
		match: 'DED8821',
		name: 'Vysokotlakový čistič Dedra DED8821',
		model: 'DED8821',
		short: 'Vysokotlakový čistič',
		category: 'Meranie a čistenie',
		lead: 'Menší a ľahší čistič na bežné umývanie. Na kolesách s navijakom hadice sa s ním dobre presúva po dvore aj po stavbe.',
		uses: [
			'Umývanie náradia, fúrikov a drobnej techniky',
			'Oplach terás, chodníkov a plotov',
			'Kratšie čistenie, kde netreba plný výkon'
		],
		specs: ['Príkon 1 900 W', 'Tlak 100 bar (max. 130 bar)', 'Prietok 420 l/h, hadica 6 m'],
		brand: { name: 'Dedra', logo: dedraLogo, url: 'https://www.dedra.pl' },
		useImage: productDedraWasherCompact,
		productImage: productDedraWasherCompact,
		image: productDedraWasherCompact
	},
	{
		slug: 'sokkia-meracia-lata',
		match: 'Meracia lata',
		name: 'Meracia lata Sokkia',
		model: 'Meracia lata',
		short: 'Nivelačná lata',
		category: 'Meranie a čistenie',
		lead: 'Teleskopická lata do dvojice k nivelačnému prístroju. Postavíte ju na merané miesto a cez ďalekohľad z nej odčítate výšku – bez laty je nivelák polovica súpravy. Požičiavame dve, päťmetrovú a štvormetrovú.',
		uses: [
			'Odčítanie výšok pri nivelácii prístrojom Sokkia C41',
			'Vytýčenie výšky základov, podláh a parapetov',
			'Kontrola spádu terénu, dvorov a prístupových ciest'
		],
		specs: [
			'Dĺžka 5 m a 4 m – dve laty',
			'Teleskopická hliníková konštrukcia',
			'Stupnica s E-delením, odčítanie po 1 cm'
		],
		brand: { name: 'Sokkia', logo: sokkiaLogo },
		useImage: useSokkiaStaff,
		productImage: productSokkiaStaff,
		image: productSokkiaStaff
	}
];

/** Everything with a detail page, Hilti and otherwise. */
export const allRentalTools: RentalTool[] = [...rentalTools, ...otherTools];

export function toolForItem(item: string): RentalTool | undefined {
	return allRentalTools.find((t) => item.includes(t.match));
}

/**
 * Job-first navigation: people arrive knowing the work they need done, not the
 * model they want. Each entry maps a job to the machines that do it — a tool
 * can appear under several jobs.
 */
export interface ToolJob {
	id: string;
	label: string;
	hint: string;
	slugs: string[];
}

export const toolJobs: ToolJob[] = [
	{
		id: 'buranie',
		label: 'Búram',
		hint: 'Priečky, podlahy, základy',
		slugs: ['te-3000-avr', 'te-1000-avr', 'te-500-avr']
	},
	{
		id: 'vrtanie',
		label: 'Vŕtam',
		hint: 'Otvory, prestupy, kotvenie',
		slugs: ['te-70']
	},
	{
		id: 'rezanie',
		label: 'Režem',
		hint: 'Betón, tehla, dlažba',
		slugs: ['ag-230']
	},
	{
		id: 'brusenie',
		label: 'Brúsim betón',
		hint: 'Vyrovnanie a čistenie povrchov',
		slugs: ['dgh-130', 'ag-230']
	},
	{
		id: 'drazky',
		label: 'Robím drážky',
		hint: 'Elektrina, voda, kúrenie',
		slugs: ['dc-se-20', 'ag-230']
	},
	{
		id: 'cistenie',
		label: 'Odsávam prach',
		hint: 'Čistenie počas aj po práci',
		slugs: ['vc-40l-x', 'dgh-130']
	}
];

export function toolsForJob(jobId: string): RentalTool[] {
	if (jobId === 'all') return rentalTools;
	const job = toolJobs.find((j) => j.id === jobId);
	if (!job) return rentalTools;
	return job.slugs
		.map((s) => rentalTools.find((t) => t.slug === s))
		.filter((t): t is RentalTool => t !== undefined);
}
