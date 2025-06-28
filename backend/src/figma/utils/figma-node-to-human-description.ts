import { Color, FigmaNode } from '../types/figma-node.interface';

function describeColor(color?: Color): string {
  if (!color) return 'без цвета';
  const { r, g, b, a } = color;
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
}

export function figmaNodeToHumanDescription(
  node: FigmaNode,
  level: number = 0,
): string {
  const indent = '  '.repeat(level);
  const lines: string[] = [];

  // Основное описание
  lines.push(`${indent}• ${node.type} "${node.name}"`);

  // Размер и позиция
  if (node.absoluteBoundingBox) {
    lines.push(
      `${indent}  Размер: ${Math.round(node.absoluteBoundingBox.width)}×${Math.round(
        node.absoluteBoundingBox.height,
      )}, положение: x=${Math.round(node.absoluteBoundingBox.x)}, y=${Math.round(
        node.absoluteBoundingBox.y,
      )}`,
    );
  }

  // Цвет фона
  if (node.backgroundColor) {
    lines.push(`${indent}  Цвет фона: ${describeColor(node.backgroundColor)}`);
  }

  // Заливки
  if (node.fills && node.fills.length) {
    lines.push(
      `${indent}  Заливки: ${node.fills.map((f) => f.type).join(', ')}`,
    );
  }

  // Текстовые элементы
  if (node.characters) {
    lines.push(`${indent}  Текст: "${node.characters}"`);
    if (node.style) {
      if (node.style.fontFamily)
        lines.push(`${indent}  Шрифт: ${node.style.fontFamily}`);
      if (node.style.fontSize)
        lines.push(`${indent}  Размер шрифта: ${node.style.fontSize}`);
    }
  }

  // Вложенные элементы
  if (node.children && node.children.length) {
    lines.push(`${indent}  Вложенные элементы (${node.children.length}):`);
    node.children.forEach((child) => {
      lines.push(figmaNodeToHumanDescription(child, level + 1));
    });
  }

  return lines.join('\n');
}
