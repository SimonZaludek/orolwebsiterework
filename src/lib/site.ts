export const company = {
	name: 'OROL, spol. s r.o.',
	legalName: 'OROL, spol. s.r.o.',
	ico: '36378313',
	dic: '2020126196',
	icDph: 'SK2020126196',
	foundedYear: 1998,
	copyrightYear: 2026
} as const;

export const contact = {
	phone: '+421 903 777 741',
	phoneHref: 'tel:+421903777741',
	landline: '+421 445 514 882',
	landlineHref: 'tel:+421445514882',
	email: 'stavebniny.orol@gmail.com',
	emailHref: 'mailto:stavebniny.orol@gmail.com',
	address: {
		street: 'Kpt. Nálepku 2218',
		city: 'Liptovský Mikuláš 031 01'
	}
} as const;

export const socials = {
	instagram: 'https://www.instagram.com/orol_stavebniny/',
	facebook: 'https://www.facebook.com/stavebninyOROL'
} as const;

export const openingHours = [
	{ day: 'Pondelok', hours: '7:00 – 16:00' },
	{ day: 'Utorok', hours: '7:00 – 16:00' },
	{ day: 'Streda', hours: '7:00 – 16:00' },
	{ day: 'Štvrtok', hours: '7:00 – 16:00' },
	{ day: 'Piatok', hours: '7:00 – 16:00' },
	{ day: 'Sobota', hours: '7:00 – 12:00' },
	{ day: 'Nedeľa', hours: 'Zatvorené' }
] as const;

export const navLinks = [
	{ href: '/services', label: 'Služby' },
	{ href: '/services/pozicovna-naradia', label: 'Požičovňa' },
	{ href: '/products', label: 'Produkty' },
	{ href: '/promotions', label: 'Akcie' },
	// Aktuality hidden for now — uncomment to restore the link in header + footer.
	// { href: '/news', label: 'Aktuality' },
	{ href: '/gallery', label: 'Galéria' },
	{ href: '/about', label: 'O nás' },
	{ href: '/contact', label: 'Kontakt' }
] as const;

export const legalLinks = [
	{ href: '/ochrana-osobnych-udajov', label: 'Ochrana osobných údajov' },
	{ href: '/cookies', label: 'Cookies' }
] as const;

export const products = [
	{
		href: '/products/hruba-stavba',
		title: 'Hrubá stavba',
		description:
			'Tehly, tvárnice, preklady, cement, vápno a všetko potrebné pre hrubú stavbu rodinného domu aj väčších objektov.',
		suppliers: [
			'Xella',
			'Porfix',
			'Wienerberger',
			'Heluz',
			'Schiedel',
			'Velox',
			'Swiss Krono',
			'Calmit',
			'Cementáreň Ladce',
			'ZOP Krby'
		]
	},
	{
		href: '/products/suche-zmesy-malty-omietky',
		title: 'Suché zmesy, malty a omietky',
		description:
			'Murovacie a omietkové zmesi, lepidlá, samonivelačné stierky a špeciálne malty pre interiér aj exteriér.',
		suppliers: ['Kreisel', 'Weber', 'Baumit', 'Knauf', 'Rigips', 'Cemix', 'Sakret', 'Sika']
	},
	{
		href: '/products/tepelne-izolacie',
		title: 'Tepelné izolácie',
		description:
			'Polystyrény, minerálne vlny a izolácie pre fasády, strechy, podlahy aj stropy vrátane systémových doplnkov.',
		suppliers: ['Isover', 'Knauf', 'Britterm', 'Likov', 'Austrotherm', 'Fibran', 'Klimas Wkręt-met']
	},
	{
		href: '/products/fasadne-a-interierove-farby',
		title: 'Fasádne omietky, fasádne a interiérové farby',
		description:
			'Tenkovrstvové fasádne omietky, fasádne aj interiérové farby, penetrácie a tónovanie priamo na predajni.',
		suppliers: ['Polifarbe', 'Baumit', 'Stachema', 'Barvy a laky']
	},
	{
		href: '/products/stresne-krytiny',
		title: 'Strešné krytiny',
		description:
			'Pálené aj betónové škridly, plechové krytiny, asfaltové šindle a kompletný systém doplnkov.',
		suppliers: ['Bramac', 'Bauweb', 'Tegola', 'Juta', 'Foliarex', 'Charvát']
	},
	{
		href: '/products/hydroizolacia',
		title: 'Hydroizolácia',
		description:
			'Asfaltové pásy, fólie a tekuté hydroizolácie pre základy, ploché strechy, balkóny a kúpeľne.',
		suppliers: ['Hasoft', 'Sika', 'Kreisel', 'Dechtochema', 'Charvát']
	},
	{
		href: '/products/stavebna-chemia',
		title: 'Stavebná chémia',
		description:
			'Stavebná chémia – PU peny, silikóny, tmely, lepidlá, prípravky proti vlhkosti aj plesniam.',
		suppliers: ['Ceresit', 'Sika', 'Soudal', 'Henkel', 'Penosil', 'Tytan']
	},
	{
		href: '/products/dlazby-betonove-tvarnice',
		title: 'Dlažby a betónové tvárnice',
		description:
			'Zámková dlažba, obrubníky, plotové tvárnice a betónové prvky pre exteriér a záhradnú architektúru.',
		suppliers: ['Chyžbet', 'Premac', 'Prefabeton Diviaky', 'Ströher', 'Vaspo', 'TopStone']
	},
	{
		href: '/products/betonarska-ocel',
		title: 'Betonárska oceľ',
		description:
			'Betonárska výstuž, kari siete, strmienky a viazací drôt pre základy, stropy aj armovanie konštrukcií.',
		suppliers: ['Raven']
	},
	{
		href: '/products/okna-a-dvere',
		title: 'Okná a dvere',
		description:
			'Plastové, hliníkové aj drevené okná, dvere a strešné okná na mieru – vrátane zamerania a montáže.',
		suppliers: ['Roto', 'Fakro', 'Velux', 'Anavek', 'Sapeli']
	},
	{
		href: '/products/kanalizacia-voda-sanita',
		title: 'Kanalizácia, voda a sanita',
		description:
			'Rúry a tvarovky pre kanalizáciu a vodovod, šachty, žumpy a sanitárne vybavenie kúpeľne.',
		suppliers: [
			'Keramika Soukup',
			'Alcadrain',
			'ACO',
			'Haco',
			'MEA',
			'Raven',
			'Pestan',
			'Martoni',
			'Böhm Extruplast'
		]
	},
	{
		href: '/products/naradie-a-doplnky',
		title: 'Náradie a doplnky',
		description:
			'Ručné aj elektrické náradie, murárske pomôcky, spojovací materiál a ochranné pracovné prostriedky.',
		suppliers: [
			'Makita',
			'Milwaukee',
			'Hilti',
			'Würth',
			'Fischer',
			'Dedra',
			'Herman',
			'Sola',
			'Storch',
			'Levelys',
			'Stalco'
		]
	}
] as const;

export const services = [
	{
		href: '/services/poradenstvo',
		title: 'Poradenstvo',
		short: 'Poradenstvo',
		description:
			'Odborné poradenstvo pri výbere stavebných materiálov, technológií a riešení pre hrubú stavbu, interiér aj exteriér.'
	},
	{
		href: '/services/stavbyveduci',
		title: 'Stavbyvedúci',
		short: 'Stavbyvedúci',
		description:
			'Sprostredkovanie skúsených stavbyvedúcich s certifikátom, ktorí dohliadnu na priebeh stavby a dodržiavanie technologických postupov.'
	},
	{
		href: '/services/cenova-ponuka',
		title: 'Vypracovanie cenovej ponuky',
		short: 'Cenová ponuka',
		description:
			'Bezplatné vypracovanie podrobnej cenovej ponuky na materiál podľa Vášho výkazu výmer alebo projektovej dokumentácie.'
	},
	{
		href: '/services/doprava',
		title: 'Doprava materiálu',
		short: 'Doprava materiálu',
		description:
			'Doprava stavebného materiálu priamo na stavbu vlastnými vozidlami s hydraulickou rukou v rámci celého regiónu.'
	},
	{
		href: '/services/pozicovna-naradia',
		title: 'Požičovňa náradia',
		short: 'Požičovňa náradia',
		description:
			'Krátkodobý aj dlhodobý prenájom stavebného a remeselníckeho náradia – miešačky, lešenia, búracie kladivá a ďalšie.'
	},
	{
		href: '/services/miesanie-farieb',
		title: 'Miešanie farieb',
		short: 'Miešanie farieb',
		description:
			'Tónovanie interiérových aj fasádnych farieb a omietok podľa vzorkovníkov RAL, NCS a ďalších priamo na predajni.'
	},
	{
		href: '/services/kontakty-na-remeselnikov',
		title: 'Kontakty na staviteľov, živnostníkov, remeselníkov a architektov',
		short: 'Kontakty na remeselníkov',
		description:
			'Odporúčame overených odborníkov z regiónu – murárov, tesárov, klampiarov, kúrenárov, architektov a ďalších remeselníkov.'
	}
] as const;

export const quoteCategories = [...products.map((p) => p.title), 'Viac kategórií / iné'] as const;

export const transportOptions = [
	{ value: 'potrebujem', label: 'Áno, potrebujem dopravu na stavbu' },
	{ value: 'odveziem', label: 'Nie, materiál si odveziem sám' },
	{ value: 'neviem', label: 'Nie som si istý / chcem poradiť' }
] as const;

export const mapsEmbedSrc =
	'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4681693755897!2d19.6254822!3d49.08351649999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47159948797ff9b9%3A0x4f4b8209e68f1ed1!2sOROL%2C%20spol.%20s.r.o.!5e0!3m2!1sen!2sfi!4v1778965070947!5m2!1sen!2sfi';
