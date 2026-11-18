export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  citation: string;
  kind: 'journal' | 'chapter';
  summary: string;
  links: { label: string; href: string }[];
  selected?: boolean;
  coFirstAuthors?: string[];
  figure?: { src: string; alt: string; width: number; height: number };
  // Journal commentary about this paper, e.g. a Cell Press Preview.
  highlight?: { note: string; title: string; href: string };
}

// Shared by the homepage and full publication list.
export const publications: Publication[] = [
  {
    id: 'ap1-network-2026',
    title: 'Mechanistic modeling reveals a configurable AP-1 network governing cell-state heterogeneity and adaptive plasticity in melanoma cells',
    authors: ['Degefu YN', 'Bujnowska M', 'Baumann DG', 'Fallahi-Sichani M'],
    venue: 'Cell Reports',
    year: 2026,
    citation: '45(9):117965',
    kind: 'journal',
    selected: true,
    summary: 'Single-cell measurements and mechanistic modeling reveal how AP-1 network configurations shape melanoma cell states and adaptive plasticity.',
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1016/j.celrep.2026.117965' },
      { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/42721031/' },
      { label: 'Earlier preprint', href: 'https://doi.org/10.1101/2025.11.06.686987' },
    ],
    figure: {
      src: '/images/publications/ap1-network-cell-reports-2026.jpg',
      alt: 'Graphical abstract linking six AP-1 expression states, population-specific mechanistic models, and experimental tests of adaptive state transitions in melanoma.',
      width: 996,
      height: 996,
    },
  },
  {
    id: 'abscessus-synergies-2023',
    title: 'Novel synergies and isolate specificities in the drug interaction landscape of Mycobacterium abscessus',
    authors: ['Van N', 'Degefu YN', 'Leus PA', 'Larkins-Ford J', 'Klickstein J', 'Maurer FP', 'et al.'],
    venue: 'Antimicrobial Agents and Chemotherapy',
    year: 2023,
    citation: '67(7):e00090-23',
    kind: 'journal',
    summary: 'Systematic measurements reveal drug synergies and isolate-specific drug responses in M. abscessus.',
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1128/aac.00090-23' },
      { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/37278639/' },
    ],
  },
  {
    id: 'tb-design-principles-2022',
    title: 'Design principles to assemble drug combinations for effective tuberculosis therapy using interpretable pairwise drug response measurements',
    authors: ['Larkins-Ford J', 'Degefu YN', 'Van N', 'Sokolov A', 'Aldridge BB'],
    coFirstAuthors: ['Larkins-Ford J', 'Degefu YN'],
    venue: 'Cell Reports Medicine',
    year: 2022,
    citation: '3(9):100737',
    kind: 'journal',
    selected: true,
    summary: 'Pairwise drug response measurements guide the assembly of effective multidrug tuberculosis treatments.',
    highlight: {
      note: 'Highlighted in an accompanying Preview by Patterson & Palmer:',
      title: 'Predicting in vivo activity of combination therapies from in vitro drug pairs in diverse environments',
      href: 'https://doi.org/10.1016/j.xcrm.2022.100745',
    },
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1016/j.xcrm.2022.100737' },
      { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/36084643/' },
    ],
    figure: {
      src: '/images/publications/tb-design-principles-cell-reports-medicine-2022.jpg',
      alt: 'Graphical abstract showing pairwise drug measurements across growth conditions and reported treatment outcomes informing machine-learning predictions and design rules for multidrug therapies.',
      width: 996,
      height: 996,
    },
  },
  {
    id: 'rifamycin-2022',
    title: 'C25-modified rifamycin derivatives with improved activity against Mycobacterium abscessus',
    authors: ['Paulowski L', 'Beckham KSH', 'Johansen MD', 'Berneking L', 'Van N', 'Degefu YN', 'Staack S', 'et al.'],
    venue: 'PNAS Nexus',
    year: 2022,
    citation: '1(4):pgac130',
    kind: 'journal',
    summary: 'C25-modified rifamycin derivatives show enhanced activity against M. abscessus.',
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1093/pnasnexus/pgac130' },
      { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/36714853/' },
    ],
  },
  {
    id: 'tb-drug-landscapes-2021',
    title: 'Systematic measurement of combination-drug landscapes to predict in vivo treatment outcomes for tuberculosis',
    authors: ['Larkins-Ford J', 'Greenstein T', 'Van N', 'Degefu YN', 'Olson MC', 'Sokolov A', 'Aldridge BB'],
    venue: 'Cell Systems',
    year: 2021,
    citation: '12(11):1046–1063.e7',
    kind: 'journal',
    selected: true,
    summary: 'Drug combination landscapes and computational models connect in vitro measurements with in vivo tuberculosis treatment outcomes.',
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1016/j.cels.2021.08.004' },
      { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/34469743/' },
    ],
    figure: {
      src: '/images/publications/tb-drug-landscapes-cell-systems-2021.jpg',
      alt: 'Graphical abstract connecting in vitro drug combination measurements and published animal studies with computational models that predict in vivo tuberculosis treatment outcomes.',
      width: 996,
      height: 996,
    },
  },
  {
    id: 'sq109-2021',
    title: 'Pharmacokinetics and Target Attainment of SQ109 in Plasma and Human-Like Tuberculosis Lesions in Rabbits',
    authors: ['Egbelowo O', 'Sarathy JP', 'Gausi K', 'Zimmerman MD', 'Wang H', 'Wijnant GJ', 'Kaya F', 'Gengenbacher M', 'Van N', 'Degefu YN', 'Nacy C', 'et al.'],
    venue: 'Antimicrobial Agents and Chemotherapy',
    year: 2021,
    citation: '65(9):e0002421',
    kind: 'journal',
    summary: 'Pharmacokinetic measurements characterize SQ109 exposure and target attainment in tuberculosis lesions.',
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1128/AAC.00024-21' },
      { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/34228540/' },
    ],
  },
  {
    id: 'diamond-methods-2021',
    title: 'Efficient Measurement of Drug Interactions with DiaMOND (Diagonal Measurement of N-Way Drug Interactions)',
    authors: ['Van N', 'Degefu YN', 'Aldridge BB'],
    venue: 'Methods in Molecular Biology',
    year: 2021,
    citation: '2314:703–713',
    kind: 'chapter',
    summary: 'A protocol for using DiaMOND to efficiently measure multidrug interactions in bacterial systems.',
    links: [
      { label: 'Chapter', href: 'https://doi.org/10.1007/978-1-0716-1460-0_30' },
      { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/34235676/' },
    ],
  },
];
