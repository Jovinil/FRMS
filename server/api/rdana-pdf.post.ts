// server/api/rdana-pdf.post.ts
import { readBody } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

import { fillRdanaPdf } from '../../src/pdf/fillRdanaPdf';   // adjust path if needed
import type { RdanaForm } from '../../app/models/firstRdanaForm'; // adjust path if needed

export default defineEventHandler(async (event) => {
  try {
    // 1. Get RdanaForm JSON from the client
    const body = await readBody<RdanaForm>(event);

    // 2. Load the blank RDANA template PDF from your repo
    const templatePath = path.join(
      process.cwd(),
      'pdf-templates',
      'RDANA-Form-MDRRMO-fillable.pdf',
    );

    const templateBytes = await fs.readFile(templatePath);

    // 3. Fill it using your helper
    const filledBytes = await fillRdanaPdf(templateBytes, body);

    // 4. Send PDF as binary response
    const res = event.node.res;
    const fileName = `RDANA-${Date.now()}.pdf`;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`,
    );

    // filledBytes is a Uint8Array; Node wants a Buffer
    res.end(Buffer.from(filledBytes));

    // We already wrote to the response, so we return nothing
    return;
  } catch (err) {
    console.error('Error generating RDANA PDF:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate RDANA PDF',
    });
  }
});
