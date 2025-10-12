import html2canvasPro from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

export async function usePdf(el: HTMLElement, filename = 'form.pdf') {
  if (!el) return console.error('❌ usePdf: Element not found.')

  try {
    await document.fonts.ready
    await Promise.all(
      Array.from(el.querySelectorAll('img')).map(
        img =>
          img.complete ||
          new Promise(resolve => (img.onload = img.onerror = resolve)),
      ),
    )

    // 🩹 Only fix input + textarea rendering (not radios/checkboxes)
    const fields = el.querySelectorAll('input, textarea')
    const clones: HTMLElement[] = []

    fields.forEach(field => {
      const value =
        (field as HTMLInputElement).value ||
        (field as HTMLTextAreaElement).value ||
        ''
      const rect = field.getBoundingClientRect()
      const style = getComputedStyle(field)

      // Create a visible overlay with the same style and text
      const clone = document.createElement('div')
      clone.textContent = value
      clone.style.position = 'absolute'
      clone.style.left = `${rect.left + window.scrollX}px`
      clone.style.top = `${rect.top + window.scrollY}px`
      clone.style.width = `${rect.width}px`
      clone.style.height = `${rect.height}px`
      clone.style.font = style.font
      clone.style.fontSize = style.fontSize
      clone.style.fontFamily = style.fontFamily
      clone.style.color = style.color
      clone.style.padding = style.padding
      clone.style.border = style.border
      clone.style.borderRadius = style.borderRadius
      clone.style.background = style.backgroundColor
      clone.style.lineHeight = style.lineHeight
      clone.style.display = 'flex'
      clone.style.alignItems = 'center'
      clone.style.justifyContent = style.textAlign || 'flex-start'
      clone.style.whiteSpace = 'pre'
      clone.style.overflow = 'hidden'
      clone.style.zIndex = '9999'

      // Hide the real input temporarily
      // field.style.visibility = 'hidden'
      document.body.appendChild(clone)
      clones.push(clone)
    })

    // Render to canvas (everything else untouched)
    const canvas = await html2canvasPro(el, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: el.scrollWidth,
      windowHeight: el.scrollHeight,
      scrollX: 0,
      scrollY: 0,
    })

    // Remove clones + restore visibility
    // fields.forEach(f => (f.style.visibility = 'visible'))
    clones.forEach(c => c.remove())

    // Generate PDF
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 36
    const usableWidth = pageWidth - margin * 2
    const imgHeight = (canvas.height * usableWidth) / canvas.width

    let heightLeft = imgHeight
    let position = margin

    pdf.addImage(imgData, 'PNG', margin, position, usableWidth, imgHeight)
    heightLeft -= pageHeight - margin * 2

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', margin, position, usableWidth, imgHeight)
      heightLeft -= pageHeight - margin * 2
    }

    pdf.save(filename)
  } catch (error) {
    console.error('PDF generation failed:', error)
  }
}
