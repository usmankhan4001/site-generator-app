import { ARCHETYPE_LIST, ARCHETYPES, STARTER_SETS } from '../src/site/archetypes';

for (const arch of ARCHETYPE_LIST) {
  console.log(`Checking archetype: ${arch.id}`);
  for (const starterId of arch.starterSetIds) {
    const set = STARTER_SETS[starterId];
    if (!set) {
      console.error(`  MISSING starter set: ${starterId}`);
    } else {
      console.log(`  ✓ ${starterId} -> ${set.name}`);
    }
  }
}
