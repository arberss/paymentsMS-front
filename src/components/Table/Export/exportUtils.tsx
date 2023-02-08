import { cloneElement } from 'react';
import type { ReactElement } from 'react';
import { DataGridProps } from 'react-data-grid';
import { chunkData } from './helper';

export async function exportToCsv<R, SR>(
  gridElement: ReactElement<DataGridProps<R, SR>>,
  fileName: string
) {
  const { head, body, foot } = await getGridContent(gridElement);
  const content = [...head, ...body, ...foot]
    .map((cells) => cells.map(serialiseCellValue).join(','))
    .join('\n');

  downloadFile(
    fileName,
    new Blob([content], { type: 'text/csv;charset=utf-8;' })
  );
}

export async function exportToXlsx<R, SR>(
  gridElement: ReactElement<DataGridProps<R, SR>>,
  fileName: string
) {
  const [{ utils, writeFile }, { head, body, foot }] = await Promise.all([
    import('xlsx'),
    getGridContent(gridElement),
  ]);
  const wb = utils.book_new();
  const ws = utils.aoa_to_sheet([...head, ...body, ...foot]);
  utils.book_append_sheet(wb, ws, 'Sheet 1');
  writeFile(wb, fileName);
}

export async function exportToPdf<R, SR>(
  gridElement: ReactElement<DataGridProps<R, SR>>,
  fileName: string
) {
  const [{ jsPDF }, autoTable, { head, body, foot }] = await Promise.all([
    import('jspdf'),
    (await import('jspdf-autotable')).default,
    await getGridContent(gridElement),
  ]);
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'px',
  });

  autoTable(doc, {
    head,
    body,
    foot,
    horizontalPageBreak: true,
    tableWidth: 'auto',
    styles: {
      cellPadding: 1.5,
      fontSize: 8,
      cellWidth: 'wrap',
      fontStyle: 'bold',
      lineWidth: 0.2,
      lineColor: '#c5c5c5',
    },
  });
  doc.save(fileName);
}

async function getGridContent<R, SR>(
  gridElement: ReactElement<DataGridProps<R, SR>>
) {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const grid = document.createElement('div');
  grid.innerHTML = renderToStaticMarkup(
    cloneElement(gridElement, {
      enableVirtualization: false,
    })
  );

  const headList = getRows('.rdg-header-row');
  const bodyList = getRows('.rdg-row:not(.rdg-summary-row)');
  const headTitle = [headList[0].slice(0, 40)];

  const bodyVal: string[][] = [];
  bodyList.forEach((item) => {
    const chunkedData = chunkData(headList, item, 40);
    bodyVal.push(...chunkedData);
  });

  return {
    head: headTitle,
    body: bodyVal,
    foot: getRows('.rdg-summary-row'),
  };

  function getRows(selector: string) {
    return Array.from(grid.querySelectorAll<HTMLDivElement>(selector)).map(
      (gridRow) => {
        return Array.from(
          gridRow.querySelectorAll<HTMLDivElement>('.rdg-cell')
        ).map((gridCell) => gridCell.innerText);
      }
    );
  }
}

function serialiseCellValue(value: unknown) {
  if (typeof value === 'string') {
    const formattedValue = value.replace(/"/g, '""');
    return formattedValue.includes(',')
      ? `"${formattedValue}"`
      : formattedValue;
  }
  return value;
}

function downloadFile(fileName: string, data: Blob) {
  const downloadLink = document.createElement('a');
  downloadLink.download = fileName;
  const url = URL.createObjectURL(data);
  downloadLink.href = url;
  downloadLink.click();
  URL.revokeObjectURL(url);
}
