import asciify from 'asciify';

const asyncAsciify = (
  text: string,
  options: Parameters<typeof asciify>[1],
): Promise<string> =>
  new Promise((res, rej) => {
    asciify(text, options, (err, data) => {
      if (err) {
        return rej(err);
      }
      res(data);
    });
  });

const generateAsciiString = async (
  string: string,
  options?: {
    font?: 'standard' | 'epic' | 'slant' | 'small';
    color?: string;
    immediateLog?: boolean;
    topGap?: boolean;
    bottomGap?: boolean;
  },
) => {
  const trimedString = string.trim();

  const lines = trimedString.split('\n').map((line) => {
    return line.trim();
  });
  const formattedLines = await Promise.all(
    lines.map((line) => {
      return asyncAsciify(line, {
        font: options?.font || 'standard',
        color: options?.color,
      });
    }),
  );

  const widestLineLength = formattedLines.reduce((acc, i) => {
    const currentLineLength = i.split('\n')[0].length;
    return currentLineLength > acc ? currentLineLength : acc;
  }, 0);
  const alignedLines = formattedLines.map((line) => {
    const splittedLine = line.split('\n');
    const currentLineLength = splittedLine[0].length;
    if (currentLineLength === widestLineLength) {
      return line;
    }
    const indent = Math.floor((widestLineLength - currentLineLength) / 2);
    const alignedLine = splittedLine
      .map((row) => `${' '.repeat(indent)}${row}`)
      .join('\n');
    return alignedLine;
  });

  const shrinkedMessage = alignedLines
    .join('\n')
    .split('\n')
    .filter((i) => i.trim())
    .join('\n');

  const finalString = `${options.topGap ? '\n' : ''}${shrinkedMessage}${
    options.bottomGap ? '\n' : ''
  }`;

  if (options?.immediateLog) {
    // eslint-disable-next-line no-console
    console.log(finalString);
  }

  return finalString;
};

export default generateAsciiString;
