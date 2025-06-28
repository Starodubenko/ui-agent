import { FigmaNode } from '../../figma/types/figma-node.interface';

export function figmaNodeToDescription(node: FigmaNode): string {
  const lines: string[] = [];
  lines.push(`Тип: ${node.type}`);
  lines.push(`Название: ${node.name}`);
  if (node.characters) lines.push(`Текст: ${node.characters}`);
  if (node.absoluteBoundingBox)
    lines.push(
      `Размеры: ${node.absoluteBoundingBox.width}x${node.absoluteBoundingBox.height} (позиция: x=${node.absoluteBoundingBox.x}, y=${node.absoluteBoundingBox.y})`,
    );
  if (node.backgroundColor)
    lines.push(
      `Цвет фона: rgba(${Math.round(node.backgroundColor.r * 255)},${Math.round(node.backgroundColor.g * 255)},${Math.round(node.backgroundColor.b * 255)},${node.backgroundColor.a})`,
    );
  if (node.fills && node.fills.length)
    lines.push(`Заливки: ${node.fills.map((f) => f.type).join(', ')}`);
  if (node.children && node.children.length) {
    lines.push(`Вложенные элементы (${node.children.length}):`);
    node.children.forEach((child, idx) => {
      lines.push(`  ${idx + 1}. ${child.type} (${child.name})`);
    });
  }
  // ...и любые другие поля!
  return lines.join('\n');
}
