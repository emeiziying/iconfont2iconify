import {
  IconSet,
  SVG,
  cleanupSVG,
  isEmptyColor,
  parseColors,
  runSVGO,
} from '@iconify/tools';

namespace Iconfont {
  export interface JSON {
    id: string;
    name: string;
    font_class: string;
    font_family: string;
    url: string;
    icons_count: number;
    icons: Icon[];
  }

  interface Icon {
    id: string;
    name: string;
    svg: string;
    class_name: string;
    unicode: string;
    unicode_decimal: number;
    section: string;
  }
}

export const convertJSON = async (iconfontJSON: Iconfont.JSON) => {
  const { font_class, icons } = iconfontJSON;
  const iconSet = new IconSet({ prefix: font_class, icons: {} });

  for await (const icon of icons) {
    const svg = new SVG(icon.svg);

    await cleanupSVG(svg);

    await parseColors(svg, {
      defaultColor: 'currentColor',
      callback: (attr, colorStr, color) => {
        return !color || isEmptyColor(color) ? colorStr : 'currentColor';
      },
    });

    await runSVGO(svg);

    iconSet.fromSVG(icon.class_name, svg);
  }

  const iconifyJSON = iconSet.export(true);

  return iconifyJSON;
};
