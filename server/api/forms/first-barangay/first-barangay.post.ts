// server/api/rdana/first-barangay.post.ts
import { defineEventHandler, readBody, setHeader } from 'h3';
import { generateRdanaPdf } from '~/pdf/rdanaPdfHelper';
import type { FirstBarangayForm } from '~/models/firstBarangayForm'; // your existing TS model

export default defineEventHandler(async (event) => {
  const body = await readBody<FirstBarangayForm>(event);

  // TODO: save body to your DB here if desired

  // Generate PDF
  const pdfBytes = await generateRdanaPdf('firstBarangay', body);

  // Return as a downloadable file
  setHeader(event, 'Content-Type', 'application/pdf');
  setHeader(
    event,
    'Content-Disposition',
    'attachment; filename="RDANA_Form_I_Initial_Report.pdf"',
  );

  return pdfBytes;
});
