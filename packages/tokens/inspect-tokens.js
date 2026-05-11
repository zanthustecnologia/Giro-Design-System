import StyleDictionary from 'style-dictionary';

async function run(name, config) {
  console.log('--- ' + name + ' ---');
  const sd = new StyleDictionary(config);
  await sd.hasInitialized;

  console.log('sd.allTokens exists:', !!sd.allTokens);
  if (sd.allTokens) {
    console.log('Total tokens:', sd.allTokens.length);
    
    const paths = sd.allTokens.map(t => t.filePath).filter(Boolean);
    const counts = paths.reduce((acc, path) => {
      const normalized = path.replace(/\\/g, '/');
      if (normalized.includes('src/core')) acc.core++;
      else if (normalized.includes('src/semantic')) acc.semantic++;
      else if (normalized.includes('src/theme/dark')) acc.dark++;
      return acc;
    }, { core: 0, semantic: 0, dark: 0 });
    console.log('Token counts by filePath:', counts);
  } else {
    console.log('sd.allTokens is missing');
  }
}

await run('Core + Semantic', {
  include: ['src/core/**/*.json'],
  source: ['src/semantic/**/*.json']
});

await run('Core + Dark', {
  include: ['src/core/**/*.json'],
  source: ['src/theme/dark/**/*.json']
});
