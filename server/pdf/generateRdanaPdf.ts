// server/pdf/generateRdanaPdf.ts
import { promises as fs } from 'fs'
import path from 'path'
import { fillRdanaPdf } from '../../src/pdf/fillRdanaPdf'
import type { RdanaForm } from '../../app/models/firstRdanaForm'

// Paths relative to your project root
const TEMPLATE_PATH = path.join(
  process.cwd(),
  'server/pdf/templates/incident_report_template.pdf',
)

const OUTPUT_DIR = path.join(
  process.cwd(),
  'server/pdf/generated',
)

/**
 * Generates a flattened RDANA PDF and saves it locally.
 *
 * @param data - the RDANA form data from your submission
 * @param filename - name for the generated PDF (e.g. "rdana-123.pdf")
 * @returns absolute path to the saved PDF file
 */
export async function generateAndSaveRdanaPdf(
  data: RdanaForm,
  filename: string,
): Promise<string> {
  // 1. Read the template from disk
  const templateBytes = await fs.readFile(TEMPLATE_PATH)

  // 2. Fill & flatten the PDF using your existing function
  const filledBytes = await fillRdanaPdf(templateBytes, data)

  // 3. Make sure the output folder exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  // 4. Compose the output file path
  const outputPath = path.join(OUTPUT_DIR, filename)

  // 5. Write the flattened PDF to disk
  await fs.writeFile(outputPath, filledBytes)

  // 6. Return where it was saved (for logging / DB / later retrieval)
  return outputPath
}
