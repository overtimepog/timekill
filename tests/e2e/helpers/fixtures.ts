/**
 * MIT License
 *
 * Copyright (c) 2025 TimeKill
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export const SAMPLE_NOTES = {
  biology: `# Biology Study Notes

## Cell Structure
- Cell membrane: Controls what goes in and out of the cell
- Nucleus: Contains DNA and controls cell activities  
- Mitochondria: Powerhouse of the cell, produces energy
- Ribosomes: Site of protein synthesis

## Photosynthesis Process
1. Light-dependent reactions occur in thylakoid membrane
2. Calvin cycle occurs in stroma
3. Produces glucose and oxygen from carbon dioxide and water

## DNA Structure
- Double helix structure discovered by Watson and Crick
- Made up of nucleotides (A, T, G, C)
- Complementary base pairing: A-T and G-C`,

  history: `# World War II Timeline

## Key Events
- 1939: Germany invades Poland, war begins
- 1941: Pearl Harbor attack, US enters war
- 1942: Battle of Stalingrad begins
- 1944: D-Day landings in Normandy
- 1945: Germany surrenders, war in Europe ends

## Important Figures
- Winston Churchill: British Prime Minister
- Franklin D. Roosevelt: US President
- Adolf Hitler: German dictator
- Joseph Stalin: Soviet leader`,

  math: `# Calculus Fundamentals

## Derivatives
- Definition: Rate of change at a point
- Power rule: d/dx(x^n) = nx^(n-1)
- Product rule: d/dx(uv) = u'v + uv'
- Chain rule: d/dx(f(g(x))) = f'(g(x)) * g'(x)

## Integrals
- Definition: Area under a curve
- Fundamental theorem: ∫f'(x)dx = f(x) + C
- Integration by parts: ∫udv = uv - ∫vdu`,

  shortText: `# Quick Notes
Key point: This is important information to remember.`,

  longText: `# Extended Study Material

This is a very long document that contains extensive information about various topics. It includes multiple sections, detailed explanations, examples, and comprehensive coverage of the subject matter. The purpose is to test how the system handles larger documents and ensures that all content is properly processed.

## Section 1: Introduction
This section provides background information and sets the context for the material that follows. It covers fundamental concepts and basic principles.

## Section 2: Advanced Topics
Here we delve into more complex subjects, building upon the foundation established in the introduction. This includes detailed analysis and sophisticated concepts.

## Section 3: Practical Applications
This section demonstrates how the theoretical knowledge can be applied in real-world scenarios. It includes case studies and examples.

## Section 4: Future Considerations
Looking ahead, this section explores emerging trends and potential developments in the field.`.repeat(10), // Make it really long
};

export const SAMPLE_STUDY_SETS = [
  {
    id: 'set_biology_123',
    name: 'Biology Basics',
    description: 'Fundamental concepts in biology',
    pairs: [
      {
        id: 'pair_1',
        term: 'Photosynthesis',
        definition: 'Process by which plants convert sunlight into energy',
        question: 'What process do plants use to convert sunlight into energy?',
        answer: 'Plants use photosynthesis to convert sunlight, carbon dioxide, and water into glucose and oxygen.',
      },
      {
        id: 'pair_2',
        term: 'Mitosis',
        definition: 'Process of cell division that produces two identical cells',
        question: 'What is the process called when a cell divides into two identical cells?',
        answer: 'Mitosis is the process of cell division that results in two genetically identical daughter cells.',
      },
    ],
  },
  {
    id: 'set_history_456',
    name: 'World War II',
    description: 'Key events and figures from WWII',
    pairs: [
      {
        id: 'pair_3',
        term: 'D-Day',
        definition: 'Allied invasion of Normandy on June 6, 1944',
        question: 'When did the Allied forces invade Normandy?',
        answer: 'The Allied forces invaded Normandy on June 6, 1944, in an operation known as D-Day.',
      },
    ],
  },
];

export function getRandomNotes(): string {
  const notes = Object.values(SAMPLE_NOTES);
  return notes[Math.floor(Math.random() * notes.length)];
}

export async function seedTestData(context: any) {
  // Mock API responses for test data
  await context.route('**/api/sets/**', (route: any) => {
    const url = route.request().url();
    if (url.includes('/api/sets/')) {
      const setId = url.split('/api/sets/')[1];
      const set = SAMPLE_STUDY_SETS.find(s => s.id === setId);
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(set || {}),
      });
    } else {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(SAMPLE_STUDY_SETS),
      });
    }
  });

  await context.route('**/api/parse-content', (route: any) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        submission: {
          id: 'submission_test_123',
          setName: 'Test Set',
        },
        pairs: SAMPLE_STUDY_SETS[0].pairs,
      }),
    });
  });

  await context.route('**/api/stats', (route: any) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        totalUsers: 1250,
        totalSets: 5678,
        totalPairs: 45678,
        totalCharactersHumanized: 2500000,
      }),
    });
  });
}