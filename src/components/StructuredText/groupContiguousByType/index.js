/* @flow */

interface Element {
  type: string,
}

export default function groupContiguousByType(elements: Element[]): Element[][] {
  const groups = [];
  let groupStart = 0;
  let element = elements[0];
  let lastType = element && element.type;

  for (let i = 0; i <= elements.length; i += 1) {
    element = elements[i];
    if (!element || element.type !== lastType) {
      groups.push(elements.slice(groupStart, i));
      groupStart = i;
      lastType = element && element.type;
    }
  }

  return groups;
}
