const fs = require('fs');
const path = require('path');

// Years: 2021-2033
const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

// Europe only — countries match geographical hierarchy (image 3)
const regions = {
  Europe: ['U.K.', 'France', 'Spain', 'Italy', 'Russia', 'Slovenia', 'Netherlands', 'Sweden', 'Rest of Europe'],
};

// Segment types (order preserved: "By Type" → By Sampling Speed first for quick filters / defaults)
const segmentTypes = {
  'By Sampling Speed': {
    'Below 10 MS/s (Mid-Speed DAQ)': 0.28,
    '10–100 MS/s (High-Speed DAQ)': 0.26,
    '101 MS/s – 1 GS/s (Ultra-High-Speed DAQ)': 0.22,
    'Above 1 GS/s (Extreme High-Speed DAQ)': 0.24,
  },
  'By System Form Factor': {
    'Fixed / Installed Systems': 0.62,
    'Portable / Mobile Systems': 0.38,
  },
  'By Signal Type Configuration': {
    'Analog-Only DAQ Systems': 0.34,
    'Digital-Only DAQ Systems': 0.28,
    'Mixed-Signal DAQ Systems (Analog + Digital)': 0.38,
  },
  'By End User': {
    'Scientific Research Institutions': 0.18,
    'Telecommunications & Networking Companies': 0.14,
    'Aerospace & Defense Organizations': 0.12,
    'Industrial Manufacturing Enterprises': 0.22,
    'Energy & Power Sector Entities': 0.12,
    'Automotive & Transportation Companies': 0.12,
    'Healthcare & Medical Device Manufacturers': 0.1,
  },
  'By Deployment': {
    Laboratory: 0.42,
    'Industrial Floor': 0.35,
    'Field / Outdoor': 0.23,
  },
};

const regionBaseValues = {
  Europe: 420,
};

const countryShares = {
  Europe: {
    'U.K.': 0.14,
    France: 0.14,
    Spain: 0.11,
    Italy: 0.12,
    Russia: 0.13,
    Slovenia: 0.04,
    Netherlands: 0.1,
    Sweden: 0.08,
    'Rest of Europe': 0.14,
  },
};

const regionGrowthRates = {
  Europe: 0.112,
};

const segmentGrowthMultipliers = {
  'By Sampling Speed': {
    'Below 10 MS/s (Mid-Speed DAQ)': 0.96,
    '10–100 MS/s (High-Speed DAQ)': 1.02,
    '101 MS/s – 1 GS/s (Ultra-High-Speed DAQ)': 1.08,
    'Above 1 GS/s (Extreme High-Speed DAQ)': 1.12,
  },
  'By System Form Factor': {
    'Fixed / Installed Systems': 0.99,
    'Portable / Mobile Systems': 1.14,
  },
  'By Signal Type Configuration': {
    'Analog-Only DAQ Systems': 0.97,
    'Digital-Only DAQ Systems': 1.1,
    'Mixed-Signal DAQ Systems (Analog + Digital)': 1.05,
  },
  'By End User': {
    'Scientific Research Institutions': 1.06,
    'Telecommunications & Networking Companies': 1.1,
    'Aerospace & Defense Organizations': 1.04,
    'Industrial Manufacturing Enterprises': 1.0,
    'Energy & Power Sector Entities': 1.12,
    'Automotive & Transportation Companies': 1.08,
    'Healthcare & Medical Device Manufacturers': 1.03,
  },
  'By Deployment': {
    Laboratory: 0.98,
    'Industrial Floor': 1.04,
    'Field / Outdoor': 1.1,
  },
};

const volumePerMillionUSD = 52;

let seed = 42;
function seededRandom() {
  seed = (seed * 16807 + 0) % 2147483647;
  return (seed - 1) / 2147483646;
}

function addNoise(value, noiseLevel = 0.03) {
  return value * (1 + (seededRandom() - 0.5) * 2 * noiseLevel);
}

function roundTo1(val) {
  return Math.round(val * 10) / 10;
}

function roundToInt(val) {
  return Math.round(val);
}

function generateTimeSeries(baseValue, growthRate, roundFn) {
  const series = {};
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const rawValue = baseValue * Math.pow(1 + growthRate, i);
    series[year] = roundFn(addNoise(rawValue));
  }
  return series;
}

function emptyLeavesForSegmentType(segType) {
  const out = {};
  for (const name of Object.keys(segmentTypes[segType])) {
    out[name] = {};
  }
  return out;
}

function buildSegmentationAnalysis() {
  const europeCountries = regions.Europe;
  const byRegionEurope = {};
  europeCountries.forEach((c) => {
    byRegionEurope[c] = {};
  });

  const europeEntry = {
    'By Region': {
      Europe: byRegionEurope,
    },
  };

  for (const segType of Object.keys(segmentTypes)) {
    europeEntry[segType] = emptyLeavesForSegmentType(segType);
  }

  return { Europe: europeEntry };
}

function generateData(isVolume) {
  const data = {};
  const roundFn = isVolume ? roundToInt : roundTo1;
  const multiplier = isVolume ? volumePerMillionUSD : 1;

  for (const [regionName, countries] of Object.entries(regions)) {
    const regionBase = regionBaseValues[regionName] * multiplier;
    const regionGrowth = regionGrowthRates[regionName];

    data[regionName] = {};
    for (const [segType, segments] of Object.entries(segmentTypes)) {
      data[regionName][segType] = {};
      for (const [segName, share] of Object.entries(segments)) {
        const segGrowth = regionGrowth * segmentGrowthMultipliers[segType][segName];
        const segBase = regionBase * share;
        data[regionName][segType][segName] = generateTimeSeries(segBase, segGrowth, roundFn);
      }
    }

    for (const country of countries) {
      const cShare = countryShares[regionName][country];
      const countryBase = regionBase * cShare;
      const countryGrowthVariation = 1 + (seededRandom() - 0.5) * 0.04;
      const countryGrowth = regionGrowth * countryGrowthVariation;

      data[country] = {};
      for (const [segType, segments] of Object.entries(segmentTypes)) {
        data[country][segType] = {};
        for (const [segName, share] of Object.entries(segments)) {
          const segGrowth = countryGrowth * segmentGrowthMultipliers[segType][segName];
          const segBase = countryBase * share;
          const shareVariation = 1 + (seededRandom() - 0.5) * 0.1;
          data[country][segType][segName] = generateTimeSeries(segBase * shareVariation, segGrowth, roundFn);
        }
      }
    }
  }

  return data;
}

seed = 42;
const valueData = generateData(false);
seed = 7777;
const volumeData = generateData(true);

const outDir = path.join(__dirname, 'public', 'data');
fs.writeFileSync(path.join(outDir, 'value.json'), JSON.stringify(valueData, null, 2));
fs.writeFileSync(path.join(outDir, 'volume.json'), JSON.stringify(volumeData, null, 2));
fs.writeFileSync(
  path.join(outDir, 'segmentation_analysis.json'),
  JSON.stringify(buildSegmentationAnalysis(), null, 2)
);

console.log('Generated value.json, volume.json, segmentation_analysis.json');
console.log('Top-level geographies in value:', Object.keys(valueData));
console.log('Segment types:', Object.keys(valueData.Europe));
console.log('Sample Europe / By Sampling Speed:', valueData.Europe['By Sampling Speed']);
