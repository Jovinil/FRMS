import html2canvasPro from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

/**
 * Converts a tall HTML element into a paginated PDF.
 * Works with Tailwind v4 colors (OKLCH) via html2canvas-pro.
 */
export async function usePdf(el: HTMLElement, filename = 'form.pdf') {
  if (!el) {
    console.error('❌ usePdf: Element not found.')
    return
  }

  try {
    // Wait for fonts and images
    await document.fonts.ready
    await Promise.all(
      Array.from(el.querySelectorAll('img')).map(
        img =>
          img.complete ||
          new Promise(resolve => {
            img.onload = img.onerror = resolve
          }),
      ),
    )

    // Render the entire element (not just viewport)
    const canvas = await html2canvasPro(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: el.scrollWidth,
      windowHeight: el.scrollHeight, // ensure full height render
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // Calculate how many pages are needed
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add extra pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(filename)
  } catch (error) {
    console.error('PDF generation failed:', error)
  }
}
